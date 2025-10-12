export interface Goal {
  id: string;
  name: string;
  target: number;
  saved: number;
  monthly: number;
  deadline: string;
  percentage: number;
  icon: string;
  color: string;
}

export interface GoalMarket {
  id: string;
  name: string;
  value: number;
  color: string;
}

export interface GoalHistory {
  id: string;
  date: string;
  wallet: string;
  description: string;
  amount: number;
  status: string;
}

export interface GoalsData {
  goals: Goal[];
  markets: GoalMarket[];
  history: GoalHistory[];
}
