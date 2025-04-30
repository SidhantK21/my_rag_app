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

      // this is just a check message 

      setMessages((prev) => [...prev, { role: "bot", text: response.data.output.content }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, { role: "bot", text: "Something went wrong. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 h-screen">
      <div className="h-full bg-gradient-to-b from-black/80 to-black/60 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-[0_0_100px_rgba(255,255,255,0.05)] flex flex-col overflow-hidden transition-all duration-500 hover:shadow-[0_0_150px_rgba(255,255,255,0.08)]">
        {/* Header */}
        <div className="px-8 py-6 bg-gradient-to-b from-black/95 to-black/80 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full group-hover:blur-3xl transition-all duration-500"></div>
              <div className="relative p-3 bg-gradient-to-b from-white/20 to-white/5 rounded-2xl backdrop-blur-sm border border-white/10 shadow-inner">
                <Bot className="text-white w-6 h-6 group-hover:scale-110 transition-transform duration-500" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-transparent bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text tracking-wide">
                  AI Assistant
                </h1>
                <Sparkles className="w-4 h-4 text-white/80 animate-pulse" />
              </div>
              <p className="text-sm text-white/60 tracking-wide font-light">Powered by advanced AI</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} items-end gap-3`}
            >
              {msg.role === "bot" && (
                <div className="p-2.5 bg-gradient-to-b from-white/20 to-white/5 rounded-2xl backdrop-blur-sm shadow-lg border border-white/10">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={`group transition-all duration-500 ease-out ${
                  msg.role === "user"
                    ? "bg-gradient-to-br from-white to-white/95 text-black"
                    : "bg-gradient-to-b from-white/20 to-white/5 text-white"
                } px-6 py-4 rounded-2xl max-w-[85%] shadow-[0_8px_16px_rgba(0,0,0,0.1)] backdrop-blur-sm hover:shadow-[0_16px_32px_rgba(0,0,0,0.15)] transform hover:-translate-y-1 border border-white/10`}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
              {msg.role === "user" && (
                <div className="p-2.5 bg-gradient-to-br from-white to-white/95 rounded-2xl shadow-lg border border-white/20">
                  <User className="w-4 h-4 text-black" />
                </div>
              )}
            </div>
          ))}

          {/* Loading Animation */}
          {loading && (
            <div className="flex justify-start items-end gap-3">
              <div className="p-2.5 bg-gradient-to-b from-white/20 to-white/5 rounded-2xl backdrop-blur-sm shadow-lg border border-white/10">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gradient-to-b from-white/20 to-white/5 px-6 py-4 rounded-2xl shadow-lg backdrop-blur-sm border border-white/10">
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
        <div className="px-8 py-6 bg-gradient-to-b from-black/95 to-black/80 border-t border-white/10">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 group">
              <div className="absolute inset-0 bg-white/10 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-6 py-4  border border-white/10 rounded-xl text-white placeholder-white/40 outline-none transition-all duration-300 focus:border-white/20  hover:border-white/20 bg-gradient-to-b from-white/[0.1] to-white/[0.03] shadow-[0_4px_12px_rgba(0,0,0,0.1)] backdrop-blur-xl"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                  disabled={loading}
                />
                <div className="absolute inset-px rounded-[11px] pointer-events-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"></div>
              </div>
            </div>
            <button
              onClick={sendMessage}
              disabled={loading}
              className="p-4 bg-gradient-to-br from-white to-white/95 rounded-xl text-black transition-all duration-500 transform hover:scale-105 active:scale-95 hover:shadow-[0_8px_16px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border border-white/20"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};