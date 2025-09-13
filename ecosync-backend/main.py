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
    allow_origins=["*"],      # tighten later if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simple in-memory store for demo (reset on server restart)
chat_sessions = {}

@app.post("/bill-handler/")
async def handle_bill(
    file: UploadFile = File(...),
    mode: str = Form(...),               # "budget" or "chat"
    reduction_percent: int = Form(0),
    user_id: str = Form("default_user")
):
    """
    mode="budget": calculate budget, give recommendations,
                   and open a chat session with that context.
    mode="chat":   create a plain chat session with bill context only.
    """
    # Save temporary file
    temp_file = f"temp_{file.filename}"
    with open(temp_file, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    model = genai.GenerativeModel("gemini-1.5-flash")

    if mode == "budget":
        # 1️⃣ Extract usage
        extract_prompt = (
            "Read this electricity bill and return only the total usage "
            "in kilowatt-hours (kWh) as a number."
        )
        usage_resp = model.generate_content([
            extract_prompt,
            {"mime_type": file.content_type, "data": open(temp_file, "rb").read()}
        ])
        try:
            usage_kwh = float(usage_resp.text.strip())
        except Exception:
            usage_kwh = 0.0

        carbon_credits = usage_kwh * 0.92
        target_credits = carbon_credits * (1 - reduction_percent / 100)

        # 2️⃣ Tangible recommendations
        rec_prompt = (
            f"Total usage is about {usage_kwh:.1f} kWh. "
            "Suggest 5–7 concrete, measurable steps to cut consumption, "
            "including estimated savings in kWh or ₹/month."
        )
        rec_resp = model.generate_content([
            rec_prompt,
            {"mime_type": file.content_type, "data": open(temp_file, "rb").read()}
        ])

        # 3️⃣ Start a chat seeded with bill + summary + recommendations
        initial_msg = (
            f"The household used {usage_kwh:.1f} kWh (~{carbon_credits:.1f} kgCO₂). "
            f"Target after {reduction_percent}% reduction: {target_credits:.1f} kgCO₂.\n\n"
            f"Recommendations:\n{rec_resp.text.strip()}\n\n"
            "You can now chat with the user about these results."
        )
        chat = model.start_chat(history=[
            {"role": "user", "parts": [
                initial_msg,
                {"mime_type": file.content_type, "data": open(temp_file, "rb").read()}
            ]}
        ])
        chat_sessions[user_id] = chat

        return {
            "mode": "budget",
            "original_credits": round(carbon_credits, 2),
            "target_credits": round(target_credits, 2),
            "reduction_percent": reduction_percent,
            "recommendations": rec_resp.text.strip(),
            "message": "Budget computed and chat session started. Use /chat-reply to continue."
        }

    elif mode == "chat":
        # Plain chat about the bill without predefined budget
        chat = model.start_chat(history=[
            {"role": "user", "parts": [
                "You are an assistant with full context of the attached electricity bill.",
                {"mime_type": file.content_type, "data": open(temp_file, "rb").read()}
            ]}
        ])
        chat_sessions[user_id] = chat
        return {
            "mode": "chat",
            "message": "Chat session started. Use /chat-reply to continue."
        }

    else:
        return {"error": "Invalid mode. Use 'budget' or 'chat'."}

@app.post("/chat-reply/")
async def chat_reply(user_id: str = Form(...), message: str = Form(...)):
    """Send a follow-up message in an existing chat session."""
    chat = chat_sessions.get(user_id)
    if not chat:
        return {"error": "No active chat session for this user."}
    reply = chat.send_message(message)
    return {"reply": reply.text}
