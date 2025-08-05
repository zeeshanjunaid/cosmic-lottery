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
  featured?: boolean;
  paused?: boolean;
  canTriggerPayout?: boolean;
  userTickets?: number;
  isPurchasing?: boolean;
  isClaiming?: boolean;
  rewardClaimed?: boolean;
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