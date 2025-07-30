import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Trophy, Ticket, DollarSign, Star, TrendingUp, Zap, Gift } from 'lucide-react';
import { LotteryPool } from '../types/lottery';
import { useAccount } from 'wagmi';
import toast from 'react-hot-toast';
import CountdownTimer from './components/CountdownTimer';

interface PoolCardProps {
  pool: LotteryPool;
}

const PoolCard: React.FC<PoolCardProps> = ({ pool }) => {
  const { isConnected } = useAccount();
  const [isHovered, setIsHovered] = useState(false);

  const progressPercentage = (pool.soldTickets / pool.maxTickets) * 100;

  const handleBuyTicket = () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }
    
    if (!pool.isActive) {
      toast.error('This lottery has ended');
      return;
    }

    // Mock transaction
    toast.loading('Purchasing ticket...', { id: 'buy-ticket' });
    
    setTimeout(() => {
      toast.success('Ticket purchased successfully!', { id: 'buy-ticket' });
    }, 2000);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getUrgencyLevel = () => {
    if (progressPercentage > 90) return { level: 'critical', text: 'Almost Full!', color: 'text-red-400' };
    if (progressPercentage > 75) return { level: 'high', text: 'Filling Fast!', color: 'text-orange-400' };
    if (progressPercentage > 50) return { level: 'medium', text: 'Hot Pool', color: 'text-yellow-400' };
    return { level: 'low', text: 'New Pool', color: 'text-green-400' };
  };

  const urgency = getUrgencyLevel();

  return (
    <motion.div
      className="group relative"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Main Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-purple-500/30 shadow-2xl">
        
        {/* Animated Border Glow */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(45deg, #8b5cf6, #06b6d4, #8b5cf6)',
            padding: '2px',
            backgroundSize: '300% 300%',
          }}
          animate={{
            backgroundPosition: isHovered ? ['0% 50%', '100% 50%'] : '0% 50%',
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            repeatType: 'reverse',
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-3xl" />
        </motion.div>

        {/* Floating Elements */}
       <div className="absolute top-4 right-4 flex flex-col items-end space-y-2">
          <motion.div
            className={`px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 ${urgency.color} text-xs font-bold`}
            animate={{
              scale: urgency.level === 'critical' ? [1, 1.1, 1] : 1,
            }}
            transition={{ 
              duration: 1, 
              repeat: urgency.level === 'critical' ? Infinity : 0 
            }}
          >
            {urgency.text}
          </motion.div>
          
          {pool.isActive && (
            <div className="flex items-center space-x-1 px-2 py-1 rounded-full bg-red-500/20 border border-red-500/30">
           <div className="flex items-center space-x-1 px-2 py-1 rounded-full bg-green-500/20 border border-green-500/40 shrink-0">
              <motion.div
                className="w-2 h-2 bg-red-400 rounded-full"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-pink-400 text-xs font-medium">LIVE</span>
            </div>
            </div>
          )}
        </div>

        {/* Gift Icons - Top Left */}
        <div className="absolute top-4 left-4 z-20">
          <div className="flex items-center space-x-1">
            <Gift className="w-5 h-5 text-orange-400" />
            <Star className="w-4 h-4 text-orange-400 fill-current" />
          </div>
        </div>

       {/* Gift Icon - Separate positioning */}
       <div className="absolute top-4 left-4">
         <div className="flex items-center space-x-1">
           <Gift className="w-5 h-5 text-yellow-400" />
           <Star className="w-4 h-4 text-yellow-400 fill-current" />
         </div>
       </div>

       {/* Gift Icon - Separate positioning */}
       <div className="absolute top-4 left-4">
         <div className="flex items-center space-x-1">
           <Gift className="w-5 h-5 text-yellow-400" />
           <Star className="w-4 h-4 text-yellow-400 fill-current" />
         </div>
       </div>

        <div className="relative z-10 p-8">
          {/* Header with Prize Pool */}
          <div className="mb-6">
            <div className="mb-2">
              <h3 className="text-2xl font-bold text-white">{pool.name}</h3>
            </div>
            <motion.div>
              <div className="text-pink-400 text-sm font-medium mb-1">PRIZE POOL</div>
              <motion.div 
                className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400"
                animate={isHovered ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                ${pool.prizePool}
              </motion.div>
              <div className="text-pink-400/70 text-sm">USDT</div>
            </motion.div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-3 rounded-xl bg-white/5 border border-pink-500/20">
              <DollarSign className="w-5 h-5 text-pink-400 mx-auto mb-1" />
              <div className="text-pink-400 font-bold">${pool.ticketPrice}</div>
              <div className="text-gray-400 text-xs">per ticket</div>
            </div>
            
            <div className="text-center p-3 rounded-xl bg-white/5 border border-fuchsia-500/20">
              <Users className="w-5 h-5 text-fuchsia-400 mx-auto mb-1" />
              <div className="text-fuchsia-400 font-bold">{pool.soldTickets}</div>
              <div className="text-gray-400 text-xs">participants</div>
            </div>
            
            <div className="text-center p-3 rounded-xl bg-white/5 border border-orange-500/20">
              <Ticket className="w-5 h-5 text-orange-400 mx-auto mb-1" />
              <div className="text-orange-400 font-bold">{pool.maxTickets - pool.soldTickets}</div>
              <div className="text-gray-400 text-xs">left</div>
            </div>
          </div>

          {/* Enhanced Progress Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white font-medium">Ticket Sales</span>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-pink-400" />
                <span className="text-pink-400 font-bold">{progressPercentage.toFixed(0)}%</span>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full bg-gray-700/50 rounded-full h-4 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-orange-500 relative"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 2, ease: "easeOut" }}
                >
                  {/* Animated shimmer */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
                    animate={{ x: [-100, 400] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Timer or Winner */}
          {pool.isActive ? (
            <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30">
              <div className="flex items-center space-x-2 mb-3">
                <Clock className="w-5 h-5 text-orange-400" />
                <span className="text-orange-400 font-medium">Ends In</span>
              </div>
              <CountdownTimer endTime={pool.endTime} />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30"
            >
              <div className="flex items-center space-x-2 mb-2">
                <Trophy className="w-6 h-6 text-emerald-400" />
                <span className="text-emerald-400 font-bold">🏆 WINNER!</span>
              </div>
              <div className="text-emerald-300 font-mono bg-emerald-500/20 px-3 py-2 rounded">
                {formatAddress(pool.winner!)}
              </div>
            </motion.div>
          )}

          {/* Call to Action Button */}
          <motion.button
            className={`w-full py-4 px-6 rounded-2xl font-bold text-lg relative overflow-hidden transition-all duration-300 ${
              pool.isActive
                ? 'bg-gradient-to-r from-pink-600 to-fuchsia-600 hover:from-pink-700 hover:to-fuchsia-700 text-white shadow-xl hover:shadow-2xl'
                : 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
            }`}
            whileHover={pool.isActive ? { 
              scale: 1.02 
            } : {}}
            onClick={handleBuyTicket}
          >
            {pool.isActive && (
              <>
                {/* Button glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12"
                  animate={{ x: [-100, 400] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                />
                {/* Pulse effect */}
              </>
            )}
            
            <div className="flex items-center justify-center space-x-3 relative z-10">
              <Zap className="w-6 h-6" />
              <span>
                {pool.isActive ? 'JOIN THE DRAW' : 'DRAW ENDED'}
              </span>
              {pool.isActive && <Ticket className="w-5 h-5" />}
            </div>
          </motion.button>

          {/* Winning Odds */}
          {pool.isActive && (
            <div className="mt-4 text-center">
              <div className="text-gray-400 text-sm">
                Your odds: <span className="text-white font-medium">1 in {pool.maxTickets - pool.soldTickets + 1}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PoolCard;