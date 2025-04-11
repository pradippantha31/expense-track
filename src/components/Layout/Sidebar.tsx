
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Wallet, PiggyBank, Users, Settings } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const AppSidebar: React.FC = () => {
  const location = useLocation();
  
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
  ];

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
      </SidebarContent>
      <SidebarFooter className="px-2 py-4">
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
