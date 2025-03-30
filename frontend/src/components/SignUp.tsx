import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, X } from 'lucide-react';
import axios from 'axios';

interface SignUpProps {
  onSignIn: () => void;
  onClose: () => void;
}

export function SignUp({ onSignIn, onClose }: SignUpProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign up logic here
    const resSignUp=await axios.post("http://localhost:3000/auth/signup",{name,email,password});

    console.log(resSignUp);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="relative w-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-white/5 to-white/10 blur-xl"
        animate={{
          scale: isHovered ? 1.02 : 1,
          opacity: isHovered ? 0.8 : 0.5
        }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="relative rounded-[24px] p-8 backdrop-blur-xl overflow-hidden"
        style={{
          background: 'rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
          className="absolute right-4 top-4 z-50 p-2 rounded-full bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`,
            }}
          />
        )}

        <div className="relative">
          <h2 className="text-3xl font-bold text-white mb-2">Create account</h2>
          <p className="text-white/60 mb-8">Join us today and get started</p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Full name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 outline-none rounded-lg py-3 pl-10 pr-4 text-white placeholder-white/40 focus:border-white/20 transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 outline-none rounded-lg py-3 pl-10 pr-4 text-white placeholder-white/40 focus:border-white/20 transition-colors"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 outline-none rounded-lg py-3 pl-10 pr-4 text-white placeholder-white/40 focus:border-white/20 transition-colors"
                  placeholder="Create a password"
                />
              </div>
              <p className="mt-2 text-sm text-white/40">
                Must be at least 8 characters long
              </p>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center py-3 px-4 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium transition-all duration-300"
            >
              Create account
              <ArrowRight className="ml-2 h-4 w-4" />
            </motion.button>

            <p className="text-center text-white/60 text-sm">
              Already have an account?{' '}
              <button 
                type="button"
                onClick={onSignIn} 
                className="text-white hover:underline focus:outline-none"
              >
                Sign in
              </button>
            </p>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}