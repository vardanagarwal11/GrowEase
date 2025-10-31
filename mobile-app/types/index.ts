export interface Challenge {
  id: string;
  title: string;
  type: 'no-smoking' | 'no-alcohol' | 'exercise' | 'sleep';
  stake: number;
  duration: number; // days
  startDate: string;
  endDate: string;
  progress: number; // percentage
  status: 'active' | 'completed' | 'failed';
  description: string;
}

export interface HealthMetric {
  id: string;
  type: 'steps' | 'heart_rate' | 'sleep' | 'calories';
  value: number;
  unit: string;
  date: string;
  target?: number;
}

export interface Transaction {
  id: string;
  type: 'stake_deposit' | 'stake_return' | 'forfeit' | 'bonus';
  amount: number;
  challengeId?: string;
  challengeTitle?: string;
  date: string;
  status: 'completed' | 'pending';
}

export interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  totalStaked: number;
  totalEarned: number;
  activeChallenges: number;
  completedChallenges: number;
}