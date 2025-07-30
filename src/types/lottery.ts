export interface LotteryPool {
  id: string;
  name: string;
  ticketPrice: number;
  maxTickets: number;
  soldTickets: number;
  endTime: Date;
  isActive: boolean;
  winner: string | null;
  prizePool: number;
}

export interface User {
  address: string;
  balance: number;
  ticketsPurchased: string[];
}

export interface Transaction {
  id: string;
  type: 'purchase' | 'win';
  amount: number;
  timestamp: Date;
  poolId: string;
}