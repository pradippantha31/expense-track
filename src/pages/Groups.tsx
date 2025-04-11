
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/Layout/Sidebar';
import Navbar from '@/components/Layout/Navbar';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, User, Users } from 'lucide-react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import CreateGroupDialog from '@/components/Group/CreateGroupDialog';
import GroupList from '@/components/Group/GroupList';
import GroupMembers from '@/components/Group/GroupMembers';

// Mock group data
const mockGroups = [
  {
    id: '1',
    name: 'Roommates',
    description: 'Apartment expenses',
    createdAt: new Date(2023, 2, 15),
    members: [
      { id: 'user1', name: 'John Doe', email: 'john@example.com', role: 'admin' },
      { id: 'user2', name: 'Jane Smith', email: 'jane@example.com', role: 'member' }
    ]
  },
  {
    id: '2',
    name: 'Vacation Trip',
    description: 'Hawaii vacation expenses',
    createdAt: new Date(2023, 5, 1),
    members: [
      { id: 'user1', name: 'John Doe', email: 'john@example.com', role: 'admin' },
      { id: 'user3', name: 'Bob Johnson', email: 'bob@example.com', role: 'member' },
      { id: 'user4', name: 'Alice Brown', email: 'alice@example.com', role: 'member' }
    ]
  }
];

const GroupsPage: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState(mockGroups[0]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleCreateGroup = (formData: any) => {
    toast.success(`Group "${formData.name}" created successfully`);
    setIsCreateDialogOpen(false);
  };

  const handleSelectGroup = (group: any) => {
    setSelectedGroup(group);
  };

  const handleAddMember = (email: string) => {
    toast.success(`Invitation sent to ${email}`);
  };

  const handleRemoveMember = (memberId: string) => {
    toast.success("Member removed from group");
  };

  const handleLeaveGroup = () => {
    toast.info("You have left the group");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <Navbar />
          <main className="container py-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold tracking-tight">Groups</h1>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" /> Create Group
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>My Groups</CardTitle>
                  <CardDescription>Select a group to view details</CardDescription>
                </CardHeader>
                <CardContent>
                  <GroupList 
                    groups={mockGroups} 
                    selectedGroupId={selectedGroup?.id}
                    onSelectGroup={handleSelectGroup}
                  />
                </CardContent>
              </Card>
              
              {selectedGroup && (
                <Card className="md:col-span-3">
                  <CardHeader>
                    <CardTitle>{selectedGroup.name}</CardTitle>
                    <CardDescription>{selectedGroup.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="members">
                      <TabsList>
                        <TabsTrigger value="members">Members</TabsTrigger>
                        <TabsTrigger value="expenses">Group Expenses</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                      </TabsList>
                      <TabsContent value="members" className="py-4">
                        <GroupMembers 
                          members={selectedGroup.members}
                          onAddMember={handleAddMember}
                          onRemoveMember={handleRemoveMember}
                        />
                      </TabsContent>
                      <TabsContent value="expenses" className="py-4">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-medium">Group Expenses</h3>
                          <Button size="sm">Add Expense</Button>
                        </div>
                        <p className="text-muted-foreground">No expenses added yet.</p>
                      </TabsContent>
                      <TabsContent value="settings" className="py-4">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Group Settings</h3>
                          <Button variant="destructive" onClick={handleLeaveGroup}>
                            Leave Group
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              )}
            </div>
            
            <CreateGroupDialog 
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
              onSubmit={handleCreateGroup}
            />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default GroupsPage;
