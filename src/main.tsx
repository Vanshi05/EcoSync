import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "leaflet/dist/leaflet.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <NotificationProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NotificationProvider>
  </AuthProvider>
);
