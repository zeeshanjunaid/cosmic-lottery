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
      className="space-y-8"
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Cosmic <span className="text-[#2DE582]">Lottery</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Experience fair, transparent, and secure decentralized lottery pools. Choose your destiny among the stars.
        </p>
      </motion.div>

      {/* Featured Pool */}
      {featuredPool && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 border border-yellow-500/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl shadow-lg">
                  <Star className="w-7 h-7 text-white fill-current" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">🌟 Featured Jackpot</h2>
                  <p className="text-yellow-200/80 text-sm">The biggest prize pool waiting for you!</p>
                </div>
              </div>
              <div className="hidden md:block text-right">
                <div className="text-yellow-400 text-sm font-medium">PREMIUM</div>
                <div className="text-yellow-200/60 text-xs">Highest Rewards</div>
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
          className="space-y-6"
        >
          <div className="bg-gradient-to-r from-[#2DE582]/10 via-green-500/10 to-emerald-500/10 border border-[#2DE582]/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-[#2DE582] to-green-400 rounded-xl shadow-lg">
                  <Zap className="w-7 h-7 text-black" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">⚡ Quick Draw</h2>
                  <p className="text-green-200/80 text-sm">Jump in fast! Low cost, instant fun, quick results</p>
                </div>
              </div>
              <div className="hidden md:block text-right">
                <div className="text-[#2DE582] text-sm font-medium">FAST</div>
                <div className="text-green-200/60 text-xs">Low Entry</div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
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
          className="space-y-6"
        >
          <div className="bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-indigo-600/10 border border-purple-500/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl shadow-lg">
                  <Trophy className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">🏆 High Stakes</h2>
                  <p className="text-purple-200/80 text-sm">VIP experience with premium pools and mega prizes</p>
                </div>
              </div>
              <div className="hidden md:block text-right">
                <div className="text-purple-400 text-sm font-medium">VIP</div>
                <div className="text-purple-200/60 text-xs">Big Rewards</div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
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
          className="space-y-6"
        >
          <div className="bg-gradient-to-r from-orange-500/10 via-pink-500/10 to-rose-500/10 border border-orange-500/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl shadow-lg">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">🎉 Recent Winners</h2>
                  <p className="text-orange-200/80 text-sm">Celebrate with our lucky winners! You could be next</p>
                </div>
              </div>
              <div className="hidden md:block text-right">
                <div className="text-orange-400 text-sm font-medium">WINNERS</div>
                <div className="text-orange-200/60 text-xs">Inspiration</div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
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