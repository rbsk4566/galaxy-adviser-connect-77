
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X, BarChart, Users, FileText, Plus, UserPlus, FilePlus } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

type SidebarProps = {
  onClose: () => void;
};

export const Sidebar = ({ onClose }: SidebarProps) => {
  const isMobile = useIsMobile();
  
  return (
    <aside className="w-full md:w-64 bg-sidebar text-sidebar-foreground flex flex-col z-10 md:relative fixed top-0 left-0 h-screen">
      <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
        <h2 className="text-lg font-bold text-sidebar-primary">Galaxy Health</h2>
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onClose} className="text-sidebar-foreground">
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `flex items-center p-2 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-sidebar-accent text-sidebar-foreground' 
                    : 'hover:bg-sidebar-accent/50'
                }`
              }
              onClick={() => isMobile && onClose()}
            >
              <BarChart className="mr-3 h-5 w-5" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/advisers" 
              className={({ isActive }) => 
                `flex items-center p-2 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-sidebar-accent text-sidebar-foreground' 
                    : 'hover:bg-sidebar-accent/50'
                }`
              }
              onClick={() => isMobile && onClose()}
            >
              <Users className="mr-3 h-5 w-5" />
              Advisers
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/policies" 
              className={({ isActive }) => 
                `flex items-center p-2 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-sidebar-accent text-sidebar-foreground' 
                    : 'hover:bg-sidebar-accent/50'
                }`
              }
              onClick={() => isMobile && onClose()}
            >
              <FileText className="mr-3 h-5 w-5" />
              Policies
            </NavLink>
          </li>
          <li className="pt-4 border-t border-sidebar-border/30">
            <NavLink 
              to="/add-adviser" 
              className={({ isActive }) => 
                `flex items-center p-2 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-sidebar-accent text-sidebar-foreground' 
                    : 'hover:bg-sidebar-accent/50'
                }`
              }
              onClick={() => isMobile && onClose()}
            >
              <UserPlus className="mr-3 h-5 w-5" />
              Add Adviser
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/add-policy" 
              className={({ isActive }) => 
                `flex items-center p-2 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-sidebar-accent text-sidebar-foreground' 
                    : 'hover:bg-sidebar-accent/50'
                }`
              }
              onClick={() => isMobile && onClose()}
            >
              <FilePlus className="mr-3 h-5 w-5" />
              Add Policy
            </NavLink>
          </li>
        </ul>
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-sidebar-primary text-sidebar-primary-foreground flex items-center justify-center font-medium">
            SR
          </div>
          <div className="ml-3">
            <p className="font-medium">G Sripal Reddy</p>
            <p className="text-xs text-sidebar-foreground/80">Senior BD Manager</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

