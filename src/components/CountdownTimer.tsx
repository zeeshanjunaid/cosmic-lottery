import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CountdownTimerProps {
  endTime: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [prevTimeLeft, setPrevTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endTime.getTime() - new Date().getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        
        setPrevTimeLeft(timeLeft);
        setTimeLeft({ days, hours, minutes, seconds });
        setIsExpired(false);
      } else {
        setPrevTimeLeft(timeLeft);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsExpired(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endTime, timeLeft]);

  const TimeUnit: React.FC<{ value: number; label: string; prevValue: number; index: number }> = ({ 
    value, 
    label, 
    prevValue, 
    index 
  }) => {
    const hasChanged = value !== prevValue;
    
    return (
      <motion.div
        className="flex flex-col items-center"
        animate={hasChanged ? { scale: [1, 1.05, 1] } : {}}
        transition={{ 
          duration: 0.4, 
          delay: index * 0.1,
          ease: "easeInOut"
        }}
      >
        {/* Time Value Container */}
        <motion.div 
          className="relative group"
          animate={hasChanged ? { y: [-2, 0] } : {}}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          {/* Background with gradient and glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#2DE582]/20 via-blue-500/10 to-purple-500/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Main container */}
          <motion.div 
            className="relative bg-gradient-to-br from-[#181830]/90 via-[#1C1C1C]/90 to-[#181830]/90 backdrop-blur-xl rounded-2xl p-4 min-w-[56px] border border-white/10 shadow-2xl overflow-hidden"
            animate={hasChanged ? {
              borderColor: ["rgba(255, 255, 255, 0.1)", "rgba(45, 229, 130, 0.5)", "rgba(255, 255, 255, 0.1)"],
              boxShadow: [
                "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                "0 25px 50px -12px rgba(45, 229, 130, 0.25)",
                "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              ]
            } : {}}
            transition={{ duration: 0.6, delay: index * 0.05 }}
          >
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-br from-[#2DE582]/30 via-transparent to-blue-500/30" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                animate={{ x: [-100, 200] }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "linear",
                  delay: index * 0.5 
                }}
              />
            </div>
            
            {/* Time value with flip animation */}
            <motion.div 
              className="relative text-2xl sm:text-3xl font-black text-white text-center tabular-nums tracking-tight"
              key={value}
              initial={hasChanged ? { 
                rotateX: -90, 
                opacity: 0,
                scale: 0.8
              } : false}
              animate={{ 
                rotateX: 0, 
                opacity: 1,
                scale: 1
              }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.02,
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
              style={{
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.5), 0 0 10px rgba(45, 229, 130, 0.3)"
              }}
            >
          {value.toString().padStart(2, '0')}
        </motion.div>
            
            {/* Pulse effect when value changes */}
            {hasChanged && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#2DE582]/30 via-blue-500/20 to-purple-500/30 rounded-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: [0, 0.6, 0], 
                  scale: [0.8, 1.1, 1] 
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.05,
                  ease: "easeOut"
                }}
              />
            )}
          </motion.div>
        </motion.div>
        
        {/* Label with enhanced styling */}
        <motion.div 
          className="text-xs sm:text-sm text-white/60 mt-3 font-semibold tracking-wide uppercase"
          animate={hasChanged ? { 
            color: ["rgba(255, 255, 255, 0.6)", "rgba(45, 229, 130, 0.8)", "rgba(255, 255, 255, 0.6)"]
          } : {}}
          transition={{ duration: 0.5, delay: index * 0.05 }}
        >
          {label}
        </motion.div>
      </motion.div>
    );
  };

  if (isExpired) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-2xl p-6">
          <div className="text-red-400 font-bold text-lg mb-2">⏰ Time's Up!</div>
          <div className="text-white/70 font-semibold">Lottery Ended</div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4">
      <TimeUnit 
        value={timeLeft.days} 
        label="Days" 
        prevValue={prevTimeLeft.days} 
        index={0} 
      />
      
      {/* Animated separator */}
      <motion.div 
        className="flex flex-col items-center justify-center h-12 px-1"
        animate={{ 
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#2DE582] to-blue-400 rounded-full mb-1 shadow-lg shadow-[#2DE582]/50" />
        <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full shadow-lg shadow-blue-400/50" />
      </motion.div>
      
      <TimeUnit 
        value={timeLeft.hours} 
        label="Hours" 
        prevValue={prevTimeLeft.hours} 
        index={1} 
      />
      
      <motion.div 
        className="flex flex-col items-center justify-center h-12 px-1"
        animate={{ 
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#2DE582] to-blue-400 rounded-full mb-1 shadow-lg shadow-[#2DE582]/50" />
        <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full shadow-lg shadow-blue-400/50" />
      </motion.div>
      
      <TimeUnit 
        value={timeLeft.minutes} 
        label="Min" 
        prevValue={prevTimeLeft.minutes} 
        index={2} 
      />
      
      <motion.div 
        className="flex flex-col items-center justify-center h-12 px-1"
        animate={{ 
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#2DE582] to-blue-400 rounded-full mb-1 shadow-lg shadow-[#2DE582]/50" />
        <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full shadow-lg shadow-blue-400/50" />
      </motion.div>
      
      <TimeUnit 
        value={timeLeft.seconds} 
        label="Sec" 
        prevValue={prevTimeLeft.seconds} 
        index={3} 
      />
    </div>
  );
};

export default CountdownTimer;