import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Pause, Play, Trash2, Trophy, Eye, AlertTriangle, CheckCircle, X, Users, Clock, DollarSign, Ticket } from 'lucide-react';
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
    endTime: new Date(Date.now() - 30 * 60 * 1000),
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
  const [selectedPool, setSelectedPool] = useState<(LotteryPool & { canTriggerPayout: boolean }) | null>(null);

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

  const handleViewDetails = (pool: LotteryPool & { canTriggerPayout: boolean }) => {
    setSelectedPool(pool);
  };

  const closeModal = () => {
    setSelectedPool(null);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getPoolStatus = (pool: LotteryPool & { canTriggerPayout: boolean }) => {
    if (pool.winner) return { status: 'Completed', color: 'text-[#2DE582]', icon: CheckCircle };
    if (pool.canTriggerPayout) return { status: 'Awaiting Payout', color: 'text-yellow-400', icon: AlertTriangle };
    if (!pool.isActive) return { status: 'Paused', color: 'text-red-400', icon: Pause };
    return { status: 'Active', color: 'text-[#2DE582]', icon: Play };
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Pool Management</h2>
        <p className="text-gray-400">Manage all lottery pools and trigger payouts</p>
      </div>

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
              className="bg-[#181830]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
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
                <div className="bg-[#2DE582]/10 border border-[#2DE582]/30 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-3">
                    <Trophy className="w-5 h-5 text-[#2DE582]" />
                    <div>
                      <span className="text-[#2DE582] font-semibold">Winner: </span>
                      <span className="text-white font-mono">{formatAddress(pool.winner)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Payout Trigger */}
              {pool.canTriggerPayout && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                      <span className="text-yellow-400 font-semibold">Pool ended - Ready for payout</span>
                    </div>
                    <button
                      onClick={() => handleTriggerPayout(pool.id)}
                      className="px-4 py-2 bg-[#2DE582] hover:bg-[#2DE582]/80 rounded-lg font-semibold text-black transition-all duration-300"
                    >
                      Trigger Payout
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-[#1C1C1C]/60 hover:bg-[#1C1C1C]/80 border border-white/10 rounded-lg text-gray-300 hover:text-white transition-all duration-300">
                  onClick={() => handleViewDetails(pool)}
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </button>

                {pool.isActive && !pool.winner ? (
                  <button
                    onClick={() => handlePausePool(pool.id)}
                    className="flex items-center space-x-2 px-4 py-2 bg-orange-600/20 hover:bg-orange-600/30 border border-orange-500/30 rounded-lg text-orange-400 hover:text-orange-300 transition-all duration-300"
                  >
                    <Pause className="w-4 h-4" />
                    <span>Pause</span>
                  </button>
                ) : !pool.winner && !pool.canTriggerPayout ? (
                  <button
                    onClick={() => handleResumePool(pool.id)}
                    className="flex items-center space-x-2 px-4 py-2 bg-[#2DE582]/20 hover:bg-[#2DE582]/30 border border-[#2DE582]/30 rounded-lg text-[#2DE582] hover:text-white transition-all duration-300"
                  >
                    <Play className="w-4 h-4" />
                    <span>Resume</span>
                  </button>
                ) : null}

                <button
                  onClick={() => handleDeletePool(pool.id)}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 rounded-lg text-red-400 hover:text-red-300 transition-all duration-300"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Pool Details Modal */}
      {selectedPool && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-[#181830] border border-white/10 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">{selectedPool.name}</h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Pool Status */}
            <div className="mb-6">
              <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full ${
                selectedPool.isActive 
                  ? 'bg-[#2DE582]/20 border border-[#2DE582]/30 text-[#2DE582]'
                  : 'bg-red-500/20 border border-red-500/30 text-red-400'
              }`}>
                <div className={`w-2 h-2 rounded-full ${selectedPool.isActive ? 'bg-[#2DE582]' : 'bg-red-400'}`} />
                <span className="font-semibold">{selectedPool.isActive ? 'Active' : 'Ended'}</span>
              </div>
            </div>

            {/* Pool Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-[#1C1C1C]/60 rounded-xl p-4 text-center">
                <DollarSign className="w-6 h-6 text-[#2DE582] mx-auto mb-2" />
                <div className="text-xl font-bold text-white">${selectedPool.ticketPrice}</div>
                <div className="text-sm text-gray-400">Ticket Price</div>
              </div>
              
              <div className="bg-[#1C1C1C]/60 rounded-xl p-4 text-center">
                <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{selectedPool.soldTickets}</div>
                <div className="text-sm text-gray-400">Tickets Sold</div>
              </div>
              
              <div className="bg-[#1C1C1C]/60 rounded-xl p-4 text-center">
                <Ticket className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{selectedPool.maxTickets}</div>
                <div className="text-sm text-gray-400">Max Tickets</div>
              </div>
              
              <div className="bg-[#1C1C1C]/60 rounded-xl p-4 text-center">
                <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">${selectedPool.prizePool}</div>
                <div className="text-sm text-gray-400">Prize Pool</div>
              </div>
            </div>

            {/* Detailed Information */}
            <div className="space-y-4 mb-6">
              <div className="bg-[#1C1C1C]/60 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-white mb-3">Pool Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Pool ID:</span>
                    <span className="text-white font-mono">{selectedPool.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Progress:</span>
                    <span className="text-white">{((selectedPool.soldTickets / selectedPool.maxTickets) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Remaining Tickets:</span>
                    <span className="text-white">{selectedPool.maxTickets - selectedPool.soldTickets}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Win Odds:</span>
                    <span className="text-white">1 in {selectedPool.maxTickets}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">End Time:</span>
                    <span className="text-white">{selectedPool.endTime.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Winner Information */}
              {selectedPool.winner && (
                <div className="bg-[#2DE582]/10 border border-[#2DE582]/30 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-[#2DE582] mb-3 flex items-center space-x-2">
                    <Trophy className="w-5 h-5" />
                    <span>Winner Information</span>
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Winner Address:</span>
                      <span className="text-white font-mono">{selectedPool.winner}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Prize Amount:</span>
                      <span className="text-[#2DE582] font-bold">${selectedPool.prizePool}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {selectedPool.isActive && (
                <button
                  onClick={() => {
                    handlePausePool(selectedPool.id);
                    closeModal();
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-orange-600/20 hover:bg-orange-600/30 border border-orange-500/30 rounded-lg text-orange-400 hover:text-orange-300 transition-all duration-300"
                >
                  <Pause className="w-4 h-4" />
                  <span>Pause Pool</span>
                </button>
              )}
              
              {selectedPool.canTriggerPayout && (
                <button
                  onClick={() => {
                    handleTriggerPayout(selectedPool.id);
                    closeModal();
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-[#2DE582] hover:bg-[#2DE582]/80 rounded-lg font-semibold text-black transition-all duration-300"
                >
                  <Trophy className="w-4 h-4" />
                  <span>Trigger Payout</span>
                </button>
              )}
              
              <button
                onClick={() => {
                  handleDeletePool(selectedPool.id);
                  closeModal();
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 rounded-lg text-red-400 hover:text-red-300 transition-all duration-300"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Pool</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PoolManagement;