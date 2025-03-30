import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useTheme } from './Themetoogler/ThemeContext';

export function Pricing() {
  const { theme } = useTheme();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();
  const isDarkMode = theme === 'dark';

  const plans = [
    {
      name: 'Basic',
      price: '0',
      description: 'Perfect for individuals and small projects',
      features: [
        'Responses from generic data',
        'Email support',
        'Limited responses',
        'Limited questions',
      ],
    },
    {
      name: 'Pro',
      price: '10',
      description: 'Ideal for businesses and power users',
      features: [
        'PDF upload support',
        'Responses from your data',
        'Accurate responses',
        'Unlimited Questions',
      ],
    },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    controls.start({ opacity: 1, transition: { duration: 0.3 } });
  }, [controls]);

  return (
    <section id="pricing" className={`py-24 px-4 ${theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center mb-16"
      >
        <h2 className="text-4xl font-bold mb-4">Simple, transparent pricing</h2>
        <p className={`${isDarkMode ? 'text-[#B3B3B3]' : 'text-gray-600'} text-lg`}>Choose the plan that's right for you</p>
      </motion.div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 px-4">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="relative group"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <motion.div 
              className="absolute inset-0 rounded-[28px] blur-xl"
              style={{ 
                background: theme === 'light' 
                  ? 'linear-gradient(135deg, rgba(147,197,253,0.1), rgba(196,181,253,0.1))' 
                  : 'linear-gradient(135deg, rgba(147,197,253,0.2), rgba(196,181,253,0.2))'
              }}
              animate={{ 
                scale: hoveredCard === index ? 1.02 : 1, 
                opacity: hoveredCard === index ? 0.8 : 0.5 
              }}
              transition={{ duration: 0.3 }}
            />

            <motion.div 
              className="relative rounded-[24px] p-8 h-full flex flex-col overflow-hidden backdrop-blur-xl border"
              style={{
                background: theme === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.2)',
                borderColor: theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
              }}
              animate={{ 
                boxShadow: hoveredCard === index 
                  ? theme === 'light'
                    ? '0 20px 40px rgba(0, 0, 0, 0.1)'
                    : '0 20px 40px rgba(0, 0, 0, 0.4)'
                  : '0 10px 30px rgba(0, 0, 0, 0.1)' 
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <AnimatePresence>
                {hoveredCard === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0"
                    style={{
                      background: theme === 'light'
                        ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1), transparent 40%)`
                        : `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 197, 253, 0.15), transparent 40%)`,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>

              <motion.div className="mb-8 relative">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} text-sm mb-6`}>{plan.description}</p>
                <div className="flex items-baseline justify-center mb-6">
                  <span className="text-5xl font-bold">${plan.price}</span>
                  <span className={`ml-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>/month</span>
                </div>
              </motion.div>

              <motion.ul className="space-y-4 mb-8 flex-grow relative">
                {plan.features.map((feature) => (
                  <motion.li key={feature} className="flex items-start">
                    <Check className={`h-5 w-5 ${theme === 'light' ? 'text-balck' : 'text-white'} mr-3 mt-0.5 flex-shrink-0`} />
                    <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} text-sm`}>{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative w-full py-4 px-6 rounded-full text-sm font-medium transition-all duration-300 ${
                  theme === 'light'
                    ? plan.name === 'Pro'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-900 text-white'
                    : plan.name === 'Pro'
                      ? 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                }`}
              >
                Get started with {plan.name}
              </motion.button>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}