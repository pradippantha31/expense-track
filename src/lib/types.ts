
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
  role?: 'admin' | 'member';
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  createdAt?: Date;
  members: User[];
}

export interface ExpenseSummary {
  totalExpenses: number;
  totalIncome: number;
  balance: number;
  byCategory: Record<ExpenseCategory, number>;
}

// New types for better tracking
export interface Budget {
  id: string;
  userId: string;
  category: ExpenseCategory;
  amount: number;
  period: 'weekly' | 'monthly' | 'yearly';
  startDate: Date;
  endDate?: Date;
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  read: boolean;
  date: Date;
  type: 'alert' | 'info' | 'success' | 'warning';
  relatedTo?: {
    type: 'expense' | 'income' | 'budget' | 'group';
    id: string;
  };
}

export interface ExpenseReport {
  id: string;
  userId: string;
  name: string;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalAmount: number;
  categories: {
    category: ExpenseCategory;
    amount: number;
    percentage: number;
  }[];
  createdAt: Date;
}
