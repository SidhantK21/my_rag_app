import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Shield, Zap, Database, Workflow, CreditCard } from 'lucide-react';
import { useTheme } from './Themetoogler/ThemeContext';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  icon: React.ReactNode;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "What is RAG and how does it work?",
    answer: "RAG (Retrieval-Augmented Generation) is an AI framework that combines information retrieval with language generation. It enhances AI responses by first retrieving relevant information from a knowledge base, then using that context to generate accurate and informed answers.",
    icon: <Database className="w-5 h-5 text-purple-400" />,
  },
  {
    id: 2,
    question: "How is this different from standard AI chat models?",
    answer: "Unlike standard AI chat models that rely solely on their training data, RAG actively retrieves and references specific information from your data sources. This results in more accurate, up-to-date, and contextually relevant responses.",
    icon: <Zap className="w-5 h-5 text-blue-400" />,
  },
  {
    id: 3,
    question: "Is my data secure when using this service?",
    answer: "Yes, we prioritize data security. All data is encrypted both in transit and at rest, and we maintain strict access controls. We comply with industry standards and regularly undergo security audits to ensure your information remains protected.",
    icon: <Shield className="w-5 h-5 text-green-400" />,
  },
  {
    id: 4,
    question: "Can I integrate this into my existing app or workflow?",
    answer: "Absolutely! We provide comprehensive APIs and SDKs that make integration seamless. Our solution works with most modern programming languages and frameworks, and our documentation includes detailed integration guides.",
    icon: <Workflow className="w-5 h-5 text-orange-400" />,
  },
  {
    id: 5,
    question: "What pricing plans are available?",
    answer: "We offer flexible pricing plans to suit different needs: a free tier for small projects, professional plans for growing businesses, and enterprise solutions for large-scale deployments. All plans include core features with scaling capabilities.",
    icon: <CreditCard className="w-5 h-5 text-pink-400" />,
  },
];

const FAQSection: React.FC = () => {
  const [activeId, setActiveId] = React.useState<number | null>(null);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <div className={`min-h-screen py-16 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-black text-[#EAEAEA]' : 'bg-white text-black'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className={`${isDarkMode ? 'text-[#B3B3B3]' : 'text-gray-600'} text-lg`}>
            Everything you need to know about our RAG-powered AI solution
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: item.id * 0.1 }}
              className={`${isDarkMode ? 'bg-[#1A1A1A] text-[#EAEAEA]' : 'bg-gray-100 text-black'} rounded-xl overflow-hidden`}
            >
              <button
                onClick={() => setActiveId(activeId === item.id ? null : item.id)}
                className={`w-full text-left px-6 py-4 flex items-center justify-between ${isDarkMode ? 'hover:bg-[#252525]' : 'hover:bg-gray-200'} transition-colors duration-200`}
              >
                <div className="flex items-center gap-4">
                  {item.icon}
                  <span className="font-medium">{item.question}</span>
                </div>
                <motion.div
                  animate={{ rotate: activeId === item.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 ${isDarkMode ? 'text-[#B3B3B3]' : 'text-gray-600'}" />
                </motion.div>
              </button>

              <AnimatePresence>
                {activeId === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={`px-6 py-4 border-t ${isDarkMode ? 'border-[#2A2A2A] text-[#B3B3B3]' : 'border-gray-300 text-gray-700'}`}>
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
