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

  const TimeUnit: React.FC<{ value: number; label: string; prevValue: number }> = ({ 
    value, 
    label, 
    prevValue
  }) => {
    const hasChanged = value !== prevValue;
    
    return (
      <div className="flex flex-col items-center">
        {/* Time Value with Flip Animation */}
        <div className="relative w-12 h-12 sm:w-14 sm:h-14">
          <motion.div 
            className="absolute inset-0 bg-[#1C1C1C] border border-white/20 rounded-lg flex items-center justify-center"
            whileHover={{ borderColor: "rgba(45, 229, 130, 0.4)" }}
            transition={{ duration: 0.2 }}
          >
            <motion.span
              key={value}
              className="text-lg sm:text-xl font-bold text-white tabular-nums"
              initial={hasChanged ? { rotateX: -90, opacity: 0 } : false}
              animate={{ rotateX: 0, opacity: 1 }}
              transition={{ 
                duration: 0.4,
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
            >
              {value.toString().padStart(2, '0')}
            </motion.span>
          </motion.div>
          
          {/* Flip animation background */}
          {hasChanged && (
            <motion.div
              className="absolute inset-0 bg-[#2DE582]/20 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ duration: 0.5 }}
            />
          )}
        </div>
        
        {/* Label */}
        <span className="text-xs text-white/60 mt-2 font-medium uppercase tracking-wide">
          {label}
        </span>
      </div>
    );
  };

  if (isExpired) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-4"
      >
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-lg">
          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
          <span className="text-red-400 font-semibold text-sm">Lottery Ended</span>
        </div>
      </motion.div>
    );
  }

  // Filter out zero values for cleaner display
  const timeUnits = [
    { value: timeLeft.days, label: 'Days', key: 'days' },
    { value: timeLeft.hours, label: 'Hours', key: 'hours' },
    { value: timeLeft.minutes, label: 'Min', key: 'minutes' },
    { value: timeLeft.seconds, label: 'Sec', key: 'seconds' }
  ].filter(unit => {
    // Always show hours, minutes, seconds. Only show days if > 0
    return unit.key !== 'days' || unit.value > 0;
  });

  return (
    <div className="flex items-center justify-center space-x-3 sm:space-x-4">
      {timeUnits.map((unit, index) => (
        <React.Fragment key={unit.key}>
          <TimeUnit 
            value={unit.value} 
            label={unit.label} 
            prevValue={prevTimeLeft[unit.key as keyof TimeLeft]}
          />
          {index < timeUnits.length - 1 && (
            <div className="flex flex-col items-center justify-center h-12 sm:h-14">
              <motion.div
                className="w-1 h-1 bg-white/40 rounded-full mb-1"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.div
                className="w-1 h-1 bg-white/40 rounded-full"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CountdownTimer;