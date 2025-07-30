import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Pause, Play, Trash2, Trophy, Eye, AlertTriangle, CheckCircle, X, Users, Clock, DollarSign, Ticket } from 'lucide-react';
import { LotteryPool } from '../types/lottery';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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
    const pool = pools.find(p => p.id === poolId);
    if (!pool) return;

    toast.loading('Deleting pool...', { id: 'delete-pool' });
    
    setTimeout(() => {
      setPools(prev => prev.filter(pool => pool.id !== poolId));
      toast.success(`Pool "${pool.name}" deleted successfully!`, { id: 'delete-pool' });
    }, 1500);
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
        {pools.map((pool) => {
          const statusInfo = getPoolStatus(pool);
          const StatusIcon = statusInfo.icon;
          
          return (
            <motion.div
              key={pool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <Card className="bg-[#181830]/60 backdrop-blur-xl border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-xl font-bold text-white">{pool.name}</h3>
                        <Badge 
                          variant="outline"
                          className={`${statusInfo.color} border-current`}
                        >
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusInfo.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-6 text-sm text-gray-400">
                        <span>ID: {pool.id}</span>
                        <span>${pool.ticketPrice} USDT per ticket</span>
                        <span>{pool.soldTickets}/{pool.maxTickets} tickets sold</span>
                        <span>${pool.prizePool} prize pool</span>
                      </div>
                    </div>
                    <StatusIcon className="w-4 h-4" />
                  </div>
                  
                  {/* Winner Information */}
                  {pool.winner && (
                    <Card className="bg-[#2DE582]/10 border-[#2DE582]/30 mb-4">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <Trophy className="w-5 h-5 text-[#2DE582]" />
                          <div>
                            <span className="text-[#2DE582] font-semibold">Winner: </span>
                            <span className="text-white font-mono">{formatAddress(pool.winner)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Payout Trigger */}
                  {pool.canTriggerPayout && (
                    <Card className="bg-yellow-500/10 border-yellow-500/30 mb-4">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <AlertTriangle className="w-5 h-5 text-yellow-400" />
                            <span className="text-yellow-400 font-semibold">Pool ended - Ready for payout</span>
                          </div>
                          <Button
                            onClick={() => handleTriggerPayout(pool.id)}
                            className="bg-[#2DE582] hover:bg-[#2DE582]/80 text-black font-semibold"
                          >
                            Trigger Payout
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => handleViewDetails(pool)}
                      className="border-white/10 text-gray-300 hover:text-white hover:bg-white/10"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>

                    {pool.isActive && !pool.winner ? (
                      <Button
                        variant="outline"
                        onClick={() => handlePausePool(pool.id)}
                        className="border-orange-500/30 text-orange-400 hover:text-orange-300 hover:bg-orange-600/20"
                      >
                        <Pause className="w-4 h-4 mr-2" />
                        Pause
                      </Button>
                    ) : !pool.winner && !pool.canTriggerPayout ? (
                      <Button
                        variant="outline"
                        onClick={() => handleResumePool(pool.id)}
                        className="border-[#2DE582]/30 text-[#2DE582] hover:text-white hover:bg-[#2DE582]/20"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Resume
                      </Button>
                    ) : null}

                    <Button
                      variant="outline"
                      onClick={() => handleDeletePool(pool.id)}
                      className="border-red-500/30 text-red-400 hover:text-red-300 hover:bg-red-600/20"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Pool Details Modal */}
      {selectedPool && (
        <Dialog open={!!selectedPool} onOpenChange={() => closeModal()}>
          <DialogContent className="text-white max-w-lg">
            <DialogHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-[#2DE582]/20 to-blue-500/20 rounded-lg border border-[#2DE582]/30 shadow-lg">
                  <Settings className="w-5 h-5 text-[#2DE582]" />
                </div>
                <div>
                  <DialogTitle className="text-xl">{selectedPool.name}</DialogTitle>
                  <p className="text-white/60 text-sm">Admin pool management</p>
                </div>
              </div>
            </DialogHeader>
            
            <div className="px-6 space-y-6">
              {/* Pool Status */}
              <div>
                <Badge 
                  variant={selectedPool.isActive ? "default" : "destructive"}
                  className={`${selectedPool.isActive 
                    ? 'bg-[#2DE582]/20 border-[#2DE582]/30 text-[#2DE582] px-4 py-2'
                    : 'bg-red-500/20 border-red-500/30 text-red-400 px-4 py-2'
                  } text-sm font-medium`}
                >
                  <div className={`w-2 h-2 rounded-full mr-2 ${selectedPool.isActive ? 'bg-[#2DE582]' : 'bg-red-400'}`} />
                  {selectedPool.isActive ? 'Active' : 'Ended'}
                </Badge>
              </div>

              {/* Pool Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors duration-200">
                  <CardContent className="p-4 text-center">
                    <div className="p-1.5 bg-[#2DE582]/20 rounded-lg w-fit mx-auto mb-2">
                      <DollarSign className="w-4 h-4 text-[#2DE582]" />
                    </div>
                    <div className="text-lg font-bold text-white">${selectedPool.ticketPrice}</div>
                    <div className="text-xs text-gray-400 mt-1">Ticket Price</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors duration-200">
                  <CardContent className="p-4 text-center">
                    <div className="p-1.5 bg-blue-500/20 rounded-lg w-fit mx-auto mb-2">
                      <Users className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="text-lg font-bold text-white">{selectedPool.soldTickets}</div>
                    <div className="text-xs text-gray-400 mt-1">Tickets Sold</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors duration-200">
                  <CardContent className="p-4 text-center">
                    <div className="p-1.5 bg-purple-500/20 rounded-lg w-fit mx-auto mb-2">
                      <Ticket className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="text-lg font-bold text-white">{selectedPool.maxTickets}</div>
                    <div className="text-xs text-gray-400 mt-1">Max Tickets</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors duration-200">
                  <CardContent className="p-4 text-center">
                    <div className="p-1.5 bg-yellow-500/20 rounded-lg w-fit mx-auto mb-2">
                      <Trophy className="w-4 h-4 text-yellow-400" />
                    </div>
                    <div className="text-lg font-bold text-white">${selectedPool.prizePool}</div>
                    <div className="text-xs text-gray-400 mt-1">Prize Pool</div>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Information */}
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <h3 className="text-base font-semibold text-white flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#2DE582] rounded-full"></div>
                    <span>Pool Information</span>
                  </h3>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-gray-400">Pool ID:</span>
                    <span className="text-white font-mono bg-white/10 px-2 py-0.5 rounded text-xs">{selectedPool.id}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-gray-400">Progress:</span>
                    <span className="text-white font-semibold">{((selectedPool.soldTickets / selectedPool.maxTickets) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-gray-400">Remaining:</span>
                    <span className="text-white font-semibold">{selectedPool.maxTickets - selectedPool.soldTickets}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-gray-400">Win Odds:</span>
                    <span className="text-white font-semibold">1 in {selectedPool.maxTickets}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-400">Ends:</span>
                    <span className="text-white font-semibold text-xs">{selectedPool.endTime.toLocaleDateString()} {selectedPool.endTime.toLocaleTimeString()}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Winner Information */}
              {selectedPool.winner && (
                <Card className="bg-gradient-to-r from-[#2DE582]/10 to-green-500/10 border-[#2DE582]/30">
                  <CardHeader>
                    <h3 className="text-[#2DE582] font-semibold flex items-center space-x-2 text-base">
                      <div className="p-1.5 bg-[#2DE582]/20 rounded-lg">
                        <Trophy className="w-4 h-4 text-[#2DE582]" />
                      </div>
                      <span>Winner Information</span>
                    </h3>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Winner:</span>
                      <span className="text-white font-mono bg-[#2DE582]/20 px-2 py-1 rounded text-xs">{formatAddress(selectedPool.winner)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Prize:</span>
                      <span className="text-[#2DE582] font-bold text-base">${selectedPool.prizePool}</span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 pb-2">
                {selectedPool.isActive && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      handlePausePool(selectedPool.id);
                      closeModal();
                    }}
                    className="border-orange-500/30 text-orange-400 hover:text-orange-300 hover:bg-orange-600/20 px-4 py-2"
                  >
                    <Pause className="w-4 h-4 mr-2" />
                    Pause Pool
                  </Button>
                )}
                
                {selectedPool.canTriggerPayout && (
                  <Button
                    onClick={() => {
                      handleTriggerPayout(selectedPool.id);
                      closeModal();
                    }}
                    className="bg-gradient-to-r from-[#2DE582] to-green-400 hover:from-[#2DE582]/80 hover:to-green-400/80 text-black font-semibold px-4 py-2"
                  >
                    <Trophy className="w-4 h-4 mr-2" />
                    Trigger Payout
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  onClick={() => {
                    handleDeletePool(selectedPool.id);
                    closeModal();
                  }}
                  className="border-red-500/30 text-red-400 hover:text-red-300 hover:bg-red-600/20 px-4 py-2"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Pool
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PoolManagement;