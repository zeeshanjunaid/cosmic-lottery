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
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endTime.getTime() - new Date().getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        
        setTimeLeft({ days, hours, minutes, seconds });
        setIsExpired(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsExpired(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <motion.div 
        key={`${label}-${value}`}
        initial={{ scale: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}
        animate={{ 
          scale: [1, 1.02, 1],
          borderColor: ['rgba(255, 255, 255, 0.2)', 'rgba(45, 229, 130, 0.3)', 'rgba(255, 255, 255, 0.2)']
        }}
        transition={{ 
          duration: 0.4,
          ease: "easeInOut"
        }}
        className="bg-[#2A2A2A] border rounded-lg px-3 py-2 min-w-[48px] sm:min-w-[52px] transition-all duration-200"
      >
        <div className="text-lg sm:text-xl font-bold text-white tabular-nums">
          {value.toString().padStart(2, '0')}
        </div>
      </motion.div>
      <span className="text-xs text-white/60 mt-1 block font-medium uppercase tracking-wider">
        {label}
      </span>
    </div>
  );

  if (isExpired) {
    return (
      <div className="text-center py-2">
        <span className="text-red-400 font-semibold text-sm">Lottery Ended</span>
      </div>
    );
  }

  // Only show days if > 0
  const showDays = timeLeft.days > 0;

  return (
    <div className="flex items-center justify-center gap-4">
      {showDays && <TimeUnit value={timeLeft.days} label="Days" />}
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <TimeUnit value={timeLeft.minutes} label="Min" />
      <TimeUnit value={timeLeft.seconds} label="Sec" />
    </div>
  );
};

export default CountdownTimer;