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
          className="space-y-4"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-lg">
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
            </div>
            <h2 className="text-2xl font-bold text-white">Featured Jackpot</h2>
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
          className="space-y-4"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-[#2DE582]/20 to-green-400/20 rounded-lg">
              <Zap className="w-6 h-6 text-[#2DE582]" />
            </div>
            <h2 className="text-2xl font-bold text-white">Quick Draw</h2>
            <span className="text-sm text-gray-400">Low cost, fast action</span>
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
          className="space-y-4"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg">
              <Trophy className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">High Stakes</h2>
            <span className="text-sm text-gray-400">Premium pools, bigger rewards</span>
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
          className="space-y-4"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Recent Winners</h2>
            <span className="text-sm text-gray-400">Congratulations!</span>
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