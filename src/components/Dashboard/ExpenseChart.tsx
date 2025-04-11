
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ExpenseCategory } from '@/lib/types';

interface ExpenseChartProps {
  data: Array<{
    name: string;
    value: number;
    category: ExpenseCategory;
  }>;
}

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

const ExpenseChart: React.FC<ExpenseChartProps> = ({ data }) => {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Expense Breakdown</CardTitle>
        <CardDescription>Your spending by category</CardDescription>
      </CardHeader>
      <CardContent className="pl-0">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={CATEGORY_COLORS[entry.category] || '#6E59A5'} 
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`$${value}`, 'Amount']}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseChart;
