
import React from 'react';
import { Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Group } from '@/lib/types';

interface GroupListProps {
  groups: Group[];
  selectedGroupId?: string;
  onSelectGroup: (group: Group) => void;
}

const GroupList: React.FC<GroupListProps> = ({
  groups,
  selectedGroupId,
  onSelectGroup
}) => {
  return (
    <div className="space-y-2">
      {groups.length === 0 ? (
        <p className="text-muted-foreground py-4 text-center">No groups yet</p>
      ) : (
        groups.map((group) => (
          <div
            key={group.id}
            className={cn(
              "p-3 rounded-md cursor-pointer transition-colors",
              selectedGroupId === group.id 
                ? "bg-primary/10 dark:bg-primary/20" 
                : "hover:bg-muted"
            )}
            onClick={() => onSelectGroup(group)}
          >
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-2 rounded-full">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">{group.name}</h4>
                <p className="text-xs text-muted-foreground">
                  {group.members.length} members
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default GroupList;
