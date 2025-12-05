import React, { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function ChatbotWidget() {
  const { theme } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! Ask me about your inventory (e.g., 'How many Milk 1L do I have?')" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      const botMsg = { sender: "bot", text: data.reply || "No reply" };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { sender: "bot", text: "Error connecting to server" }]);
    }

    setLoading(false);
  };

  return (
    <>
      <button onClick={() => setOpen(o => !o)} className={`fixed bottom-6 right-6 z-50 px-4 py-2 rounded-full ${theme === "dark" ? "bg-blue-700 text-white" : "bg-blue-600 text-white"}`}>
        Chat with AI
      </button>

      {open && (
        <div className={`fixed bottom-20 right-6 w-96 z-50 rounded-lg shadow-lg ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
          <div className="p-3 border-b">{/* header */}SmartStock Assistant</div>
          <div className="h-64 overflow-y-auto p-3 space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={`p-2 rounded ${m.sender === "user" ? "ml-auto bg-blue-500 text-white" : "mr-auto bg-gray-200 dark:bg-gray-700"}`}>
                {m.text}
              </div>
            ))}
          </div>

          <div className="p-3 border-t flex gap-2">
            <input value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={(e)=> e.key === "Enter" && sendMessage()} className="flex-1 p-2 rounded" placeholder="Ask about inventory..." />
            <button disabled={loading} onClick={sendMessage} className="px-3 py-2 bg-blue-600 text-white rounded">Send</button>
          </div>
        </div>
      )}
    </>
  );
}