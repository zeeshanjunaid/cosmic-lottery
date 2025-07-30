import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Users, Ticket, Activity, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon }) => (
  <Card className="bg-[#181830]/60 backdrop-blur-xl border-white/10">
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-[#2DE582]/20 rounded-xl">
          <Icon className="w-6 h-6 text-[#2DE582]" />
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">{value}</div>
          <div className="text-sm text-[#2DE582]">{change}</div>
        </div>
      </div>
      <h3 className="text-gray-300 font-medium">{title}</h3>
    </CardContent>
  </Card>
);

const AnalyticsDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,230',
      change: '+12.5%',
      icon: DollarSign,
    },
    {
      title: 'Active Pools',
      value: '8',
      change: '+2 new',
      icon: Activity,
    },
    {
      title: 'Total Tickets Sold',
      value: '2,847',
      change: '+15.3%',
      icon: Ticket,
    },
    {
      title: 'Unique Participants',
      value: '1,249',
      change: '+8.7%',
      icon: Users,
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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
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
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart Placeholder */}
        <Card className="bg-[#181830]/60 backdrop-blur-xl border-white/10">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#2DE582]/20 rounded-lg">
                <Activity className="w-5 h-5 text-[#2DE582]" />
              </div>
              <h3 className="text-xl font-bold text-white">Revenue Trend</h3>
            </div>
          </CardHeader>
          <CardContent>
          
            <div className="h-64 flex items-center justify-center">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-[#2DE582]/20 rounded-full mx-auto flex items-center justify-center">
                  <Activity className="w-8 h-8 text-[#2DE582]" />
                </div>
                <p className="text-gray-400">Revenue chart will be integrated with real analytics data</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Winners */}
        <Card className="bg-[#181830]/60 backdrop-blur-xl border-white/10">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#2DE582]/20 rounded-lg">
                <Trophy className="w-5 h-5 text-[#2DE582]" />
              </div>
              <h3 className="text-xl font-bold text-white">Recent Winners</h3>
            </div>
          </CardHeader>
          <CardContent>
          
            <div className="space-y-4">
              {recentWinners.map((winner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-[#1C1C1C]/60 rounded-xl border border-white/5"
                >
                  <div className="space-y-1">
                    <div className="font-semibold text-white">{winner.pool}</div>
                    <div className="text-sm text-gray-400 font-mono">{winner.winner}</div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="font-bold text-[#2DE582]">${winner.amount}</div>
                    <div className="text-xs text-gray-500">{winner.time}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;