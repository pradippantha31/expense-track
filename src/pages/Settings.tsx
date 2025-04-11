
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/Layout/Sidebar';
import Navbar from '@/components/Layout/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/hooks/use-theme';
import { toast } from 'sonner';

const Settings: React.FC = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [notifications, setNotifications] = useState(true);
  const { theme, setTheme } = useTheme();

  const handleSaveProfile = () => {
    // In a real app, this would make an API call to update the user's profile
    toast.success('Profile updated successfully');
  };

  const handleToggleNotifications = () => {
    setNotifications(!notifications);
    toast.success(`Notifications ${!notifications ? 'enabled' : 'disabled'}`);
  };

  const handleToggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    toast.success(`${theme === 'dark' ? 'Light' : 'Dark'} mode activated`);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <Navbar />
          <main className="container py-6">
            <h1 className="text-3xl font-bold tracking-tight mb-6">Settings</h1>
            
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <Button variant="outline">Change Avatar</Button>
                    </div>
                    
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Display Name</Label>
                        <Input 
                          id="name" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveProfile}>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="appearance">
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>Customize how the app looks</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="theme-toggle" className="font-medium">Dark Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Switch between light and dark themes
                        </p>
                      </div>
                      <Switch 
                        id="theme-toggle" 
                        checked={theme === 'dark'} 
                        onCheckedChange={handleToggleTheme} 
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Configure how you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notifications-toggle" className="font-medium">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive email updates about your account activity
                        </p>
                      </div>
                      <Switch 
                        id="notifications-toggle" 
                        checked={notifications} 
                        onCheckedChange={handleToggleNotifications} 
                      />
                    </div>
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

export default Settings;
