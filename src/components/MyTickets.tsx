import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Ticket, Trophy, Clock, DollarSign, Star, Eye, Calendar, Target, CheckCircle, X } from 'lucide-react';
import { useAccount } from 'wagmi';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface UserParticipation {
  poolId: string;
  poolName: string;
  ticketPrice: number;
  ticketsPurchased: number;
  totalSpent: number;
  poolStatus: 'active' | 'ended' | 'won' | 'lost';
  maxTickets: number;
  soldTickets: number;
  prizePool: number;
  endTime: Date;
  purchaseDate: Date;
  winner?: string;
  winChance: number;
  transactionHash: string;
}

const mockUserParticipations: UserParticipation[] = [
  {
    poolId: '1',
    poolName: 'Stellar Jackpot',
    ticketPrice: 10,
    ticketsPurchased: 3,
    totalSpent: 30,
    poolStatus: 'active',
    maxTickets: 100,
    soldTickets: 67,
    prizePool: 800,
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    purchaseDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    winChance: 3,
    transactionHash: '0x7a8b9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b',
  },
  {
    poolId: '2',
    poolName: 'Galactic Prize',
    ticketPrice: 25,
    ticketsPurchased: 2,
    totalSpent: 50,
    poolStatus: 'active',
    maxTickets: 50,
    soldTickets: 38,
    prizePool: 1200,
    endTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
    purchaseDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
    winChance: 4,
    transactionHash: '0x8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d',
  },
  {
    poolId: '4',
    poolName: 'Cosmic Fortune',
    ticketPrice: 50,
    ticketsPurchased: 1,
    totalSpent: 50,
    poolStatus: 'won',
    maxTickets: 20,
    soldTickets: 20,
    prizePool: 950,
    endTime: new Date(Date.now() - 1 * 60 * 60 * 1000),
    purchaseDate: new Date(Date.now() - 3 * 60 * 60 * 1000),
    winner: '0x742d35Cc6634C0532925a3b8D1C7d8B3b19d6B88', // This would be user's address
    winChance: 5,
    transactionHash: '0x9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e',
  },
  {
    poolId: '5',
    poolName: 'Nebula Millions',
    ticketPrice: 5,
    ticketsPurchased: 4,
    totalSpent: 20,
    poolStatus: 'lost',
    maxTickets: 200,
    soldTickets: 200,
    prizePool: 900,
    endTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    purchaseDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    winner: '0x8b5cf6Ed9b2c4a3f5e7d8c1a2b3c4d5e6f7a8b9c',
    winChance: 2,
    transactionHash: '0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2',
  },
];

