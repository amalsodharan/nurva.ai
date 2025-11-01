import React from "react";
import { Routes, Route } from "react-router-dom";
import ChatbotHome from "./components/chatBotHome";
import Chat from "./components/chat";
import LoginPage from "./components/login";
import SignUp from "./components/signup";

export default function App() {
  return (
    <Routes>
      {/* Homepage */}
      <Route path="/" element={<ChatbotHome />} />

      {/* Chat screen */}
      <Route path="/login" element={<LoginPage  />} />
      <Route path="/signup" element={<SignUp  />} />
      <Route path="/chat" element={<Chat  />} />

      {/* 404 fallback */}
      <Route
        path="*"
        element={
          <div style={{ textAlign: "center", padding: "4rem" }}>
            <h1>404 - Page Not Found</h1>
          </div>
        }
      />
    </Routes>
  );
}
