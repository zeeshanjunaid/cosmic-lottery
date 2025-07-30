import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import useSound from 'use-sound';
import Confetti from 'react-confetti';
import { Clock, Users, Trophy, Ticket, DollarSign, Star, Target, Eye } from 'lucide-react';
import { LotteryPool } from '../types/lottery';
import { useAccount } from 'wagmi';
import toast from 'react-hot-toast';
import CountdownTimer from './CountdownTimer';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface PoolCardProps {
  pool: LotteryPool;
}

const PoolCard: React.FC<PoolCardProps> = ({ pool }) => {
  const { isConnected, address } = useAccount();
  const [isHovered, setIsHovered] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [userTickets, setUserTickets] = useState(0);
  const [hasParticipated, setHasParticipated] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Sound effects using use-sound
  const [playFirecracker] = useSound(
    'https://www.soundjay.com/misc/sounds/magic_chime_02.wav',
    { 
      volume: 0.5,
      onload: () => console.log('Firecracker sound loaded')
    }
  );
  
  const [playCelebration] = useSound(
    'https://www.soundjay.com/misc/sounds/bell_tree.wav',
    { 
      volume: 0.4,
      onload: () => console.log('Celebration sound loaded')
    }
  );
  
  const [playWinSound] = useSound(
    'https://www.soundjay.com/misc/sounds/magic_chime_02.wav',
    { 
      volume: 0.6,
      onload: () => console.log('Win sound loaded')
    }
  );

  // Create celebration sound function
  const createCelebrationSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.3);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      console.log('Web Audio API not supported:', error);
    }
  };

  // React Spring animation for graffiti text
  const graffitiSpring = useSpring({
    from: { scale: 0, rotate: -20 },
    to: { scale: 1, rotate: 0 },
    config: { tension: 300, friction: 10 }
  });

  const progressPercentage = (pool.soldTickets / pool.maxTickets) * 100;

  const handleBuyTicket = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first', {
        icon: '🔌',
        style: { background: '#1C1C1C', color: '#fff', border: '1px solid #2DE582' }
      });
      return;
    }
    
    if (!pool.isActive) {
      toast.error('This lottery has ended', {
        icon: '⏰',
        style: { background: '#1C1C1C', color: '#fff', border: '1px solid #ef4444' }
      });
      return;
    }

    if (pool.soldTickets >= pool.maxTickets) {
      toast.error('All tickets have been sold', {
        icon: '🎫',
        style: { background: '#1C1C1C', color: '#fff', border: '1px solid #ef4444' }
      });
      return;
    }

    setIsPurchasing(true);
    toast.loading('Purchasing ticket...', { 
      id: 'buy-ticket',
      style: { background: '#1C1C1C', color: '#fff', border: '1px solid #2DE582' }
    });
    
    // Simulate blockchain transaction with random outcome
    setTimeout(() => {
      const isWinner = Math.random() < 0.15; // 15% chance to win for better demo
      
      // Update user participation state
      setUserTickets(prev => prev + 1);
      setHasParticipated(true);
      
      if (isWinner) {
        toast.success(`🎉 CONGRATULATIONS! You won ${pool.name}! Prize: $${pool.prizePool}`, { 
          id: 'buy-ticket',
          duration: 6000,
          style: { background: '#1C1C1C', color: '#2DE582', border: '2px solid #2DE582' }
        });
      } else {
        toast.success(`Ticket purchased for ${pool.name}! Good luck! 🍀`, { 
          id: 'buy-ticket',
          style: { background: '#1C1C1C', color: '#fff', border: '1px solid #2DE582' }
        });
        
        // Show "didn't win" message after a delay
        setTimeout(() => {
          toast(`😔 Sorry, you didn't win this time. Better luck next time! 🎲`, {
            icon: '😔',
            duration: 4000,
            style: { background: '#1C1C1C', color: '#fbbf24', border: '1px solid #fbbf24' }
          });
        }, 2000);
      }
      
      setIsPurchasing(false);
    }, 2000);
  };

  const handleClaimReward = () => {
    if (!isConnected) {
      toast.error('Please connect your wallet to claim rewards');
      return;
    }
    
    setIsClaiming(true);
    toast.loading('Processing reward claim...', { id: 'claim-reward' });
    
    // Play celebration sound immediately
    createCelebrationSound();
    
    setTimeout(() => {
      setIsClaiming(false);
      setShowCelebration(true);
      
      // Play another celebration sound
      setTimeout(() => createCelebrationSound(), 500);
      
      toast.success(`🎉 Reward claimed! $${pool.prizePool} has been sent to your wallet!`, { 
        id: 'claim-reward',
        duration: 6000,
        style: { background: '#1C1C1C', color: '#2DE582', border: '2px solid #2DE582' }
      });
      
      // Hide celebration after 4 seconds
      setTimeout(() => {
        setShowCelebration(false);
      }, 4000);
    }, 3000);
  };
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative group"
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-[#1a1a2e]/90 via-[#181830]/90 to-[#16213e]/90 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-[0_20px_40px_rgba(45,229,130,0.1)] transition-all duration-500 rounded-3xl">
        
        {/* Animated border gradient */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#2DE582]/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
        
        {/* Celebration Overlay */}
        {showCelebration && (
          <>
            {/* Confetti Effect */}
            <div className="absolute inset-0 z-40 pointer-events-none">
              <Confetti
                width={400}
                height={300}
                numberOfPieces={100}
                recycle={false}
                colors={['#2DE582', '#ff0080', '#00ff80', '#8000ff', '#ff8000', '#ffff00']}
              />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-pink-500/30 via-yellow-400/30 to-[#2DE582]/30 z-30 flex items-center justify-center rounded-2xl overflow-hidden"
            >
              {/* Graffiti-style background pattern */}
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1.5, rotate: 45 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0 opacity-20"
                style={{
                  background: `
                    radial-gradient(circle at 20% 20%, #ff0080 0%, transparent 50%),
                    radial-gradient(circle at 80% 80%, #00ff80 0%, transparent 50%),
                    radial-gradient(circle at 40% 70%, #8000ff 0%, transparent 50%),
                    radial-gradient(circle at 70% 30%, #ff8000 0%, transparent 50%)
                  `
                }}
              />
              
              {/* Spray paint splashes */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={`splash-${i}`}
                  initial={{ 
                    scale: 0,
                    x: 0,
                    y: 0,
                    rotate: 0
                  }}
                  animate={{ 
                    scale: [0, 2, 1],
                    x: [(Math.random() - 0.5) * 400],
                    y: [(Math.random() - 0.5) * 300],
                    rotate: [0, Math.random() * 720]
                  }}
                  transition={{ 
                    duration: 1.5,
                    delay: i * 0.1,
                    ease: "easeOut"
                  }}
                  className={`absolute w-6 h-6 rounded-full ${
                    ['bg-pink-500', 'bg-purple-500', 'bg-yellow-400', 'bg-green-400', 'bg-blue-500', 'bg-red-500', 'bg-orange-500', 'bg-cyan-400', 'bg-lime-400', 'bg-fuchsia-500', 'bg-amber-400', 'bg-emerald-400'][i]
                  }`}
                  style={{
                    left: '50%',
                    top: '50%',
                    filter: 'blur(0.5px)',
                    boxShadow: '0 0 10px currentColor',
                  }}
                />
              ))}
              
              <div className="text-center space-y-4 relative z-10">
                {/* Graffiti-style "BOOM" text with react-spring */}
                <animated.div
                  style={graffitiSpring}
                  className="relative"
                >
                  <div 
                    className="text-6xl font-black text-transparent bg-clip-text"
                    style={{
                      backgroundImage: 'linear-gradient(45deg, #ff0080, #ff8000, #00ff80, #8000ff)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.8))',
                      fontFamily: 'Impact, Arial Black, sans-serif',
                      textShadow: '4px 4px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000',
                    }}
                  >
                    BOOM!
                  </div>
                  {/* Multiple outline layers for graffiti effect */}
                  <div 
                    className="absolute inset-0 text-6xl font-black text-white opacity-30"
                    style={{
                      fontFamily: 'Impact, Arial Black, sans-serif',
                      transform: 'translate(3px, 3px)',
                    }}
                  >
                    BOOM!
                  </div>
                  <div 
                    className="absolute inset-0 text-6xl font-black text-black opacity-50"
                    style={{
                      fontFamily: 'Impact, Arial Black, sans-serif',
                      transform: 'translate(1px, 1px)',
                    }}
                  >
                    BOOM!
                  </div>
                </animated.div>
                
                <motion.div
                  animate={{ 
                    scale: [1, 1.4, 1],
                    rotate: [0, 20, -20, 0]
                  }}
                  transition={{ 
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="text-8xl"
                >
                  💰
                </motion.div>
                
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="text-white font-black text-xl tracking-wider"
                  style={{
                    fontFamily: 'Impact, Arial Black, sans-serif',
                    textShadow: '3px 3px 6px rgba(0,0,0,0.9)',
                    filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))',
                  }}
                >
                  JACKPOT WON!
                </motion.div>
                
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  className="text-yellow-300 font-black text-4xl"
                  style={{
                    fontFamily: 'Impact, Arial Black, sans-serif',
                    textShadow: '4px 4px 8px rgba(0,0,0,0.9)',
                    filter: 'drop-shadow(0 0 15px rgba(255, 255, 0, 0.7))',
                  }}
                >
                  ${pool.prizePool}
                </motion.div>
              </div>
              
              {/* Enhanced floating elements */}
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={`float-${i}`}
                  initial={{ 
                    scale: 0,
                    x: 0,
                    y: 0,
                    opacity: 1,
                    rotate: 0
                  }}
                  animate={{ 
                    scale: [0, 1.5, 0],
                    x: [0, (Math.random() - 0.5) * 400],
                    y: [0, -Math.random() * 300],
                    opacity: [1, 1, 0],
                    rotate: [0, Math.random() * 1080]
                  }}
                  transition={{ 
                    duration: 3,
                    delay: i * 0.15,
                    ease: "easeOut"
                  }}
                  className="absolute text-4xl"
                  style={{
                    left: '50%',
                    top: '50%',
                    filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))',
                  }}
                >
                  {['💎', '⭐', '🎊', '✨', '🏆', '💰', '🔥', '⚡', '🌟', '💸', '🎯', '🚀', '🎉', '💵', '🎪'][i]}
                </motion.div>
              ))}
              
              {/* Electric sparks effect */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={`spark-${i}`}
                  initial={{ 
                    scale: 0,
                    x: 0,
                    y: 0,
                    opacity: 1
                  }}
                  animate={{ 
                    scale: [0, 1, 0],
                    x: [(Math.random() - 0.5) * 500],
                    y: [(Math.random() - 0.5) * 400],
                    opacity: [1, 0.9, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    delay: i * 0.08,
                    ease: "easeOut"
                  }}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                    backgroundColor: ['#fef08a', '#2DE582', '#ff0080', '#00ff80', '#8000ff'][i % 5],
                    boxShadow: '0 0 8px currentColor',
                  }}
                />
              ))}
            </motion.div>
          </>
        )}

        {/* Top Row: Status Badge and Featured */}
        <div className="absolute top-6 inset-x-6 flex items-center justify-between z-20">
          <motion.div
            animate={{ 
              rotate: isHovered ? 360 : 0,
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ duration: 0.8 }}
            className="p-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-xl border border-yellow-400/30 backdrop-blur-sm"
          >
            <Star className="w-5 h-5 text-yellow-400 fill-current drop-shadow-sm" />
          </motion.div>

          {pool.isActive ? (
            <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#2DE582]/20 to-green-500/20 border border-[#2DE582]/40 backdrop-blur-sm shadow-lg">
              <motion.div
                className="w-2 h-2 bg-[#2DE582] rounded-full"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-[#2DE582] text-sm font-bold tracking-wide">LIVE</span>
            </div>
          ) : (
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-gray-600/20 to-gray-500/20 border border-gray-500/40 backdrop-blur-sm">
              <span className="text-gray-300 text-sm font-bold tracking-wide">ENDED</span>
            </div>
          )}
        </div>

        <CardContent className="p-8 pt-20 space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white tracking-tight">{pool.name}</h3>
            <p className="text-white/60 text-base">Join the cosmic lottery for a chance to win big!</p>
          </div>

          {/* Prize Pool - Main Feature */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600/30 via-blue-600/30 to-indigo-600/30 border border-purple-400/40 p-8 shadow-xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#2DE582]/5 via-transparent to-purple-500/5" />
            
            {/* Lottery Wheel Icon */}
            <div className="absolute right-6 top-6">
              <motion.div
                animate={{ 
                  rotate: isHovered ? 360 : 0,
                  scale: isHovered ? 1.1 : 1
                }}
                transition={{ duration: 2, ease: "linear" }}
                className="w-20 h-20 rounded-full border-4 border-gradient-to-r from-yellow-400 to-orange-400 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 flex items-center justify-center shadow-2xl"
              >
                <Target className="w-10 h-10 text-white drop-shadow-lg" />
              </motion.div>
            </div>
            
            <div className="space-y-4 relative">
              <div className="space-y-2">
                <div className="text-white/80 text-lg font-semibold">{pool.name}</div>
                <div className="text-[#2DE582] text-sm font-bold tracking-wide">🎯 COSMIC JACKPOT</div>
              </div>
              <div className="text-5xl font-black text-white tracking-tight drop-shadow-lg">${pool.prizePool}</div>
              <div className="text-white/70 text-base max-w-xs">Join thousands of cosmic travelers competing for the ultimate prize!</div>
            </div>
            
            <button
              onClick={handleBuyTicket}
              disabled={!pool.isActive || isPurchasing || hasParticipated}
              className={`mt-6 w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl ${
                pool.isActive && !isPurchasing && !hasParticipated
                  ? 'bg-gradient-to-r from-[#2DE582] to-green-400 hover:from-[#2DE582]/90 hover:to-green-400/90 text-black cursor-pointer shadow-[0_10px_20px_rgba(45,229,130,0.3)]'
                  : hasParticipated && pool.isActive
                  ? 'bg-gradient-to-r from-blue-500/70 to-indigo-500/70 text-white cursor-not-allowed'
                  : 'bg-gradient-to-r from-gray-600/50 to-gray-700/50 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isPurchasing 
                ? (
                  <div className="flex items-center justify-center space-x-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                    />
                    <span>Processing...</span>
                  </div>
                )
                : hasParticipated && pool.isActive
                ? `✨ Joined (${userTickets} ticket${userTickets > 1 ? 's' : ''})`
                : pool.isActive 
                ? '🚀 Join the Hunt' 
                : '⏰ Draw Ended'
              }
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-4 text-center border border-white/20 backdrop-blur-sm hover:border-[#2DE582]/30 transition-colors">
              <div className="p-2 bg-[#2DE582]/20 rounded-xl w-fit mx-auto mb-3">
                <DollarSign className="w-5 h-5 text-[#2DE582]" />
              </div>
              <div className="text-white font-bold text-lg">${pool.ticketPrice}</div>
              <div className="text-white/60 text-sm font-medium">per ticket</div>
            </div>
            
            <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-4 text-center border border-white/20 backdrop-blur-sm hover:border-blue-400/30 transition-colors">
              <div className="p-2 bg-blue-400/20 rounded-xl w-fit mx-auto mb-3">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-white font-bold text-lg">{pool.soldTickets}</div>
              <div className="text-white/60 text-sm font-medium">explorers</div>
              {hasParticipated && (
                <div className="text-[#2DE582] text-sm font-bold mt-2 bg-[#2DE582]/10 rounded-lg py-1">You: {userTickets}</div>
              )}
            </div>
            
            <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-4 text-center border border-white/20 backdrop-blur-sm hover:border-purple-400/30 transition-colors">
              <div className="p-2 bg-purple-400/20 rounded-xl w-fit mx-auto mb-3">
                <Ticket className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-white font-bold text-lg">{pool.maxTickets - pool.soldTickets}</div>
              <div className="text-white/60 text-sm font-medium">spots left</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white/80 text-base font-medium">Mission Progress</span>
              <span className="text-[#2DE582] font-bold text-lg">{progressPercentage.toFixed(0)}%</span>
            </div>
            
            <div className="relative">
              <Progress 
                value={progressPercentage} 
                className="h-3 bg-white/10 rounded-full [&>div]:bg-gradient-to-r [&>div]:from-[#2DE582] [&>div]:via-green-400 [&>div]:to-blue-400 [&>div]:rounded-full shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#2DE582]/20 to-blue-400/20 rounded-full blur-sm" />
            </div>
          </div>

          {/* Timer or Winner */}
          {pool.isActive ? (
            <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-6 border border-white/20 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-[#2DE582]/20 rounded-xl">
                  <Clock className="w-5 h-5 text-[#2DE582]" />
                </div>
                <span className="text-white font-semibold text-lg">Mission Countdown</span>
              </div>
              <CountdownTimer endTime={pool.endTime} />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-[#2DE582]/20 to-green-500/20 rounded-3xl p-6 border border-[#2DE582]/40 shadow-2xl">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-[#2DE582]/30 rounded-xl">
                    <Trophy className="w-6 h-6 text-[#2DE582]" />
                  </div>
                  <span className="text-[#2DE582] font-bold text-xl">🏆 COSMIC CHAMPION!</span>
                </div>
                <div className="text-white font-mono bg-[#2DE582]/20 px-4 py-3 rounded-xl text-base mb-4 border border-[#2DE582]/30">
                  {formatAddress(pool.winner)}
                </div>
                
                {/* Check if current user is the winner */}
                {isConnected && address && address.toLowerCase() === pool.winner.toLowerCase() && (
                  <Button
                    asChild
                    className={`w-full py-4 text-lg font-bold rounded-2xl shadow-xl ${
                      isClaiming || showCelebration
                        ? 'bg-gradient-to-r from-gray-500 to-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#2DE582] to-green-400 hover:from-[#2DE582]/90 hover:to-green-400/90 text-black transform hover:scale-105 active:scale-95'
                    }`}
                    disabled={isClaiming || showCelebration}
                  >
                    <motion.button
                      onClick={handleClaimReward}
                      disabled={isClaiming || showCelebration}
                      animate={isClaiming ? {
                        backgroundColor: ["#2DE582", "#22c55e", "#16a34a", "#2DE582"],
                        scale: [1, 1.02, 1]
                      } : {}}
                      transition={isClaiming ? {
                        duration: 0.8,
                        repeat: Infinity,
                        repeatType: "reverse"
                      } : { duration: 0.2 }}
                    >
                      {isClaiming ? (
                        <div className="flex items-center justify-center space-x-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-black border-t-transparent rounded-full"
                          />
                          <span>Processing...</span>
                        </div>
                      ) : showCelebration ? (
                        <span>✅ Claimed!</span>
                      ) : (
                        <span>🎉 Claim Your Cosmic Reward: ${pool.prizePool}</span>
                      )}
                    </motion.button>
                  </Button>
                )}
              </div>
            </div>
          )}
          
          {/* View Details Button */}
          <Dialog>
            <DialogTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full py-3 px-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600/30 hover:to-blue-600/30 border border-purple-500/30 hover:border-purple-400/50 rounded-xl text-white/80 hover:text-white font-medium transition-all duration-300 overflow-hidden"
              >
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#2DE582]/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="relative flex items-center justify-center space-x-2">
                  <motion.div
                    animate={{ rotate: isHovered ? 360 : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Eye className="w-4 h-4 text-purple-400 group-hover:text-[#2DE582]" />
                  </motion.div>
                  <span className="text-sm font-semibold">Mission Details</span>
                  <motion.div
                    animate={{ x: isHovered ? 3 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="opacity-60 group-hover:opacity-100"
                  >
                    →
                  </motion.div>
                </div>
                
                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300" />
              </motion.button>
            </DialogTrigger>
            <DialogContent className="bg-[#181830] border-white/10 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white">{pool.name}</DialogTitle>
              </DialogHeader>
              
              {/* Pool Status */}
              <div className="mb-6">
                <Badge 
                  variant={pool.isActive ? "default" : "destructive"}
                  className={pool.isActive 
                    ? 'bg-[#2DE582]/20 border-[#2DE582]/30 text-[#2DE582]'
                    : 'bg-red-500/20 border-red-500/30 text-red-400'
                  }
                >
                  <div className={`w-2 h-2 rounded-full mr-2 ${pool.isActive ? 'bg-[#2DE582]' : 'bg-red-400'}`} />
                  {pool.isActive ? 'Active' : 'Ended'}
                </Badge>
              </div>

              {/* Pool Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <Card className="bg-[#1C1C1C]/60 border-white/10">
                  <CardContent className="p-4 text-center">
                    <DollarSign className="w-6 h-6 text-[#2DE582] mx-auto mb-2" />
                    <div className="text-xl font-bold text-white">${pool.ticketPrice}</div>
                    <div className="text-sm text-gray-400">Ticket Price</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#1C1C1C]/60 border-white/10">
                  <CardContent className="p-4 text-center">
                    <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                    <div className="text-xl font-bold text-white">{pool.soldTickets}</div>
                    <div className="text-sm text-gray-400">Tickets Sold</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#1C1C1C]/60 border-white/10">
                  <CardContent className="p-4 text-center">
                    <Ticket className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                    <div className="text-xl font-bold text-white">{pool.maxTickets}</div>
                    <div className="text-sm text-gray-400">Max Tickets</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#1C1C1C]/60 border-white/10">
                  <CardContent className="p-4 text-center">
                    <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                    <div className="text-xl font-bold text-white">${pool.prizePool}</div>
                    <div className="text-sm text-gray-400">Prize Pool</div>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Information */}
              <Card className="bg-[#1C1C1C]/60 border-white/10 mb-6">
                <CardHeader>
                  <h3 className="text-lg font-semibold text-white">Pool Information</h3>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Pool ID:</span>
                    <span className="text-white font-mono">{pool.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Progress:</span>
                    <span className="text-white">{progressPercentage.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Remaining Tickets:</span>
                    <span className="text-white">{pool.maxTickets - pool.soldTickets}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Win Odds:</span>
                    <span className="text-white">1 in {pool.maxTickets}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">End Date:</span>
                    <span className="text-white">{pool.endTime.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">End Time:</span>
                    <span className="text-white">{pool.endTime.toLocaleTimeString()}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Winner Info */}
              {pool.winner && (
                <Card className="bg-[#2DE582]/10 border-[#2DE582]/30">
                  <CardHeader>
                    <h3 className="text-[#2DE582] font-semibold flex items-center space-x-2">
                      <Trophy className="w-4 h-4" />
                      <span>Winner</span>
                    </h3>
                  </CardHeader>
                  <CardContent className="text-sm space-y-1">
                    <div className="text-white font-mono">{formatAddress(pool.winner)}</div>
                    <div className="text-[#2DE582] font-bold">Prize: ${pool.prizePool}</div>
                  </CardContent>
                </Card>
              )}
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PoolCard;