import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar, DollarSign, User, Crown, Star } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Winner {
  id: string;
  poolName: string;
  winner: string;
  prizeAmount: number;
  date: Date;
  ticketsSold: number;
  isRecent: boolean;
}

const mockWinners: Winner[] = [
  {
    id: '1',
    poolName: 'Cosmic Fortune',
    winner: '0x742d35Cc6634C0532925a3b8D1C7d8B3b19d6B88',
    prizeAmount: 950,
    date: new Date(Date.now() - 1 * 60 * 60 * 1000),
    ticketsSold: 20,
    isRecent: true,
  },
  {
    id: '2',
    poolName: 'Galactic Millions',
    winner: '0x8b5cf6Ed9b2c4a3f5e7d8c1a2b3c4d5e6f7a8b9c',
    prizeAmount: 1200,
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    ticketsSold: 50,
    isRecent: true,
  },
  {
    id: '3',
    poolName: 'Stellar Jackpot',
    winner: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
    prizeAmount: 750,
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    ticketsSold: 75,
    isRecent: false,
  },
  {
    id: '4',
    poolName: 'Nebula Prize',
    winner: '0x9f8e7d6c5b4a39281726354a5b6c7d8e9f0a1b2c',
    prizeAmount: 500,
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    ticketsSold: 100,
    isRecent: false,
  },
  {
    id: '5',
    poolName: 'Aurora Lottery',
    winner: '0x2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d',
    prizeAmount: 2000,
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    ticketsSold: 40,
    isRecent: false,
  },
];

const WinnersPage: React.FC = () => {
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const totalPrizes = mockWinners.reduce((sum, winner) => sum + winner.prizeAmount, 0);
  const recentWinners = mockWinners.filter(w => w.isRecent);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-[#2DE582] rounded-xl">
            <Trophy className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-4xl font-bold text-white">
            Recent <span className="text-[#2DE582]">Winners</span>
          </h1>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Congratulations to all our lucky winners! See who's been winning big in our cosmic lottery pools.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#181830]/60 backdrop-blur-xl border-white/10 text-center">
          <CardContent className="p-6">
            <div className="p-3 bg-[#2DE582]/20 rounded-xl w-fit mx-auto mb-4">
              <DollarSign className="w-6 h-6 text-[#2DE582]" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">${totalPrizes.toLocaleString()}</div>
            <div className="text-gray-400">Total Prizes Won</div>
          </CardContent>
        </Card>

        <Card className="bg-[#181830]/60 backdrop-blur-xl border-white/10 text-center">
          <CardContent className="p-6">
            <div className="p-3 bg-[#2DE582]/20 rounded-xl w-fit mx-auto mb-4">
              <Crown className="w-6 h-6 text-[#2DE582]" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{mockWinners.length}</div>
            <div className="text-gray-400">Total Winners</div>
          </CardContent>
        </Card>

        <Card className="bg-[#181830]/60 backdrop-blur-xl border-white/10 text-center">
          <CardContent className="p-6">
            <div className="p-3 bg-[#2DE582]/20 rounded-xl w-fit mx-auto mb-4">
              <Star className="w-6 h-6 text-[#2DE582]" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{recentWinners.length}</div>
            <div className="text-gray-400">Recent Winners</div>
          </CardContent>
        </Card>
      </div>

      {/* Winners List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Winner History</h2>
        
        <div className="space-y-4">
          {mockWinners.map((winner, index) => (
            <motion.div
              key={winner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-[#181830]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {winner.isRecent && (
                    <Badge className="bg-[#2DE582]/20 border-[#2DE582]/30 text-[#2DE582] hover:bg-[#2DE582]/30">
                      <motion.div
                        className="w-2 h-2 bg-[#2DE582] rounded-full mr-2"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      NEW
                    </Badge>
                  )}
                  
                  <div>
                    <h3 className="text-xl font-bold text-white">{winner.poolName}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span className="font-mono">{formatAddress(winner.winner)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(winner.date)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right space-y-2">
                  <div className="text-2xl font-bold text-[#2DE582]">${winner.prizeAmount}</div>
                  <div className="text-sm text-gray-400">
                    {winner.ticketsSold} tickets sold
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default WinnersPage;