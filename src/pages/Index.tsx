
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/Layout/Sidebar';
import Navbar from '@/components/Layout/Navbar';
import ExpenseSummary from '@/components/Dashboard/ExpenseSummary';
import ExpenseChart from '@/components/Dashboard/ExpenseChart';
import RecentTransactions from '@/components/Dashboard/RecentTransactions';
import QuickActions from '@/components/Dashboard/QuickActions';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ExpenseCategory } from '@/lib/types';

const Dashboard: React.FC = () => {
  // Mock data for demonstration
  const mockSummary = {
    totalExpenses: 2150.75,
    totalIncome: 4500,
    balance: 2349.25,
    byCategory: {
      gas: 125.50,
      rent: 1200,
      food: 375.25,
      utility: 250,
      entertainment: 200,
      shopping: 0,
      travel: 0,
      healthcare: 0,
      education: 0,
      other: 0,
    } as Record<ExpenseCategory, number>,
  };

  const mockChartData = [
    { name: 'Rent', value: 1200, category: 'rent' as ExpenseCategory },
    { name: 'Food', value: 375.25, category: 'food' as ExpenseCategory },
    { name: 'Utilities', value: 250, category: 'utility' as ExpenseCategory },
    { name: 'Gas', value: 125.50, category: 'gas' as ExpenseCategory },
    { name: 'Entertainment', value: 200, category: 'entertainment' as ExpenseCategory },
  ];

  const mockTransactions = [
    {
      id: '1',
      amount: 1200,
      description: 'Monthly rent payment',
      category: 'rent' as ExpenseCategory,
      date: new Date(2023, 3, 1),
      userId: 'user1',
      type: 'expense' as const,
    },
    {
      id: '2',
      amount: 4500,
      source: 'Salary',
      description: 'Monthly salary',
      date: new Date(2023, 3, 1),
      userId: 'user1',
      type: 'income' as const,
    },
    {
      id: '3',
      amount: 75.25,
      description: 'Grocery shopping',
      category: 'food' as ExpenseCategory,
      date: new Date(2023, 3, 2),
      userId: 'user1',
      type: 'expense' as const,
    },
    {
      id: '4',
      amount: 125.50,
      description: 'Gas station fill-up',
      category: 'gas' as ExpenseCategory,
      date: new Date(2023, 3, 3),
      userId: 'user1',
      type: 'expense' as const,
    },
    {
      id: '5',
      amount: 200,
      description: 'Concert tickets',
      category: 'entertainment' as ExpenseCategory,
      date: new Date(2023, 3, 5),
      userId: 'user1',
      type: 'expense' as const,
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <Navbar />
          <main className="container py-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <Button asChild>
                <Link to="/expenses/new">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Expense
                </Link>
              </Button>
            </div>
            
            <div className="space-y-6">
              <ExpenseSummary summary={mockSummary} />
              
              <QuickActions />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ExpenseChart data={mockChartData} />
                
                <RecentTransactions transactions={mockTransactions} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
