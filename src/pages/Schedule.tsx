
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
import { Button } from '@/components/ui/button';
import { PlusCircle, Calendar, ArrowRight, Edit, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { ExpenseCategory } from '@/lib/types';

// Define recurring expense type
interface RecurringExpense {
  id: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  startDate: Date;
  endDate?: Date;
  nextOccurrence: Date;
}

const SchedulePage: React.FC = () => {
  // Mock data for recurring expenses
  const [recurringExpenses, setRecurringExpenses] = useState<RecurringExpense[]>([
    {
      id: '1',
      description: 'Rent Payment',
      amount: 1200,
      category: 'rent',
      frequency: 'monthly',
      startDate: new Date(2023, 3, 1),
      nextOccurrence: new Date(2023, 4, 1),
    },
    {
      id: '2',
      description: 'Netflix Subscription',
      amount: 15.99,
      category: 'entertainment',
      frequency: 'monthly',
      startDate: new Date(2023, 3, 10),
      nextOccurrence: new Date(2023, 4, 10),
    },
    {
      id: '3',
      description: 'Gym Membership',
      amount: 49.99,
      category: 'healthcare',
      frequency: 'monthly',
      startDate: new Date(2023, 3, 15),
      nextOccurrence: new Date(2023, 4, 15),
    },
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date));
  };

  const handleDeleteRecurring = (id: string) => {
    setRecurringExpenses(recurringExpenses.filter(expense => expense.id !== id));
    toast.success("Recurring expense deleted");
  };

  const getCategoryColor = (category: string) => {
    const categories: Record<string, string> = {
      gas: 'bg-expense-gas',
      rent: 'bg-expense-rent',
      food: 'bg-expense-food',
      utility: 'bg-expense-utility',
      entertainment: 'bg-primary/70',
      healthcare: 'bg-blue-500',
      other: 'bg-expense-other',
    };
    
    return categories[category] || 'bg-gray-500';
  };

  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case 'daily': return 'Daily';
      case 'weekly': return 'Weekly';
      case 'monthly': return 'Monthly';
      case 'yearly': return 'Yearly';
      default: return frequency;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <Navbar />
          <main className="container py-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold tracking-tight">Scheduled Expenses</h1>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Recurring Expense
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Recurring Expenses</CardTitle>
                <CardDescription>
                  Manage your automatic recurring expenses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Next Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recurringExpenses.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No recurring expenses set up yet. Add one to get started.
                        </TableCell>
                      </TableRow>
                    ) : (
                      recurringExpenses.map((expense) => (
                        <TableRow key={expense.id}>
                          <TableCell className="font-medium">{expense.description}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={`${getCategoryColor(expense.category)} text-white`}>
                              {expense.category}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatCurrency(expense.amount)}</TableCell>
                          <TableCell>{getFrequencyLabel(expense.frequency)}</TableCell>
                          <TableCell className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            {formatDate(expense.nextOccurrence)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleDeleteRecurring(expense.id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            {/* Upcoming Payments */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Upcoming Payments</CardTitle>
                <CardDescription>Next 30 days of scheduled expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recurringExpenses.map((expense) => (
                    <div key={expense.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${getCategoryColor(expense.category)}`}>
                          <Calendar className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium">{expense.description}</h4>
                          <p className="text-sm text-muted-foreground">{formatDate(expense.nextOccurrence)}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">{formatCurrency(expense.amount)}</span>
                        <ArrowRight className="ml-2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogTitle>Add Recurring Expense</DialogTitle>
                <div className="py-10 text-center text-muted-foreground">
                  Recurring expense form will be implemented in the next version.
                </div>
                <div className="flex justify-end">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Close
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SchedulePage;
