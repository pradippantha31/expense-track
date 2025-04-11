
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Wallet, PiggyBank, Users, Settings, Moon, Sun, Shield } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { PlusCircle } from 'lucide-react';

const AppSidebar: React.FC = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = React.useState(true);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navigation = [
    {
      name: 'Dashboard',
      href: '/',
      icon: LayoutDashboard,
    },
    {
      name: 'Expenses',
      href: '/expenses',
      icon: Wallet,
    },
    {
      name: 'Income',
      href: '/income',
      icon: PiggyBank,
    },
    {
      name: 'Groups',
      href: '/groups',
      icon: Users,
    },
    {
      name: 'Admin',
      href: '/admin',
      icon: Shield,
    },
  ];

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4">
        <h2 className="text-lg font-bold text-sidebar-foreground">ExpenseTracker</h2>
      </SidebarHeader>
      <SidebarContent className="px-2 py-4">
        <nav className="flex flex-col gap-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn("sidebar-item", isActive(item.href) && "active")}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        
        <div className="mt-6">
          <Collapsible
            open={open}
            onOpenChange={setOpen}
            className="w-full"
          >
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between text-muted-foreground">
                <span>Quick Actions</span>
                <PlusCircle className="h-4 w-4" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mt-2">
              <Button asChild variant="ghost" className="w-full justify-start bg-sidebar-accent/50 hover:bg-sidebar-accent">
                <Link to="/expenses/new">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Expense
                </Link>
              </Button>
              <Button asChild variant="ghost" className="w-full justify-start bg-sidebar-accent/50 hover:bg-sidebar-accent">
                <Link to="/income/new">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Income
                </Link>
              </Button>
              <Button asChild variant="ghost" className="w-full justify-start bg-sidebar-accent/50 hover:bg-sidebar-accent">
                <Link to="/groups">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Groups
                </Link>
              </Button>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </SidebarContent>
      <SidebarFooter className="px-2 py-4 space-y-2">
        <Button 
          variant="ghost" 
          className="w-full justify-start sidebar-item"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </Button>
        
        <Button asChild variant="ghost" className="sidebar-item w-full justify-start">
          <Link to="/settings">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
