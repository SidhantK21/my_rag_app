import { useState } from "react";
import { Send, Bot, Sparkles, User } from "lucide-react";
import axios from "axios";

export const ChatContainer = () => {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hello! How can I assist you today? 👋" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/services/askai/query", {
        userInp: input,
      });
      setMessages((prev) => [...prev, { role: "bot", text: response.data.output.content }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, { role: "bot", text: "Something went wrong. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto  max-w-5xl px-4 py-8 h-screen">
      <div className="h-full  bg-gradient-to-b from-black/70 to-black/50 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.1)] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 bg-gradient-to-b from-black/90 to-black/70 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full"></div>
              <div className="relative p-3 bg-gradient-to-b from-white/20 to-white/10 rounded-2xl backdrop-blur-sm">
                <Bot className="text-white w-6 h-6" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white tracking-wide">
                  AI Assistant
                </h1>
                <Sparkles className="w-4 h-4 text-white/80" />
              </div>
              <p className="text-sm text-white/60 tracking-wide">Powered by advanced AI</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto scrollbar-hide  px-8 py-6 space-y-6">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} items-end gap-3`}
            >
              {msg.role === "bot" && (
                <div className="p-2.5 bg-gradient-to-b from-white/20 to-white/10 rounded-2xl backdrop-blur-sm shadow-lg">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={`group transition-all duration-300 ease-out ${
                  msg.role === "user"
                    ? "bg-white text-black"
                    : "bg-gradient-to-b from-white/20 to-white/10 text-white"
                } px-6 py-4 rounded-2xl max-w-[85%] shadow-[0_8px_16px_rgba(0,0,0,0.1)] backdrop-blur-sm hover:shadow-[0_12px_24px_rgba(0,0,0,0.2)] transform hover:-translate-y-0.5`}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
              {msg.role === "user" && (
                <div className="p-2.5 bg-white rounded-2xl shadow-lg">
                  <User className="w-4 h-4 text-black" />
                </div>
              )}
            </div>
          ))}

          {/* Loading Animation */}
          {loading && (
            <div className="flex justify-start items-end gap-3">
              <div className="p-2.5 bg-gradient-to-b from-white/20 to-white/10 rounded-2xl backdrop-blur-sm shadow-lg">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gradient-to-b from-white/20 to-white/10 px-6 py-4 rounded-2xl shadow-lg backdrop-blur-sm">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="px-8 py-6 bg-gradient-to-b from-black/90 to-black/70 border-t border-white/10">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                className="w-full px-6 py-4 bg-black/40 border border-white/10 rounded-xl text-white placeholder-white/40 outline-none transition-all duration-300 focus:ring-2 focus:ring-white/20 focus:border-white/20 shadow-[0_4px_12px_rgba(0,0,0,0.2)] backdrop-blur-sm"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                disabled={loading}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={loading}
              className="p-4 bg-white rounded-xl text-black transition-all duration-300 transform hover:scale-105 active:scale-95 hover:shadow-[0_8px_16px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};