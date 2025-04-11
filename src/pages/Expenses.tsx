
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/Layout/Sidebar';
import Navbar from '@/components/Layout/Navbar';
import ExpenseForm from '@/components/Expense/ExpenseForm';
import ExpenseList from '@/components/Expense/ExpenseList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Expense, ExpenseCategory } from '@/lib/types';
import { toast } from 'sonner';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const ExpensesPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAddPage = location.pathname === '/expenses/new';
  
  // Mock data for demonstration
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: '1',
      amount: 1200,
      description: 'Monthly rent payment',
      category: 'rent',
      date: new Date(2023, 3, 1),
      userId: 'user1',
    },
    {
      id: '2',
      amount: 75.25,
      description: 'Grocery shopping',
      category: 'food',
      date: new Date(2023, 3, 2),
      userId: 'user1',
    },
    {
      id: '3',
      amount: 125.50,
      description: 'Gas station fill-up',
      category: 'gas',
      date: new Date(2023, 3, 3),
      userId: 'user1',
    },
    {
      id: '4',
      amount: 250,
      description: 'Electricity and water bill',
      category: 'utility',
      date: new Date(2023, 3, 4),
      userId: 'user1',
    },
    {
      id: '5',
      amount: 200,
      description: 'Concert tickets',
      category: 'entertainment',
      date: new Date(2023, 3, 5),
      userId: 'user1',
    },
  ]);

  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const handleAddExpense = (formData: any) => {
    const newExpense: Expense = {
      id: Date.now().toString(),
      amount: formData.amount,
      description: formData.description,
      category: formData.category as ExpenseCategory,
      date: formData.date,
      userId: 'user1', // In a real app, this would come from authentication
    };

    setExpenses([newExpense, ...expenses]);
    toast.success("Expense added successfully");
    navigate('/expenses');
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    // In a real app, this would open a modal or navigate to an edit form
    toast.info("Edit functionality will be implemented in the next version");
  };

  const handleDeleteExpense = (expenseId: string) => {
    setExpenses(expenses.filter(expense => expense.id !== expenseId));
    toast.success("Expense deleted successfully");
  };

  // Determine which tab should be active
  const activeTab = isAddPage ? "add" : "list";

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <Navbar />
          <main className="container py-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
              {!isAddPage && (
                <Button onClick={() => navigate('/expenses/new')}>
                  <Plus className="mr-2 h-4 w-4" /> Add Expense
                </Button>
              )}
            </div>
            
            <Tabs value={activeTab} className="w-full" onValueChange={(value) => {
              if (value === "add") {
                navigate('/expenses/new');
              } else {
                navigate('/expenses');
              }
            }}>
              <TabsList className="mb-4">
                <TabsTrigger value="list">All Expenses</TabsTrigger>
                <TabsTrigger value="add">Add Expense</TabsTrigger>
              </TabsList>
              <TabsContent value="list">
                <ExpenseList 
                  expenses={expenses} 
                  onEdit={handleEditExpense}
                  onDelete={handleDeleteExpense}
                />
              </TabsContent>
              <TabsContent value="add">
                <div className="max-w-2xl mx-auto">
                  <ExpenseForm onSubmit={handleAddExpense} />
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ExpensesPage;
