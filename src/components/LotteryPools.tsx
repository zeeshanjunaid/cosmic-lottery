import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccount } from 'wagmi';
import { Clock, Trophy, Star, Zap, Grid3X3, List, Eye, Ticket, DollarSign, Users, Target, Timer, Play, ChevronRight } from 'lucide-react';
import PoolCard from './PoolCard';
import { LotteryPool } from '../types/lottery';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import CountdownTimer from './CountdownTimer';

const LotteryPools: React.FC = () => {
  const { address, isConnected } = useAccount();

  const handleJoinPool = (pool: LotteryPool) => {
    console.log('Joining pool:', pool);
    // Pool joining logic would go here
  };

  const handleViewWinner = (pool: LotteryPool) => {
    console.log('Viewing winner for pool:', pool);
    // Winner viewing logic would go here
  };

  const mockPools: LotteryPool[] = [
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
    },
    {
      id: '3',
      name: 'Nebula Millions',
      ticketPrice: 5,
      maxTickets: 200,
      soldTickets: 145,
      endTime: new Date(Date.now() + 1 * 60 * 60 * 1000),
      isActive: true,
      winner: null,
      prizePool: 900,
    },
    {
      id: '4',
      name: 'Aurora Dreams',
      ticketPrice: 8,
      maxTickets: 150,
      soldTickets: 89,
      endTime: new Date(Date.now() + 6 * 60 * 60 * 1000),
      isActive: true,
      winner: null,
      prizePool: 1140,
    },
    {
      id: '5',
      name: 'Cosmic Fortune',
      ticketPrice: 50,
      maxTickets: 20,
      soldTickets: 20,
      endTime: new Date(Date.now() - 1 * 60 * 60 * 1000),
      isActive: false,
      winner: isConnected && address ? address : '0x742d35Cc6634C0532925a3b8D1C7d8B3b19d6B88',
      prizePool: 950,
    },
    {
      id: '6',
      name: 'Starlight Express',
      ticketPrice: 35,
      maxTickets: 40,
      soldTickets: 28,
      endTime: new Date(Date.now() + 3 * 60 * 60 * 1000),
      isActive: true,
      winner: null,
      prizePool: 1330,
    },
  ];

  // Categorize pools
  const activePools = mockPools.filter(pool => pool.isActive);
  const endedPools = mockPools.filter(pool => !pool.isActive);
  const featuredPool = activePools.find(pool => pool.prizePool >= 1200);
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

  const heroStats = [
    { icon: DollarSign, value: '$45k+', label: 'Total Prizes', color: 'text-[#2DE582]' },
    { icon: Users, value: '1,249', label: 'Players', color: 'text-blue-400' },
    { icon: Trophy, value: '127', label: 'Winners', color: 'text-yellow-400' },
    { icon: Target, value: activePools.length.toString(), label: 'Live Pools', color: 'text-purple-400' },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-12"
    >
      {/* Enhanced Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        {/* Hero Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2DE582]/5 via-blue-500/5 to-purple-500/5 rounded-3xl blur-3xl" />
        
        <div className="relative text-center space-y-6 py-12 px-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="p-4 bg-gradient-to-r from-[#2DE582] to-green-400 rounded-2xl shadow-lg">
                <Star className="w-8 h-8 text-black fill-current" />
              </div>
              <h1 className="text-4xl sm:text-6xl font-black text-white">
                Cosmic <span className="text-[#2DE582]">Lottery</span>
              </h1>
            </div>
            
            <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
              🚀 Welcome to the future of decentralized gaming! Experience fair, transparent, and secure lottery pools powered by blockchain technology.
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <Badge className="bg-[#2DE582]/20 border-[#2DE582]/30 text-[#2DE582] px-4 py-2 text-sm">
                ✨ Provably Fair
              </Badge>
              <Badge className="bg-blue-500/20 border-blue-500/30 text-blue-400 px-4 py-2 text-sm">
                ⚡ Instant Payouts
              </Badge>
              <Badge className="bg-purple-500/20 border-purple-500/30 text-purple-400 px-4 py-2 text-sm">
                🛡️ Secure & Transparent
              </Badge>
            </div>
          </motion.div>
          
          {/* Enhanced Stats */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12"
          >
            {heroStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group"
              >
                <Card className="bg-gradient-to-br from-[#181830]/80 via-[#1C1C1C]/80 to-[#181830]/80 backdrop-blur-xl border-white/10 hover:border-[#2DE582]/30 transition-all duration-500 overflow-hidden">
                  <CardContent className="p-6 text-center relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2DE582]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative">
                      <div className="p-3 bg-white/5 rounded-xl w-fit mx-auto mb-3 group-hover:bg-[#2DE582]/20 transition-colors duration-300">
                        <stat.icon className={`w-6 h-6 ${stat.color} group-hover:text-[#2DE582] transition-colors duration-300`} />
                      </div>
                      <div className={`text-2xl font-black ${stat.color} mb-1`}>{stat.value}</div>
                      <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{stat.label}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>


      {/* Pool Sections - Auto-switching views */}
      <div className="space-y-12">
        {/* Featured Pool - Always Detailed View (single pool) */}
        {featuredPool && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 border border-yellow-500/20 rounded-2xl p-8">
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
              </div>
            </div>
            <PoolCard pool={featuredPool} onJoin={handleJoinPool} onViewWinner={handleViewWinner} />
          </motion.div>
        )}

        {/* Quick Draw - Card View (multiple pools) */}
        {quickDrawPools.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-r from-[#2DE582]/10 via-green-500/10 to-emerald-500/10 border border-[#2DE582]/20 rounded-2xl p-8">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-[#2DE582] to-green-400 rounded-xl shadow-lg">
                  <Zap className="w-7 h-7 text-black" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">⚡ Quick Draw</h2>
                  <p className="text-green-200/80 text-sm">Jump in fast! Low cost, instant fun, quick results ({quickDrawPools.length} pools)</p>
                </div>
              </div>
            </div>
            
            {quickDrawPools.length === 1 ? (
              <PoolCard pool={quickDrawPools[0]} onJoin={handleJoinPool} onViewWinner={handleViewWinner} />
            ) : (
              <div className="space-y-6">
                {quickDrawPools.map((pool, index) => (
                  <PoolCard key={pool.id} pool={pool} onJoin={handleJoinPool} onViewWinner={handleViewWinner} />
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* High Stakes - Card View (multiple pools) */}
        {highStakesPools.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-indigo-600/10 border border-purple-500/20 rounded-2xl p-8">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl shadow-lg">
                  <Trophy className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">🏆 High Stakes</h2>
                  <p className="text-purple-200/80 text-sm">VIP experience with premium pools and mega prizes ({highStakesPools.length} pools)</p>
                </div>
              </div>
            </div>
            
            {highStakesPools.length === 1 ? (
              <PoolCard pool={highStakesPools[0]} onJoin={handleJoinPool} onViewWinner={handleViewWinner} />
            ) : (
              <div className="space-y-6">
                {highStakesPools.map((pool, index) => (
                  <PoolCard key={pool.id} pool={pool} onJoin={handleJoinPool} onViewWinner={handleViewWinner} />
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Recent Winners - Card View (multiple pools) */}
        {endedPools.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-r from-orange-500/10 via-pink-500/10 to-rose-500/10 border border-orange-500/20 rounded-2xl p-8">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl shadow-lg">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">🎉 Recent Winners</h2>
                  <p className="text-orange-200/80 text-sm">Celebrate with our lucky winners! You could be next ({endedPools.length} pools)</p>
                </div>
              </div>
            </div>
            
            {endedPools.length === 1 ? (
              <PoolCard pool={endedPools[0]} onJoin={handleJoinPool} onViewWinner={handleViewWinner} />
            ) : (
              <div className="space-y-6">
                {endedPools.map((pool, index) => (
                  <PoolCard key={pool.id} pool={pool} onJoin={handleJoinPool} onViewWinner={handleViewWinner} />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>

    </motion.div>
  );
};

export default LotteryPools;