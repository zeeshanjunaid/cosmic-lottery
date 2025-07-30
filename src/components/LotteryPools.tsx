import React from 'react';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-white mb-2">Active Lottery Pools</h2>
        <p className="text-gray-400">Choose your destiny among the stars</p>
      </motion.div>

        {mockPools.map((pool, index) => (
          <motion.div
            key={pool.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <PoolCard pool={pool} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default LotteryPools;