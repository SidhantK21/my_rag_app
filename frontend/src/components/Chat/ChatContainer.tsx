import { useState } from "react";
import { Send, Bot } from "lucide-react";

export const ChatContainer = () => {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hello! You can ask your questions!! 😊" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async  () => {
    if (!input.trim()) return;
    
    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    
    // Simulate bot response (Replace with API call to RAG backend)
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: "Reading Document..." }]);
    }, 1000);
  };

  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl h-[85vh] bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl flex flex-col overflow-hidden border border-white/20 sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
        {/* Header */}
        <div className="p-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Bot className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-semibold text-white">AI Powered PDF Reader</h1>
              <p className="text-xs md:text-sm text-gray-400">Always here to help</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3 md:space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-3 md:p-4 rounded-2xl max-w-[80%] md:max-w-md transition-all duration-300 ease-in-out ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white ml-6 md:ml-12 shadow-lg"
                    : "bg-white/5 text-white mr-6 md:mr-12 shadow-md"
                }`}
              >
                <p className="text-xs md:text-sm lg:text-base leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 border-t border-white/10 bg-white/5">
          <div className="flex items-center gap-2 md:gap-3">
            <input
              type="text"
              className="flex-1 px-4 md:px-6 py-3 md:py-4 bg-white/10 outline-none border border-white/20 rounded-xl text-white placeholder-gray-400  transition-all duration-300 text-sm md:text-base"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="p-3 md:p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
