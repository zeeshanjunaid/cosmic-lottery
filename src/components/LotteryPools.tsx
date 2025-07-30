import React from 'react';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { Clock, Trophy, Star, Zap } from 'lucide-react';
import PoolCard from './PoolCard';
import { LotteryPool } from '../types/lottery';


const LotteryPools: React.FC = () => {
  const { address, isConnected } = useAccount();

  const mockPools: LotteryPool[] = [
    {
      id: '1',
      name: 'Stellar Jackpot',
      ticketPrice: 10,
      maxTickets: 100,
      soldTickets: 67,
      endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      isActive: true,
      winner: null,
      prizePool: 800,
    },
    {
      id: '2',
      name: 'Galactic Prize',
      ticketPrice: 25,
      maxTickets: 50,
      soldTickets: 38,
      endTime: new Date(Date.now() + 5 * 60 * 60 * 1000), // 5 hours from now
      isActive: true,
      winner: null,
      prizePool: 1200,
    },
    {
      id: '3',
      name: 'Nebula Millions',
      ticketPrice: 5,
      maxTickets: 200,
      soldTickets: 145,
      endTime: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour from now
      isActive: true,
      winner: null,
      prizePool: 900,
    },
    {
      id: '4',
      name: '🎉 Congratulations! You Won!',
      ticketPrice: 50,
      maxTickets: 20,
      soldTickets: 20,
      endTime: new Date(Date.now() - 1 * 60 * 60 * 1000), // Ended 1 hour ago
      isActive: false,
      winner: isConnected && address ? address : null, // Use connected wallet as winner
      prizePool: 1500,
    },
  ];

  // Categorize pools
  const activePools = mockPools.filter(pool => pool.isActive);
  const endedPools = mockPools.filter(pool => !pool.isActive);
  const featuredPool = activePools.find(pool => pool.prizePool >= 1000);
  const quickDrawPools = activePools.filter(pool => pool.ticketPrice <= 10 && pool.id !== featuredPool?.id);
  const highStakesPools = activePools.filter(pool => pool.ticketPrice > 10 && pool.id !== featuredPool?.id);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-12"
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-12 px-4"
      >
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white">
          Cosmic <span className="text-[#2DE582]">Lottery</span>
        </h1>
        <p className="text-gray-400 text-sm sm:text-lg max-w-2xl mx-auto px-4">
          Experience fair, transparent, and secure decentralized lottery pools. Choose your destiny among the stars.
        </p>
        
        {/* Platform Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mt-6 sm:mt-8">
          <div className="bg-[#181830]/60 backdrop-blur-xl border border-white/10 rounded-xl p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-bold text-[#2DE582]">$45k+</div>
            <div className="text-xs sm:text-sm text-gray-400">Total Prizes</div>
          </div>
          <div className="bg-[#181830]/60 backdrop-blur-xl border border-white/10 rounded-xl p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-bold text-blue-400">1,249</div>
            <div className="text-xs sm:text-sm text-gray-400">Players</div>
          </div>
          <div className="bg-[#181830]/60 backdrop-blur-xl border border-white/10 rounded-xl p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-bold text-yellow-400">127</div>
            <div className="text-xs sm:text-sm text-gray-400">Winners</div>
          </div>
          <div className="bg-[#181830]/60 backdrop-blur-xl border border-white/10 rounded-xl p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-bold text-purple-400">{activePools.length}</div>
            <div className="text-xs sm:text-sm text-gray-400">Live Pools</div>
          </div>
        </div>
      </motion.div>

      {/* Featured Pool */}
      {featuredPool && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-8"
        >
          <div className="bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 border border-yellow-500/20 rounded-2xl p-4 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl shadow-lg">
                  <Star className="w-5 h-5 sm:w-7 sm:h-7 text-white fill-current" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-3xl font-bold text-white">🌟 Featured Jackpot</h2>
                  <p className="text-yellow-200/80 text-xs sm:text-sm">The biggest prize pool waiting for you!</p>
                </div>
              </div>
              <div className="hidden md:block text-right">
                <div className="text-yellow-400 text-sm font-medium">PREMIUM</div>
                <div className="text-yellow-200/60 text-xs">Highest Rewards</div>
              </div>
            </div>
            
            {/* Featured Pool Quick Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-yellow-500/20">
              <div className="text-center">
                <div className="text-yellow-400 font-bold text-sm sm:text-lg">${featuredPool.prizePool}</div>
                <div className="text-yellow-200/60 text-xs">Prize Pool</div>
              </div>
              <div className="text-center">
                <div className="text-yellow-400 font-bold text-sm sm:text-lg">{featuredPool.soldTickets}/{featuredPool.maxTickets}</div>
                <div className="text-yellow-200/60 text-xs">Tickets Sold</div>
              </div>
              <div className="text-center">
                <div className="text-yellow-400 font-bold text-sm sm:text-lg">1:{featuredPool.maxTickets}</div>
                <div className="text-yellow-200/60 text-xs">Win Odds</div>
              </div>
            </div>
          </div>
          <PoolCard pool={featuredPool} />
        </motion.div>
      )}

      {/* Quick Draw Pools */}
      {quickDrawPools.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="bg-gradient-to-r from-[#2DE582]/10 via-green-500/10 to-emerald-500/10 border border-[#2DE582]/20 rounded-2xl p-4 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="p-3 bg-gradient-to-r from-[#2DE582] to-green-400 rounded-xl shadow-lg">
                  <Zap className="w-5 h-5 sm:w-7 sm:h-7 text-black" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-3xl font-bold text-white">⚡ Quick Draw</h2>
                  <p className="text-green-200/80 text-xs sm:text-sm">Jump in fast! Low cost, instant fun, quick results</p>
                </div>
              </div>
              <div className="hidden md:block text-right">
                <div className="text-[#2DE582] text-sm font-medium">FAST</div>
                <div className="text-green-200/60 text-xs">Low Entry</div>
              </div>
            </div>
            
            {/* Quick Draw Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-[#2DE582]/20">
              <div className="text-center">
                <div className="text-[#2DE582] font-bold text-sm sm:text-lg">{quickDrawPools.length}</div>
                <div className="text-green-200/60 text-xs">Available Pools</div>
              </div>
              <div className="text-center">
                <div className="text-[#2DE582] font-bold text-sm sm:text-lg">$5-$10</div>
                <div className="text-green-200/60 text-xs">Ticket Range</div>
              </div>
              <div className="text-center">
                <div className="text-[#2DE582] font-bold text-sm sm:text-lg">{quickDrawPools.reduce((sum, pool) => sum + pool.soldTickets, 0)}</div>
                <div className="text-green-200/60 text-xs">Tickets Sold</div>
              </div>
              <div className="text-center">
                <div className="text-[#2DE582] font-bold text-sm sm:text-lg">${quickDrawPools.reduce((sum, pool) => sum + pool.prizePool, 0)}</div>
                <div className="text-green-200/60 text-xs">Total Prizes</div>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            {quickDrawPools.map((pool, index) => (
              <motion.div
                key={pool.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <PoolCard pool={pool} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* High Stakes Pools */}
      {highStakesPools.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-8"
        >
          <div className="bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-indigo-600/10 border border-purple-500/20 rounded-2xl p-4 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl shadow-lg">
                  <Trophy className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-3xl font-bold text-white">🏆 High Stakes</h2>
                  <p className="text-purple-200/80 text-xs sm:text-sm">VIP experience with premium pools and mega prizes</p>
                </div>
              </div>
              <div className="hidden md:block text-right">
                <div className="text-purple-400 text-sm font-medium">VIP</div>
                <div className="text-purple-200/60 text-xs">Big Rewards</div>
              </div>
            </div>
            
            {/* High Stakes Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-purple-500/20">
              <div className="text-center">
                <div className="text-purple-400 font-bold text-sm sm:text-lg">{highStakesPools.length}</div>
                <div className="text-purple-200/60 text-xs">VIP Pools</div>
              </div>
              <div className="text-center">
                <div className="text-purple-400 font-bold text-sm sm:text-lg">$25+</div>
                <div className="text-purple-200/60 text-xs">Entry Level</div>
              </div>
              <div className="text-center">
                <div className="text-purple-400 font-bold text-sm sm:text-lg">{highStakesPools.reduce((sum, pool) => sum + pool.soldTickets, 0)}</div>
                <div className="text-purple-200/60 text-xs">VIP Players</div>
              </div>
              <div className="text-center">
                <div className="text-purple-400 font-bold text-sm sm:text-lg">${highStakesPools.reduce((sum, pool) => sum + pool.prizePool, 0)}</div>
                <div className="text-purple-200/60 text-xs">Mega Prizes</div>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            {highStakesPools.map((pool, index) => (
              <motion.div
                key={pool.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <PoolCard pool={pool} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Recent Winners */}
      {endedPools.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-8"
        >
          <div className="bg-gradient-to-r from-orange-500/10 via-pink-500/10 to-rose-500/10 border border-orange-500/20 rounded-2xl p-4 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl shadow-lg">
                  <Clock className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-3xl font-bold text-white">🎉 Recent Winners</h2>
                  <p className="text-orange-200/80 text-xs sm:text-sm">Celebrate with our lucky winners! You could be next</p>
                </div>
              </div>
              <div className="hidden md:block text-right">
                <div className="text-orange-400 text-sm font-medium">WINNERS</div>
                <div className="text-orange-200/60 text-xs">Inspiration</div>
              </div>
            </div>
            
            {/* Winners Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-orange-500/20">
              <div className="text-center">
                <div className="text-orange-400 font-bold text-sm sm:text-lg">{endedPools.length}</div>
                <div className="text-orange-200/60 text-xs">Recent Draws</div>
              </div>
              <div className="text-center">
                <div className="text-orange-400 font-bold text-sm sm:text-lg">100%</div>
                <div className="text-orange-200/60 text-xs">Payout Rate</div>
              </div>
              <div className="text-center">
                <div className="text-orange-400 font-bold text-sm sm:text-lg">${endedPools.reduce((sum, pool) => sum + pool.prizePool, 0)}</div>
                <div className="text-orange-200/60 text-xs">Total Won</div>
              </div>
              <div className="text-center">
                <div className="text-orange-400 font-bold text-sm sm:text-lg">24h</div>
                <div className="text-orange-200/60 text-xs">Recent</div>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            {endedPools.map((pool, index) => (
              <motion.div
                key={pool.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              >
                <PoolCard pool={pool} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default LotteryPools;