import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, User, Bot, X } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export const ChatContainer = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! How can I assist you today?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsThinking(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(input),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsThinking(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setInput('Voice message transcription would appear here');
      }, 3000);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        text: 'Chat cleared. How can I help you now?',
        sender: 'ai',
        timestamp: new Date(),
      },
    ]);
  };

  const getAIResponse = (msg: string): string => {
    const responses = [
      "Can you tell me more about that?",
      "Interesting! Let me think about that...",
      "Here's something that might help you.",
      "Thanks for asking. Here's my take:",
      "Good question. Let me explain."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl border border-gray-200 rounded-2xl shadow-xl bg-white flex flex-col h-[85vh] overflow-hidden"
      >
        <div className="bg-black text-white p-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold tracking-tight">AI Assistant</h1>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearChat}
            className="text-white hover:text-gray-300"
          >
            <X size={22} />
          </motion.button>
        </div>

        <div className="flex-grow overflow-y-auto px-6 py-4 space-y-4 bg-white">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-end gap-2 max-w-[75%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`p-2 rounded-full ${message.sender === 'user' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'}`}>
                    {message.sender === 'user' ? <User size={18} /> : <Bot size={18} />}
                  </div>
                  <div className={`px-4 py-2 rounded-xl shadow ${message.sender === 'user' ? 'bg-black text-white' : 'bg-gray-50 border'}`}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {isThinking && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="flex items-center gap-2 max-w-[75%]">
                  <div className="p-2 rounded-full bg-gray-100 text-gray-800">
                    <Bot size={18} />
                  </div>
                  <div className="px-4 py-2 rounded-xl shadow bg-gray-50 border">
                    <div className="flex space-x-1">
                      {[0, 0.2, 0.4].map((d, i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ repeat: Infinity, duration: 1, delay: d }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </AnimatePresence>
        </div>

        <div className="p-4 border-t bg-white">
          <div className="flex items-center gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className="flex-grow p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black resize-none text-sm"
              rows={1}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleRecording}
              className={`p-3 rounded-xl ${isRecording ? 'bg-red-500 text-white' : 'bg-gray-100 text-black'}`}
            >
              <Mic size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              disabled={input.trim() === ''}
              className="p-3 bg-black text-white rounded-xl disabled:opacity-50"
            >
              <Send size={20} />
            </motion.button>
          </div>

          <AnimatePresence>
            {isRecording && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm flex items-center gap-2"
              >
                <span>Recording...</span>
                <motion.div
                  className="w-2 h-2 bg-red-500 rounded-full"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
