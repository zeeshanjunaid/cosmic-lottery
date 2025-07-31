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

  const TimeUnit: React.FC<{ value: number; label: string; prevValue: number; index: number }> = ({ value, label, prevValue, index }) => {
    const hasChanged = value !== prevValue;
    
    return (
    <motion.div
      className="text-center"
      animate={hasChanged ? { scale: [1, 1.02, 1] } : {}}
      transition={{ 
        duration: 0.3, 
        delay: index * 0.05,
        ease: "easeInOut"
      }}
    >
      <motion.div 
        className="bg-[#181830]/80 backdrop-blur-xl rounded-xl p-3 min-w-[48px] border border-white/20 relative overflow-hidden shadow-lg"
        animate={hasChanged ? {
          backgroundColor: ["rgba(24, 24, 48, 0.6)", "rgba(45, 229, 130, 0.2)", "rgba(24, 24, 48, 0.6)"]
        } : {}}
        transition={{ duration: 0.5, delay: index * 0.05 }}
      >
        <motion.div 
          className="text-xl font-bold text-white"
          key={value}
          initial={hasChanged ? { y: -20, opacity: 0 } : false}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2, delay: index * 0.02 }}
        >
          {value.toString().padStart(2, '0')}
        </motion.div>
        
        {/* Subtle glow effect when value changes */}
        {hasChanged && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#2DE582]/20 to-blue-500/20 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
          />
        )}
      </motion.div>
      <div className="text-xs text-gray-400 mt-1">{label}</div>
    </motion.div>
    );
  };

  if (isExpired) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-white/70 font-semibold"
      >
        Lottery Ended
      </motion.div>
    );
  }

  return (
    <div className="flex justify-center space-x-1">
      <TimeUnit value={timeLeft.days} label="Days" prevValue={prevTimeLeft.days} index={0} />
      <div className="flex items-center text-blue-400 font-bold px-1">
        :
      </div>
      <TimeUnit value={timeLeft.hours} label="Hours" prevValue={prevTimeLeft.hours} index={1} />
      <div className="flex items-center text-blue-400 font-bold px-1">
        :
      </div>
      <TimeUnit value={timeLeft.minutes} label="Min" prevValue={prevTimeLeft.minutes} index={2} />
      <div className="flex items-center text-blue-400 font-bold px-1">
        :
      </div>
      <TimeUnit value={timeLeft.seconds} label="Sec" prevValue={prevTimeLeft.seconds} index={3} />
    </div>
  );
};

export default CountdownTimer;