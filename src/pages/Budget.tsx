
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/Layout/Sidebar';
import Navbar from '@/components/Layout/Navbar';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ExpenseCategory, Budget as BudgetType } from '@/lib/types';
import { Progress } from '@/components/ui/progress';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import BudgetForm from '@/components/Budget/BudgetForm';

const BudgetPage: React.FC = () => {
  // Mock data for budgets
  const [budgets, setBudgets] = useState<BudgetType[]>([
    {
      id: '1',
      userId: 'user1',
      category: 'food',
      amount: 400,
      period: 'monthly',
      startDate: new Date(2023, 3, 1),
    },
    {
      id: '2',
      userId: 'user1',
      category: 'entertainment',
      amount: 200,
      period: 'monthly',
      startDate: new Date(2023, 3, 1),
    },
    {
      id: '3',
      userId: 'user1',
      category: 'rent',
      amount: 1200,
      period: 'monthly',
      startDate: new Date(2023, 3, 1),
    }
  ]);

  // Mock spending data
  const spending = {
    food: 325.50,
    entertainment: 175.25,
    rent: 1200,
    gas: 85.75,
    utility: 150,
  };

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleAddBudget = (formData: any) => {
    const newBudget: BudgetType = {
      id: Date.now().toString(),
      userId: 'user1',
      category: formData.category,
      amount: formData.amount,
      period: formData.period,
      startDate: formData.startDate,
      endDate: formData.endDate,
    };
    
    setBudgets([...budgets, newBudget]);
    setIsCreateDialogOpen(false);
    toast.success("Budget created successfully");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getBudgetProgress = (category: ExpenseCategory) => {
    const budget = budgets.find(b => b.category === category);
    if (!budget) return 0;
    
    const spent = spending[category] || 0;
    return Math.min(Math.round((spent / budget.amount) * 100), 100);
  };

  const getBudgetStatus = (category: ExpenseCategory) => {
    const progress = getBudgetProgress(category);
    if (progress > 90) return 'danger';
    if (progress > 70) return 'warning';
    return 'success';
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <Navbar />
          <main className="container py-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold tracking-tight">Budget Management</h1>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" /> Create Budget
              </Button>
            </div>
            
            <Tabs defaultValue="monthly">
              <TabsList className="mb-4">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="yearly">Yearly</TabsTrigger>
              </TabsList>
              
              <TabsContent value="monthly">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {budgets.filter(b => b.period === 'monthly').map((budget) => (
                    <Card key={budget.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="capitalize">{budget.category}</CardTitle>
                        <CardDescription>
                          {formatCurrency(spending[budget.category] || 0)} of {formatCurrency(budget.amount)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Progress 
                          value={getBudgetProgress(budget.category)} 
                          className={`h-2 ${
                            getBudgetStatus(budget.category) === 'danger' 
                              ? 'bg-red-200' 
                              : getBudgetStatus(budget.category) === 'warning'
                                ? 'bg-amber-200'
                                : 'bg-green-200'
                          }`}
                        />
                        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                          <span>
                            {getBudgetProgress(budget.category)}% Used
                          </span>
                          <span>
                            {formatCurrency(budget.amount - (spending[budget.category] || 0))} Remaining
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="weekly">
                <div className="text-center py-10 text-muted-foreground">
                  No weekly budgets set. Create one to get started.
                </div>
              </TabsContent>
              
              <TabsContent value="yearly">
                <div className="text-center py-10 text-muted-foreground">
                  No yearly budgets set. Create one to get started.
                </div>
              </TabsContent>
            </Tabs>
            
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogTitle>Create New Budget</DialogTitle>
                <BudgetForm onSubmit={handleAddBudget} />
              </DialogContent>
            </Dialog>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default BudgetPage;
