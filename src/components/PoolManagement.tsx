import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Pause, Play, Trash2, Trophy, Eye, AlertTriangle, CheckCircle } from 'lucide-react';
import { LotteryPool } from '../types/lottery';
import toast from 'react-hot-toast';

const mockAdminPools: (LotteryPool & { canTriggerPayout: boolean })[] = [
  {
    id: '1',
    name: 'Stellar Jackpot',
    ticketPrice: 10,
    maxTickets: 100,
    soldTickets: 67,
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    isActive: true,
    winner: null,
    prizePool: 800,
    canTriggerPayout: false,
  },
  {
    id: '2',
    name: 'Galactic Prize',
    ticketPrice: 25,
    maxTickets: 50,
    soldTickets: 38,
    endTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
    isActive: true,
    winner: null,
    prizePool: 1200,
    canTriggerPayout: false,
  },
  {
    id: '3',
    name: 'Nebula Millions',
    ticketPrice: 5,
    maxTickets: 200,
    soldTickets: 200,
    endTime: new Date(Date.now() - 30 * 60 * 1000), // Ended 30 minutes ago
    isActive: false,
    winner: null,
    prizePool: 950,
    canTriggerPayout: true,
  },
  {
    id: '4',
    name: 'Cosmic Fortune',
    ticketPrice: 50,
    maxTickets: 20,
    soldTickets: 20,
    endTime: new Date(Date.now() - 1 * 60 * 60 * 1000),
    isActive: false,
    winner: '0x742d35Cc6634C0532925a3b8D1C7d8B3b19d6B88',
    prizePool: 950,
    canTriggerPayout: false,
  },
];

const PoolManagement: React.FC = () => {
  const [pools, setPools] = useState(mockAdminPools);

  const handlePausePool = (poolId: string) => {
    setPools(prev => prev.map(pool => 
      pool.id === poolId 
        ? { ...pool, isActive: false }
        : pool
    ));
    toast.success('Pool paused successfully');
  };

  const handleResumePool = (poolId: string) => {
    setPools(prev => prev.map(pool => 
      pool.id === poolId 
        ? { ...pool, isActive: true }
        : pool
    ));
    toast.success('Pool resumed successfully');
  };

  const handleTriggerPayout = (poolId: string) => {
    const pool = pools.find(p => p.id === poolId);
    if (!pool) return;

    toast.loading('Triggering winner selection and payout...', { id: 'payout' });
    
    setTimeout(() => {
      const mockWinner = '0x' + Math.random().toString(16).substring(2, 10) + '...' + Math.random().toString(16).substring(2, 6);
      
      setPools(prev => prev.map(p => 
        p.id === poolId 
          ? { ...p, winner: mockWinner, canTriggerPayout: false }
          : p
      ));
      
      toast.success(`Winner selected! ${mockWinner} wins $${pool.prizePool}`, { id: 'payout' });
    }, 3000);
  };

  const handleDeletePool = (poolId: string) => {
    if (!confirm('Are you sure you want to delete this pool? This action cannot be undone.')) {
      return;
    }
    
    setPools(prev => prev.filter(pool => pool.id !== poolId));
    toast.success('Pool deleted successfully');
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getPoolStatus = (pool: LotteryPool & { canTriggerPayout: boolean }) => {
    if (pool.winner) return { status: 'Completed', color: 'text-green-400', icon: CheckCircle };
    if (pool.canTriggerPayout) return { status: 'Awaiting Payout', color: 'text-yellow-400', icon: AlertTriangle };
    if (!pool.isActive) return { status: 'Paused', color: 'text-red-400', icon: Pause };
    return { status: 'Active', color: 'text-green-400', icon: Play };
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Pool Management</h2>
        <p className="text-gray-400">Manage all lottery pools and trigger payouts</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6">
        {pools.map((pool, index) => {
          const statusInfo = getPoolStatus(pool);
          const StatusIcon = statusInfo.icon;
          
          return (
            <motion.div
              key={pool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-xl font-bold text-white">{pool.name}</h3>
                    <div className={`flex items-center space-x-1 ${statusInfo.color}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span className="text-sm font-medium">{statusInfo.status}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-sm text-gray-400">
                    <span>ID: {pool.id}</span>
                    <span>${pool.ticketPrice} USDT per ticket</span>
                    <span>{pool.soldTickets}/{pool.maxTickets} tickets sold</span>
                    <span>${pool.prizePool} prize pool</span>
                  </div>
                </div>
              </div>

              {/* Winner Information */}
              {pool.winner && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30 rounded-lg p-4 mb-4"
                >
                  <div className="flex items-center space-x-3">
                    <Trophy className="w-5 h-5 text-emerald-400" />
                    <div>
                      <span className="text-emerald-400 font-semibold">Winner: </span>
                      <span className="text-white font-mono">{formatAddress(pool.winner)}</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Payout Trigger */}
              {pool.canTriggerPayout && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg p-4 mb-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                      <span className="text-yellow-400 font-semibold">Pool ended - Ready for payout</span>
                    </div>
                    <motion.button
                      onClick={() => handleTriggerPayout(pool.id)}
                      className="px-4 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 rounded-lg font-semibold text-white transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Trigger Payout
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                <motion.button
                  className="flex items-center space-x-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-gray-300 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </motion.button>

                {pool.isActive && !pool.winner ? (
                  <motion.button
                    onClick={() => handlePausePool(pool.id)}
                    className="flex items-center space-x-2 px-4 py-2 bg-orange-600/20 hover:bg-orange-600/30 border border-orange-500/30 rounded-lg text-orange-400 hover:text-orange-300 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Pause className="w-4 h-4" />
                    <span>Pause</span>
                  </motion.button>
                ) : !pool.winner && !pool.canTriggerPayout ? (
                  <motion.button
                    onClick={() => handleResumePool(pool.id)}
                    className="flex items-center space-x-2 px-4 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 rounded-lg text-emerald-400 hover:text-emerald-300 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Play className="w-4 h-4" />
                    <span>Resume</span>
                  </motion.button>
                ) : null}

                <motion.button
                  onClick={() => handleDeletePool(pool.id)}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 rounded-lg text-red-400 hover:text-red-300 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PoolManagement;