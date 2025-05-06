import { useState, useRef, useEffect } from 'react';
import { Send, FileText, Plus, MessageSquare, Settings, LogOut } from 'lucide-react';

// Message type definition
type Message = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

export const ChatContainer = () => {
  // State for messages, input, and loading state
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Ref for auto-scrolling to the latest message
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample conversations for the sidebar
  const conversations = [
    { id: '1', title: 'Resume Analysis', date: 'May 5' },
    { id: '2', title: 'Research Paper', date: 'May 4' },
    { id: '3', title: 'Meeting Notes', date: 'May 3' },
  ];

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (e.type === 'keydown' && (e as React.KeyboardEvent).key !== 'Enter') {
      return;
    }
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulate AI response
    setIsLoading(true);
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I've analyzed your PDF and found the following information. How can I help you further?",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        {/* New chat button */}
        <div className="p-4">
          <button className="flex items-center justify-center w-full py-2 px-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
            <Plus size={18} className="mr-2" />
            New Chat
          </button>
        </div>
        
        {/* Conversations list */}
        <div className="px-3 overflow-y-auto">
          <h3 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Recent Conversations</h3>
          {conversations.map(convo => (
            <div key={convo.id} className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer mb-1">
              <FileText size={16} className="text-gray-500" />
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">{convo.title}</p>
                <p className="text-xs text-gray-500">{convo.date}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom menu */}
        <div className="absolute bottom-0 w-64 border-t border-gray-200 bg-white">
          <div className="flex items-center justify-between p-4">
            <button className="flex items-center text-sm text-gray-700 hover:bg-gray-100 p-2 rounded-md">
              <Settings size={16} className="mr-2" />
              Settings
            </button>
            <button className="flex items-center text-sm text-gray-700 hover:bg-gray-100 p-2 rounded-md">
              <LogOut size={16} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
      
      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 py-4 px-6 bg-white">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <FileText size={20} className="mr-2 text-blue-600" />
            PDF Chat Assistant
          </h2>
        </div>
        
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <MessageSquare size={48} className="text-blue-600 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Start chatting with your PDF</h2>
              <p className="text-gray-600 max-w-md">
                Ask questions about your document and get instant answers powered by AI.
              </p>
            </div>
          ) : (
            messages.map(message => (
              <div 
                key={message.id} 
                className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-3/4 p-4 rounded-lg ${
                    message.sender === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white border border-gray-200 text-gray-800'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-white border border-gray-200 p-4 rounded-lg">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-75"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-150"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input area */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question about your PDF..."
              className="flex-1 border border-gray-300 rounded-l-lg py-3 px-4 outline-none"
            />
            <button 
              onClick={handleSendMessage}
              disabled={!input.trim()}
              className={`p-4 bg-black text-black rounded-r-lg${
                input.trim() 
              } text-white transition`}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};