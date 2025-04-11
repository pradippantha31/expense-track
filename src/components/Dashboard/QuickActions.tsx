
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusCircle, 
  TrendingUp, 
  Users, 
  BarChart, 
  FileText,
  Calendar
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const QuickActions: React.FC = () => {
  const actions = [
    {
      title: 'Add Expense',
      description: 'Record a new expense',
      icon: <PlusCircle className="h-6 w-6 text-destructive" />,
      route: '/expenses/new',
      variant: 'outline' as const
    },
    {
      title: 'Add Income',
      description: 'Log your latest income',
      icon: <TrendingUp className="h-6 w-6 text-green-500" />,
      route: '/income/new',
      variant: 'outline' as const
    },
    {
      title: 'Groups',
      description: 'Manage shared expenses',
      icon: <Users className="h-6 w-6 text-primary" />,
      route: '/groups',
      variant: 'outline' as const
    },
    {
      title: 'Reports',
      description: 'View spending analytics',
      icon: <BarChart className="h-6 w-6 text-amber-500" />,
      route: '/reports',
      variant: 'outline' as const
    },
    {
      title: 'Budget',
      description: 'Set spending limits',
      icon: <FileText className="h-6 w-6 text-blue-500" />,
      route: '/budget',
      variant: 'outline' as const
    },
    {
      title: 'Schedule',
      description: 'Recurring expenses',
      icon: <Calendar className="h-6 w-6 text-purple-500" />,
      route: '/schedule',
      variant: 'outline' as const
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks to manage your finances</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {actions.map((action) => (
            <Button 
              key={action.title}
              variant={action.variant}
              className="h-auto flex-col gap-2 p-4 items-center justify-center text-center"
              asChild
            >
              <Link to={action.route}>
                {action.icon}
                <div className="mt-2">
                  <p className="font-medium">{action.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{action.description}</p>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
