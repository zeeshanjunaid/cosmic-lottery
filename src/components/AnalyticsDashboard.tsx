import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Users, Ticket, TrendingUp, Activity, Trophy } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, color }) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -2 }}
    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
    
    <div className="relative z-10 space-y-4">
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">{value}</div>
          <div className="text-sm text-green-400">{change}</div>
        </div>
      </div>
      
      <div>
        <h3 className="text-gray-300 font-medium">{title}</h3>
      </div>
    </div>
  </motion.div>
);

const AnalyticsDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,230',
      change: '+12.5%',
      icon: DollarSign,
      color: 'from-green-600 to-emerald-600',
    },
    {
      title: 'Active Pools',
      value: '8',
      change: '+2 new',
      icon: Activity,
      color: 'from-blue-600 to-cyan-600',
    },
    {
      title: 'Total Tickets Sold',
      value: '2,847',
      change: '+15.3%',
      icon: Ticket,
      color: 'from-purple-600 to-violet-600',
    },
    {
      title: 'Unique Participants',
      value: '1,249',
      change: '+8.7%',
      icon: Users,
      color: 'from-pink-600 to-rose-600',
    },
  ];

  const recentWinners = [
    { pool: 'Stellar Jackpot', winner: '0x742d35Cc...6B88', amount: 950, time: '2 hours ago' },
    { pool: 'Galactic Prize', winner: '0x8b5cf6Ed...2A91', amount: 1200, time: '1 day ago' },
    { pool: 'Nebula Millions', winner: '0x1a2b3c4d...5e6f', amount: 750, time: '3 days ago' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <TrendingUp className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-bold text-white">Revenue Trend</h3>
          </div>
          
          <div className="h-64 flex items-center justify-center">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <p className="text-gray-400">Revenue chart will be integrated with real analytics data</p>
            </div>
          </div>
        </motion.div>

        {/* Recent Winners */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <h3 className="text-xl font-bold text-white">Recent Winners</h3>
          </div>
          
          <div className="space-y-4">
            {recentWinners.map((winner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10"
              >
                <div className="space-y-1">
                  <div className="font-semibold text-white">{winner.pool}</div>
                  <div className="text-sm text-gray-400 font-mono">{winner.winner}</div>
                </div>
                <div className="text-right space-y-1">
                  <div className="font-bold text-green-400">${winner.amount}</div>
                  <div className="text-xs text-gray-500">{winner.time}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;