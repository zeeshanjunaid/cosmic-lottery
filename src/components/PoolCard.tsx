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
  const { isConnected, address } = useAccount();
  const [isHovered, setIsHovered] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

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
    
    toast.loading('Processing reward claim...', { id: 'claim-reward' });
    
    setTimeout(() => {
      toast.success(`🎉 Reward claimed! $${pool.prizePool} has been sent to your wallet!`, { 
        id: 'claim-reward',
        duration: 6000,
        style: { background: '#1C1C1C', color: '#2DE582', border: '2px solid #2DE582' }
      });
    }, 3000);
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
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-[#2DE582]/20 to-green-500/20 rounded-xl p-4 border border-[#2DE582]/30">
              <div className="flex items-center space-x-2 mb-2">
                <Trophy className="w-5 h-5 text-[#2DE582]" />
                <span className="text-[#2DE582] font-bold">🏆 WINNER!</span>
              </div>
              <div className="text-white font-mono bg-[#2DE582]/20 px-3 py-2 rounded text-sm mb-3">
                {formatAddress(pool.winner)}
              </div>
              
              {/* Check if current user is the winner */}
              {isConnected && address && address.toLowerCase() === pool.winner.toLowerCase() && (
                <button
                  onClick={handleClaimReward}
                  className="w-full py-2 px-4 bg-[#2DE582] hover:bg-[#2DE582]/80 rounded-lg font-semibold text-black transition-all duration-300"
                >
                  🎉 Claim Your Reward: ${pool.prizePool}
                </button>
              )}
            </div>
          </div>
        )}
        
        {/* View Details Button */}
        <button
          onClick={() => setShowDetailsModal(true)}
          className="w-full py-2 px-4 bg-[#1C1C1C]/60 hover:bg-[#1C1C1C]/80 border border-white/10 rounded-lg text-white/70 hover:text-white transition-all duration-300 text-sm"
        >
          View Details
        </button>
      </div>

      {/* Details Modal */}
      {showDetailsModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-[#181830] border border-white/10 rounded-2xl p-6 max-w-md w-full"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">{pool.name}</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <div className="w-4 h-4 text-gray-400">✕</div>
              </button>
            </div>

            {/* Pool Details */}
            <div className="space-y-4">
              <div className="bg-[#1C1C1C]/60 rounded-xl p-4 space-y-3">
                <h3 className="text-white font-semibold mb-3">Pool Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Pool ID:</span>
                    <span className="text-white font-mono">{pool.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Ticket Price:</span>
                    <span className="text-white">${pool.ticketPrice} USDT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Total Tickets:</span>
                    <span className="text-white">{pool.maxTickets}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Sold:</span>
                    <span className="text-white">{pool.soldTickets}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Remaining:</span>
                    <span className="text-white">{pool.maxTickets - pool.soldTickets}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Win Odds:</span>
                    <span className="text-white">1 in {pool.maxTickets}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Progress:</span>
                    <span className="text-[#2DE582]">{progressPercentage.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">End Date:</span>
                    <span className="text-white">{pool.endTime.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">End Time:</span>
                    <span className="text-white">{pool.endTime.toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>

              {/* Winner Info */}
              {pool.winner && (
                <div className="bg-[#2DE582]/10 border border-[#2DE582]/30 rounded-xl p-4">
                  <h3 className="text-[#2DE582] font-semibold mb-2 flex items-center space-x-2">
                    <Trophy className="w-4 h-4" />
                    <span>Winner</span>
                  </h3>
                  <div className="text-sm space-y-1">
                    <div className="text-white font-mono">{formatAddress(pool.winner)}</div>
                    <div className="text-[#2DE582] font-bold">Prize: ${pool.prizePool}</div>
                  </div>
                </div>
              )}

              {/* Close Button */}
              <button
                onClick={() => setShowDetailsModal(false)}
                className="w-full py-3 px-4 bg-[#2DE582] hover:bg-[#2DE582]/80 rounded-xl font-semibold text-black transition-all duration-300"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default PoolCard;