const MyTickets: React.FC = () => {
  const { address, isConnected } = useAccount();
  const [selectedParticipation, setSelectedParticipation] = useState<UserParticipation | null>(null);

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusInfo = (participation: UserParticipation) => {
    switch (participation.poolStatus) {
      case 'won':
        return { color: 'text-[#2DE582]', bg: 'bg-[#2DE582]/20', border: 'border-[#2DE582]/30', icon: Trophy, label: 'WON!' };
      case 'lost':
        return { color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/30', icon: X, label: 'LOST' };
      case 'active':
        return { color: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500/30', icon: Clock, label: 'ACTIVE' };
      case 'ended':
        return { color: 'text-gray-400', bg: 'bg-gray-500/20', border: 'border-gray-500/30', icon: CheckCircle, label: 'ENDED' };
      default:
        return { color: 'text-gray-400', bg: 'bg-gray-500/20', border: 'border-gray-500/30', icon: Clock, label: 'UNKNOWN' };
    }
  };

  // Calculate statistics
  const totalParticipations = mockUserParticipations.length;
  const totalSpent = mockUserParticipations.reduce((sum, p) => sum + p.totalSpent, 0);
  const totalTickets = mockUserParticipations.reduce((sum, p) => sum + p.ticketsPurchased, 0);
  const wonPools = mockUserParticipations.filter(p => p.poolStatus === 'won');
  const totalWinnings = wonPools.reduce((sum, p) => sum + p.prizePool, 0);
  const activePools = mockUserParticipations.filter(p => p.poolStatus === 'active');

  if (!isConnected) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6 py-12"
      >
        <div className="p-8 bg-[#181830]/60 backdrop-blur-xl border border-white/10 rounded-2xl max-w-md mx-auto">
          <div className="p-4 bg-[#2DE582]/20 rounded-xl w-fit mx-auto mb-6">
            <Ticket className="w-8 h-8 text-[#2DE582]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h2>
          <p className="text-gray-400 mb-6">
            Connect your wallet to view your lottery participation history and manage your tickets.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center space-y-4 px-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-[#2DE582] to-green-400 rounded-xl shadow-lg">
            <Ticket className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-white">
            My <span className="text-[#2DE582]">Tickets</span>
          </h1>
        </div>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto px-4">
          Track your lottery participation, view your tickets, and manage your cosmic fortune journey.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="bg-[#181830]/60 backdrop-blur-xl border-white/10 text-center">
          <CardContent className="p-4 sm:p-6">
            <div className="p-3 bg-[#2DE582]/20 rounded-xl w-fit mx-auto mb-4">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-[#2DE582]" />
            </div>
            <div className="text-lg sm:text-2xl font-bold text-white mb-1">{totalParticipations}</div>
            <div className="text-sm sm:text-base text-gray-400">Pools Joined</div>
          </CardContent>
        </Card>

        <Card className="bg-[#181830]/60 backdrop-blur-xl border-white/10 text-center">
          <CardContent className="p-4 sm:p-6">
            <div className="p-3 bg-blue-500/20 rounded-xl w-fit mx-auto mb-4">
              <Ticket className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
            </div>
            <div className="text-lg sm:text-2xl font-bold text-white mb-1">{totalTickets}</div>
            <div className="text-sm sm:text-base text-gray-400">Total Tickets</div>
          </CardContent>
        </Card>

        <Card className="bg-[#181830]/60 backdrop-blur-xl border-white/10 text-center">
          <CardContent className="p-4 sm:p-6">
            <div className="p-3 bg-yellow-500/20 rounded-xl w-fit mx-auto mb-4">
              <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
            </div>
            <div className="text-lg sm:text-2xl font-bold text-white mb-1">${totalSpent}</div>
            <div className="text-sm sm:text-base text-gray-400">Total Spent</div>
          </CardContent>
        </Card>

        <Card className="bg-[#181830]/60 backdrop-blur-xl border-white/10 text-center">
          <CardContent className="p-4 sm:p-6">
            <div className="p-3 bg-green-500/20 rounded-xl w-fit mx-auto mb-4">
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
            </div>
            <div className="text-lg sm:text-2xl font-bold text-white mb-1">${totalWinnings}</div>
            <div className="text-sm sm:text-base text-gray-400">Total Winnings</div>
          </CardContent>
        </Card>
      </div>

      {/* Active Pools Summary */}
      {activePools.length > 0 && (
        <Card className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 border border-blue-500/20">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Clock className="w-5 h-5 text-blue-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Active Participations</h2>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-400">{activePools.length}</div>
                <div className="text-sm text-gray-400">Active Pools</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">
                  {activePools.reduce((sum, p) => sum + p.ticketsPurchased, 0)}
                </div>
                <div className="text-sm text-gray-400">Active Tickets</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">
                  ${activePools.reduce((sum, p) => sum + p.prizePool, 0)}
                </div>
                <div className="text-sm text-gray-400">Potential Winnings</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Participation History */}
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white">Participation History</h2>
        
        <div className="space-y-4">
          {mockUserParticipations.map((participation, index) => {
            const statusInfo = getStatusInfo(participation);
            const StatusIcon = statusInfo.icon;
            
            return (
              <motion.div
                key={participation.poolId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-[#181830]/60 backdrop-blur-xl border-white/10 hover:border-[#2DE582]/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                      {/* Left Section */}
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg sm:text-xl font-bold text-white">{participation.poolName}</h3>
                          <Badge className={`${statusInfo.bg} ${statusInfo.border} ${statusInfo.color} border`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusInfo.label}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                          <div className="flex items-center space-x-2">
                            <Ticket className="w-4 h-4 text-[#2DE582]" />
                            <span className="text-gray-400">Tickets:</span>
                            <span className="text-white font-semibold">{participation.ticketsPurchased}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <DollarSign className="w-4 h-4 text-yellow-400" />
                            <span className="text-gray-400">Spent:</span>
                            <span className="text-white font-semibold">${participation.totalSpent}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Target className="w-4 h-4 text-purple-400" />
                            <span className="text-gray-400">Win Chance:</span>
                            <span className="text-white font-semibold">{participation.winChance}%</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Trophy className="w-4 h-4 text-blue-400" />
                            <span className="text-gray-400">Prize:</span>
                            <span className="text-white font-semibold">${participation.prizePool}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Section */}
                      <div className="text-left lg:text-right space-y-2">
                        <div className="text-sm text-gray-400">
                          Purchased: {formatDate(participation.purchaseDate)}
                        </div>
                        {participation.poolStatus === 'won' && (
                          <div className="text-lg font-bold text-[#2DE582]">
                            🎉 You Won ${participation.prizePool}!
                          </div>
                        )}
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full lg:w-auto border-white/10 text-gray-300 hover:text-white hover:bg-white/10"
                              onClick={() => setSelectedParticipation(participation)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-[#181830] border-white/10 text-white max-w-lg">
                            <DialogHeader>
                              <div className="flex items-center space-x-3">
                                <div className="p-2 bg-[#2DE582]/20 rounded-lg">
                                  <Ticket className="w-5 h-5 text-[#2DE582]" />
                                </div>
                                <div>
                                  <DialogTitle className="text-xl">{participation.poolName}</DialogTitle>
                                  <p className="text-white/60 text-sm">Participation Details</p>
                                </div>
                              </div>
                            </DialogHeader>
                            
                            <div className="px-6 space-y-6 pb-6">
                              {/* Status */}
                              <div className="pt-2">
                                <Badge className={`${statusInfo.bg} ${statusInfo.border} ${statusInfo.color} border px-4 py-2 text-sm font-medium`}>
                                  <StatusIcon className="w-3 h-3 mr-2" />
                                  {statusInfo.label}
                                </Badge>
                              </div>

                              {/* Participation Stats */}
                              <div className="grid grid-cols-2 gap-4">
                                <Card className="bg-white/5 border-white/10">
                                  <CardContent className="p-4 text-center">
                                    <div className="text-lg font-bold text-white">{participation.ticketsPurchased}</div>
                                    <div className="text-xs text-gray-400">Tickets Bought</div>
                                  </CardContent>
                                </Card>
                                <Card className="bg-white/5 border-white/10">
                                  <CardContent className="p-4 text-center">
                                    <div className="text-lg font-bold text-white">${participation.totalSpent}</div>
                                    <div className="text-xs text-gray-400">Total Spent</div>
                                  </CardContent>
                                </Card>
                                <Card className="bg-white/5 border-white/10">
                                  <CardContent className="p-4 text-center">
                                    <div className="text-lg font-bold text-white">{participation.winChance}%</div>
                                    <div className="text-xs text-gray-400">Win Chance</div>
                                  </CardContent>
                                </Card>
                                <Card className="bg-white/5 border-white/10">
                                  <CardContent className="p-4 text-center">
                                    <div className="text-lg font-bold text-white">${participation.prizePool}</div>
                                    <div className="text-xs text-gray-400">Prize Pool</div>
                                  </CardContent>
                                </Card>
                              </div>

                              {/* Pool Information */}
                              <Card className="bg-white/5 border-white/10">
                                <CardHeader>
                                  <h3 className="text-base font-semibold text-white">Pool Information</h3>
                                </CardHeader>
                                <CardContent className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Pool ID:</span>
                                    <span className="text-white font-mono">{participation.poolId}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Ticket Price:</span>
                                    <span className="text-white">${participation.ticketPrice}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Total Tickets:</span>
                                    <span className="text-white">{participation.soldTickets}/{participation.maxTickets}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Purchase Date:</span>
                                    <span className="text-white text-xs">{formatDate(participation.purchaseDate)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">End Date:</span>
                                    <span className="text-white text-xs">{formatDate(participation.endTime)}</span>
                                  </div>
                                </CardContent>
                              </Card>

                              {/* Transaction */}
                              <Card className="bg-white/5 border-white/10">
                                <CardHeader>
                                  <h3 className="text-base font-semibold text-white">Transaction</h3>
                                </CardHeader>
                                <CardContent>
                                  <div className="text-xs">
                                    <span className="text-gray-400">TX Hash:</span>
                                    <div className="text-white font-mono bg-white/10 px-2 py-1 rounded mt-1 break-all">
                                      {participation.transactionHash}
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>

                              {/* Winner Information */}
                              {participation.winner && (
                                <Card className={`${participation.poolStatus === 'won' ? 'bg-[#2DE582]/10 border-[#2DE582]/30' : 'bg-red-500/10 border-red-500/30'}`}>
                                  <CardHeader>
                                    <h3 className={`font-semibold flex items-center space-x-2 ${participation.poolStatus === 'won' ? 'text-[#2DE582]' : 'text-red-400'}`}>
                                      <Trophy className="w-4 h-4" />
                                      <span>{participation.poolStatus === 'won' ? 'Congratulations! You Won!' : 'Pool Winner'}</span>
                                    </h3>
                                  </CardHeader>
                                  <CardContent className="text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-white/70">Winner:</span>
                                      <span className="text-white font-mono">{formatAddress(participation.winner)}</span>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                      <span className="text-white/70">Prize:</span>
                                      <span className={`font-bold ${participation.poolStatus === 'won' ? 'text-[#2DE582]' : 'text-red-400'}`}>
                                        ${participation.prizePool}
                                      </span>
                                    </div>
                                  </CardContent>
                                </Card>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default MyTickets;