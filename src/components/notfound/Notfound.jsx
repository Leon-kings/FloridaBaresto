/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UndefinedPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error('Page not found! Redirecting you...', {
      position: "top-center",
      autoClose: 3000,
      theme: "colored"
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
      transition: {
        duration: 0.3,
        yoyo: Infinity
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex items-center justify-center p-4">
      <motion.div
        className="max-w-2xl w-full text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated SVG Illustration */}
        <motion.div
          className="mb-8"
          variants={itemVariants}
          animate={{
            y: [0, -10, 0],
            rotate: [0, 2, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg
            className="w-64 h-64 mx-auto"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background Circle */}
            <circle cx="100" cy="100" r="90" fill="#F0F9FF" stroke="#3B82F6" strokeWidth="2"/>
            
            {/* Magnifying Glass */}
            <motion.circle
              cx="120"
              cy="80"
              r="30"
              fill="none"
              stroke="#EF4444"
              strokeWidth="3"
              strokeDasharray="5 5"
              variants={itemVariants}
            />
            <motion.line
              x1="140"
              y1="100"
              x2="170"
              y2="130"
              stroke="#EF4444"
              strokeWidth="3"
              strokeLinecap="round"
              variants={itemVariants}
            />
            
            {/* Question Mark */}
            <motion.path
              d="M70 120 Q70 110 80 110 Q90 110 90 120 Q90 130 80 130 L70 140"
              stroke="#8B5CF6"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1 }}
            />
            <circle cx="70" cy="150" r="2" fill="#8B5CF6"/>
            
            {/* Floating Elements */}
            <motion.circle
              cx="60"
              cy="60"
              r="8"
              fill="#10B981"
              variants={itemVariants}
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.rect
              x="150"
              y="50"
              width="12"
              height="12"
              fill="#F59E0B"
              variants={itemVariants}
              animate={{ rotate: [0, 180, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </svg>
        </motion.div>

        {/* Content */}
        <motion.h1 
          className="text-6xl md:text-8xl font-bold text-red-800 mb-4"
          variants={itemVariants}>
        
          404
        </motion.h1>
        
        <motion.h2 
          className="text-2xl md:text-3xl font-semibold text-red-500 mb-4"
          variants={itemVariants}
        >
          Oops! Page Not Found
        </motion.h2>
        
        <motion.p 
          className="text-gray-600 mb-8 text-lg max-w-md mx-auto"
          variants={itemVariants}
        >
          The page you're looking for seems to have vanished into the digital void. 
          Don't worry, let's get you back on track!
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={itemVariants}
        >
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg"
          >
            🏠 Go Home
          </motion.button>
          
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => window.history.back()}
            className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-full font-semibold hover:border-gray-400 transition-colors"
          >
            ↩️ Go Back
          </motion.button>
        </motion.div>

        {/* Additional Features */}
        <motion.div 
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
          variants={itemVariants}
        >
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-2xl mb-2">🔍</div>
            <h3 className="font-semibold text-gray-800 mb-2">Double Check URL</h3>
            <p className="text-gray-600 text-sm">Make sure the web address is spelled correctly</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-2xl mb-2">🔄</div>
            <h3 className="font-semibold text-gray-800 mb-2">Refresh Page</h3>
            <p className="text-gray-600 text-sm">Sometimes a simple refresh does the trick</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-2xl mb-2">📧</div>
            <h3 className="font-semibold text-gray-800 mb-2">Report Issue</h3>
            <p className="text-gray-600 text-sm">Let us know if this problem persists</p>
          </div>
        </motion.div>

        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-20 left-10 w-4 h-4 bg-yellow-400 rounded-full opacity-60"
          animate={{
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 0.5
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-6 h-6 bg-green-400 rounded-full opacity-40"
          animate={{
            y: [0, -40, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: 1
          }}
        />
      </motion.div>
    </div>
  );
};

