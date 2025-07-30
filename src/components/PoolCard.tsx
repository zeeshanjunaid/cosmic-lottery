import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Trophy, Ticket, DollarSign, Star, Target } from 'lucide-react';
import { LotteryPool } from '../types/lottery';
import { useAccount } from 'wagmi';
import toast from 'react-hot-toast';
import CountdownTimer from './CountdownTimer';

interface PoolCardProps {
  pool: LotteryPool;
}

const PoolCard: React.FC<PoolCardProps> = ({ pool }) => {
  const { isConnected } = useAccount();
  const [isHovered, setIsHovered] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const progressPercentage = (pool.soldTickets / pool.maxTickets) * 100;

  const handleBuyTicket = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }
    
    if (!pool.isActive) {
      toast.error('This lottery has ended');
      return;
    }

    if (pool.soldTickets >= pool.maxTickets) {
      toast.error('All tickets have been sold');
      return;
    }

    setIsPurchasing(true);
    toast.loading('Purchasing ticket...', { id: 'buy-ticket' });
    
    // Simulate blockchain transaction
    setTimeout(() => {
      toast.success(`Ticket purchased for ${pool.name}!`, { id: 'buy-ticket' });
      setIsPurchasing(false);
      // In real app, this would update the pool data from blockchain
    }, 2500);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-2xl bg-[#181830]/60 backdrop-blur-xl border border-white/10 shadow-2xl"
    >
      
      {/* Status Badge */}
      <div className="absolute top-4 right-4 z-20">
        {pool.isActive ? (
          <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-[#2DE582]/20 border border-[#2DE582]/30">
            <motion.div
              className="w-2 h-2 bg-[#2DE582] rounded-full"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-[#2DE582] text-xs font-bold">LIVE</span>
          </div>
        ) : (
          <div className="px-3 py-1 rounded-full bg-white/10 border border-white/20">
            <span className="text-white/70 text-xs font-bold">ENDED</span>
          </div>
        )}
      </div>

      {/* Featured Badge */}
      <div className="absolute top-4 left-4 z-20">
        <Star className="w-5 h-5 text-yellow-400 fill-current" />
      </div>

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-white">{pool.name}</h3>
          <p className="text-white/60 text-sm">Get a cash prize with lucky participants</p>
        </div>

        {/* Prize Pool - Main Feature */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20 border border-purple-500/30 p-6">
          {/* Lottery Wheel Icon */}
          <div className="absolute right-4 top-4">
            <motion.div
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 2, ease: "linear" }}
              className="w-16 h-16 rounded-full border-4 border-yellow-400 bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center"
            >
              <Target className="w-8 h-8 text-white" />
            </motion.div>
          </div>
          
          <div className="space-y-2">
            <div className="text-white/70 text-sm font-medium">{pool.name}</div>
            <div className="text-white/60 text-xs">Lucky Draw</div>
            <div className="text-3xl font-black text-white">${pool.prizePool}</div>
            <div className="text-white/60 text-sm">Get a cash prize of 1,00,000+ participants user.</div>
          </div>
          
          <button
            onClick={handleBuyTicket}
            disabled={!pool.isActive || isPurchasing}
            className={`mt-4 w-full py-3 rounded-xl font-bold text-black transition-all duration-300 ${
              pool.isActive && !isPurchasing
                ? 'bg-[#2DE582] hover:bg-[#2DE582]/80 cursor-pointer'
                : 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isPurchasing ? 'Purchasing...' : pool.isActive ? 'Play' : 'Ended'}
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
            <DollarSign className="w-4 h-4 text-[#2DE582] mx-auto mb-1" />
            <div className="text-white font-bold text-sm">${pool.ticketPrice}</div>
            <div className="text-white/60 text-xs">per ticket</div>
          </div>
          
          <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
            <Users className="w-4 h-4 text-blue-400 mx-auto mb-1" />
            <div className="text-white font-bold text-sm">{pool.soldTickets}</div>
            <div className="text-white/60 text-xs">joined</div>
          </div>
          
          <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
            <Ticket className="w-4 h-4 text-purple-400 mx-auto mb-1" />
            <div className="text-white font-bold text-sm">{pool.maxTickets - pool.soldTickets}</div>
            <div className="text-white/60 text-xs">left</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-white/70 text-sm">Progress</span>
            <span className="text-[#2DE582] font-bold text-sm">{progressPercentage.toFixed(0)}%</span>
          </div>
          
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#2DE582] to-blue-400"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Timer or Winner */}
        {pool.isActive ? (
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-4 h-4 text-[#2DE582]" />
              <span className="text-white/70 font-medium text-sm">Ends In</span>
            </div>
            <CountdownTimer endTime={pool.endTime} />
          </div>
        ) : (
          <div className="bg-gradient-to-r from-[#2DE582]/20 to-green-500/20 rounded-xl p-4 border border-[#2DE582]/30">
            <div className="flex items-center space-x-2 mb-2">
              <Trophy className="w-5 h-5 text-[#2DE582]" />
              <span className="text-[#2DE582] font-bold">🏆 WINNER!</span>
            </div>
            <div className="text-white font-mono bg-[#2DE582]/20 px-3 py-2 rounded text-sm">
              {formatAddress(pool.winner!)}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PoolCard;