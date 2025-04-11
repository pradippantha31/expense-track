
export type ExpenseCategory = 
  | 'gas'
  | 'rent'
  | 'food'
  | 'utility'
  | 'entertainment'
  | 'shopping'
  | 'travel'
  | 'healthcare'
  | 'education'
  | 'other';

export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: ExpenseCategory;
  date: Date;
  userId: string;
}

export interface Income {
  id: string;
  amount: number;
  source: string;
  description: string;
  date: Date;
  userId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Group {
  id: string;
  name: string;
  members: User[];
}

export interface ExpenseSummary {
  totalExpenses: number;
  totalIncome: number;
  balance: number;
  byCategory: Record<ExpenseCategory, number>;
}
