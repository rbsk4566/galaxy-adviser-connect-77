
import React from 'react';
import { Sidebar } from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const Layout = ({ children, title }: LayoutProps) => {
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = React.useState(!isMobile);

  React.useEffect(() => {
    setShowSidebar(!isMobile);
  }, [isMobile]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {showSidebar && (
        <Sidebar onClose={() => isMobile && setShowSidebar(false)} />
      )}
      
      <main className="flex-1">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <h1 className="text-xl font-bold text-galaxy-blue">
            {title || "Galaxy Health Insurance"}
          </h1>
          <div className="w-10" />
        </header>
        <div className="p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
