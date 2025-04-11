
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/Layout/Sidebar';
import Navbar from '@/components/Layout/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserList } from '@/components/Admin/UserList';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Mock user data
const mockUsers = [
  { id: 'user1', name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active' },
  { id: 'user2', name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active' },
  { id: 'user3', name: 'Bob Johnson', email: 'bob@example.com', role: 'user', status: 'inactive' },
  { id: 'user4', name: 'Alice Brown', email: 'alice@example.com', role: 'user', status: 'active' },
  { id: 'user5', name: 'Tom Wilson', email: 'tom@example.com', role: 'user', status: 'pending' },
];

const AdminPage: React.FC = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');

  const handleRoleChange = (userId: string, newRole: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
    toast.success('User role updated');
  };

  const handleStatusChange = (userId: string, newStatus: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
    toast.success('User status updated');
  };

  const handleDeleteUser = (userId: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    toast.success('User deleted');
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <Navbar />
          <main className="container py-6">
            <h1 className="text-3xl font-bold tracking-tight mb-6">Admin Dashboard</h1>
            
            <Tabs defaultValue="users" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="users">User Management</TabsTrigger>
                <TabsTrigger value="system">System Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="users">
                <Card>
                  <CardHeader>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage user accounts and permissions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex w-full max-w-sm items-center space-x-2">
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <Button type="submit">Search</Button>
                    </div>
                    
                    <UserList
                      users={filteredUsers}
                      onRoleChange={handleRoleChange}
                      onStatusChange={handleStatusChange}
                      onDeleteUser={handleDeleteUser}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="system">
                <Card>
                  <CardHeader>
                    <CardTitle>System Settings</CardTitle>
                    <CardDescription>Manage application settings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      System settings will be available after connecting to Supabase.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminPage;
