import os
import shutil
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten to frontend origin in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- GLOBAL store for simple demo (use DB/redis in prod)
chat_sessions = {}

@app.post("/bill-handler/")
async def handle_bill(
    file: UploadFile = File(...),
    mode: str = Form(...),               # "budget" or "chat"
    reduction_percent: int = Form(0),    # used only for budget
    user_id: str = Form("default_user")  # to track chat sessions
):
    """
    mode="budget": return carbon budget + tangible recommendations.
    mode="chat":   start a chat session with bill context.
    """
    # Save temp file
    temp_file = f"temp_{file.filename}"
    with open(temp_file, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Gemini model
    model = genai.GenerativeModel("gemini-1.5-flash")

    if mode == "budget":
        # Ask Gemini to extract usage in kWh
        extract_prompt = (
            "Read this electricity bill image/PDF and ONLY return the total "
            "electricity usage in kilowatt-hours (kWh) as a number."
        )
        response = model.generate_content([
            extract_prompt,
            {"mime_type": file.content_type, "data": open(temp_file, "rb").read()}
        ])

        try:
            usage_kwh = float(response.text.strip())
        except Exception:
            usage_kwh = 0.0

        # Simple carbon factor
        carbon_credits = usage_kwh * 0.92
        target_credits = carbon_credits * (1 - reduction_percent / 100)

        # More tangible solutions — let Gemini generate actionable steps
        rec_prompt = (
            f"The household consumed about {usage_kwh:.1f} kWh. "
            "Suggest 5–7 practical, measurable actions (with expected kWh savings "
            "or ₹/month estimates if possible) to reduce energy use."
        )
        rec_resp = model.generate_content([
            rec_prompt,
            {"mime_type": file.content_type, "data": open(temp_file, "rb").read()}
        ])

        return {
            "mode": "budget",
            "original_credits": round(carbon_credits, 2),
            "target_credits": round(target_credits, 2),
            "reduction_percent": reduction_percent,
            "recommendations": rec_resp.text.strip()
        }

    elif mode == "chat":
        # Start a chat session with bill context for free conversation
        initial_context = (
            "You are an assistant with full context of the attached electricity bill. "
            "Answer questions about costs, usage trends, or suggestions."
        )
        chat = model.start_chat(history=[
            {"role": "user", "parts": [
                initial_context,
                {"mime_type": file.content_type, "data": open(temp_file, "rb").read()}
            ]}
        ])
        chat_sessions[user_id] = chat

        return {
            "mode": "chat",
            "message": "Chat session started. Use /chat-reply endpoint to continue."
        }

    else:
        return {"error": "Invalid mode. Use 'budget' or 'chat'."}

@app.post("/chat-reply/")
async def chat_reply(user_id: str = Form(...), message: str = Form(...)):
    """Continue an existing chat about the uploaded bill."""
    chat = chat_sessions.get(user_id)
    if not chat:
        return {"error": "No active chat session for this user."}

    reply = chat.send_message(message)
    return {"reply": reply.text}
