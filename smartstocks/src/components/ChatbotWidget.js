import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState([
    { from: "bot", text: "Hello! Ask me about any product stock or low-stock items." }
  ]);
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    setMsgs((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chatbot/query", { q: input });
      const reply = res.data?.reply || "Sorry, I couldn't find that.";
      setMsgs((m) => [...m, { from: "bot", text: reply }]);
    } catch (err) {
      setMsgs((m) => [...m, { from: "bot", text: "Error connecting to chatbot." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={`fixed bottom-6 right-6 z-50`}>
        <button
          onClick={() => setOpen((v) => !v)}
          className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg"
        >
          {open ? "Close" : "Chat with AI"}
        </button>
      </div>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-96 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow-lg overflow-hidden">
          <div className="px-4 py-3 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <strong>SmartStock Assistant</strong>
          </div>

          <div className="p-3 h-64 overflow-y-auto space-y-3 bg-white dark:bg-gray-800">
            {msgs.map((m, i) => (
              <div key={i} className={m.from === "user" ? "text-right" : ""}>
                <span className={`inline-block px-3 py-2 rounded-lg ${m.from === "user" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"}`}>
                  {m.text}
                </span>
              </div>
            ))}
          </div>

          <div className="p-3 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 rounded-md border dark:border-gray-700 bg-white dark:bg-gray-800"
              placeholder="Ask e.g. 'How much milk in stock?'"
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <button onClick={send} className="bg-blue-600 text-white px-3 py-2 rounded-md" disabled={loading}>
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
