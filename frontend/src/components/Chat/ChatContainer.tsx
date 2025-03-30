import { useState } from "react";
import { Send, Bot } from "lucide-react";
import axios from "axios";

export const ChatContainer = () => {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hello! You can ask your questions!! 😊" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
   

    try {
        const response = await axios.post("http://localhost:3000/services/askai/query",
            {
                userInp:input
            }
        )
        setMessages((prev) => [...prev, { role: "bot", text: response.data.output.content }]);
    } catch (error) {
        console.error("Error:", error);
        setMessages((prev) => [...prev, { role: "bot", text: "Something went wrong. Try again!" }]);
    }

  };

  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-3xl h-[85vh] bg-white/10 backdrop-blur-2xl shadow-2xl rounded-3xl flex flex-col overflow-hidden border border-white/20 sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
        {/* Header */}
        <div className="p-5 border-b border-white/10 bg-white/5 flex items-center gap-4 shadow-md">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl animate-pulse">
            <Bot className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-semibold text-white">AI Powered PDF Reader</h1>
            <p className="text-sm text-gray-400">Always here to help</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-4 rounded-2xl max-w-[80%] md:max-w-md shadow-md transition-all duration-300 ease-in-out ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white ml-6 md:ml-12"
                    : "bg-gray-800 text-white mr-6 md:mr-12"
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-5 border-t border-white/10 bg-white/5 shadow-inner">
          <div className="flex items-center gap-3">
            <input
              type="text"
              className="flex-1 px-5 py-3 bg-white/10 outline-none border border-white/20 rounded-xl text-white placeholder-gray-400 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 hover:bg-white/20"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg transform hover:scale-105 active:scale-95"
            >
              <Send size={20} />
            </button>
          </div>
        </div>  
      </div>
    </div>
  );
};
