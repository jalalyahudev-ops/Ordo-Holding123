import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-48 h-48 bg-white/20 rounded-full flex items-center justify-center mb-8 backdrop-blur-sm"
        >
          <span className="text-6xl font-bold tracking-tighter">YAYA</span>
        </motion.div>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold mb-4"
        >
          Kids Activities Marketplace
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white/80 text-lg"
        >
          Find the best sports, arts, and educational centers for your children.
        </motion.p>
      </div>
      
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="pb-8"
      >
        <button 
          onClick={() => navigate('/login')}
          className="w-full bg-white text-primary py-4 rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition-transform"
        >
          Get Started
        </button>
      </motion.div>
    </div>
  );
}
