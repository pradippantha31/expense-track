
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
import { BarChart, PieChart, LineChart, Download, Calendar } from 'lucide-react';
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart as RechartsLineChart,
  Line
} from 'recharts';
import { ExpenseCategory } from '@/lib/types';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

const ReportsPage: React.FC = () => {
  // Mock data for charts
  const monthlyData = [
    { name: 'Jan', expenses: 1500, income: 3000 },
    { name: 'Feb', expenses: 1800, income: 3000 },
    { name: 'Mar', expenses: 2000, income: 3200 },
    { name: 'Apr', expenses: 1700, income: 3400 },
    { name: 'May', expenses: 1900, income: 3300 },
    { name: 'Jun', expenses: 2200, income: 3500 },
  ];

  const categoryData = [
    { name: 'Rent', value: 1200, category: 'rent' as ExpenseCategory },
    { name: 'Food', value: 375.25, category: 'food' as ExpenseCategory },
    { name: 'Utilities', value: 250, category: 'utility' as ExpenseCategory },
    { name: 'Gas', value: 125.50, category: 'gas' as ExpenseCategory },
    { name: 'Entertainment', value: 200, category: 'entertainment' as ExpenseCategory },
  ];
  
  const trendData = [
    { date: '2023-01-01', value: 1500 },
    { date: '2023-02-01', value: 1800 },
    { date: '2023-03-01', value: 1600 },
    { date: '2023-04-01', value: 2000 },
    { date: '2023-05-01', value: 1900 },
    { date: '2023-06-01', value: 2200 },
  ];

  const CATEGORY_COLORS = {
    gas: '#F97316',
    rent: '#0EA5E9',
    food: '#8B5CF6',
    utility: '#D946EF',
    entertainment: '#10B981',
    shopping: '#F59E0B',
    travel: '#3B82F6',
    healthcare: '#EC4899',
    education: '#6366F1',
    other: '#6E59A5',
  };

  const [dateRange, setDateRange] = useState({
    from: new Date(2023, 0, 1),
    to: new Date(),
  });
  
  const [period, setPeriod] = useState('monthly');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <Navbar />
          <main className="container py-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      {format(dateRange.from, "MMM d, yyyy")} - {format(dateRange.to, "MMM d, yyyy")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <CalendarComponent
                      mode="range"
                      selected={{
                        from: dateRange.from,
                        to: dateRange.to,
                      }}
                      onSelect={(range) => {
                        if (range?.from && range?.to) {
                          setDateRange({ from: range.from, to: range.to });
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                
                <Select value={period} onValueChange={setPeriod}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="overview">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="expenses">Expenses</TabsTrigger>
                <TabsTrigger value="income">Income</TabsTrigger>
                <TabsTrigger value="trends">Trends</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Income vs Expenses</CardTitle>
                      <CardDescription>Monthly comparison</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsBarChart
                            data={monthlyData}
                            margin={{
                              top: 20,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                            <Legend />
                            <Bar dataKey="income" fill="#10B981" name="Income" />
                            <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
                          </RechartsBarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Expense Breakdown</CardTitle>
                      <CardDescription>By category</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                            <Pie
                              data={categoryData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                              nameKey="name"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {categoryData.map((entry, index) => (
                                <Cell 
                                  key={`cell-${index}`} 
                                  fill={CATEGORY_COLORS[entry.category] || '#6E59A5'} 
                                />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                          </RechartsPieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="expenses">
                <Card>
                  <CardHeader>
                    <CardTitle>Expense Trends</CardTitle>
                    <CardDescription>Monthly expense tracking</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart
                          data={trendData}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                          <Legend />
                          <Line type="monotone" dataKey="value" stroke="#EF4444" name="Expenses" />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="income">
                <div className="text-center py-10 text-muted-foreground">
                  Income analysis will be available in the next version.
                </div>
              </TabsContent>
              
              <TabsContent value="trends">
                <div className="text-center py-10 text-muted-foreground">
                  Spending trend analysis will be available in the next version.
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ReportsPage;
