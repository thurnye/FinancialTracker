// Main Goal interface matching backend
export interface Goal {
  id: string;
  userId?: string;
  categoryId?: string | null;
  goalName: string;
  goalDescription?: string | null;
  priority?: string | null;
  progress?: number | null;
  deadline?: string | null;
  startDate?: string | null;
  targetMetric?: string | null;
  targetValue?: number | null;
  targetDate?: string | null;
  successCriteria?: string | null;
  actions?: string[] | null;
  resourcesNeeded?: string[] | null;
  obstacles?: string | null;
  milestones?: string[] | null;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Helper type for Goal display with computed properties
export interface GoalDisplay extends Goal {
  name: string;  // alias for goalName
  target: number;  // alias for targetValue
  saved: number;  // computed from progress
  monthly: number;  // computed or additional field
  percentage: number;  // alias for progress
  icon: string;  // visual property
  color: string;  // visual property
}

// Helper function to convert Goal to GoalDisplay
export function toGoalDisplay(goal: Goal, additionalProps?: Partial<GoalDisplay>): GoalDisplay {
  const targetValue = goal.targetValue || 0;
  const progress = goal.progress || 0;
  const saved = (targetValue * progress) / 100;

  return {
    ...goal,
    name: goal.goalName,
    target: targetValue,
    saved: saved,
    monthly: additionalProps?.monthly || 0,
    percentage: progress,
    icon: additionalProps?.icon || 'Target',
    color: additionalProps?.color || '#4f46e5',
  };
}

// Legacy interfaces for visualization components
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
