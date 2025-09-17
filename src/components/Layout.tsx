import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { MobileDrawer } from "./MobileDrawer";
import { useIsMobile } from "@/hooks/use-mobile";

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    const today = new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    switch (path) {
      case '/':
      case '/dashboard':
        return `Today — ${today}`;
      case '/history':
        return 'History';
      case '/tasks':
        return 'Tasks';
      case '/settings':
        return 'Settings';
      default:
        return 'InBoxt';
    }
  };

  return (
    <div className="min-h-screen bg-background flex w-full">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Sidebar className="w-64 border-r border-border-subtle" />
      )}
      
      {/* Mobile Drawer */}
      {isMobile && (
        <MobileDrawer 
          open={sidebarOpen} 
          onOpenChange={setSidebarOpen} 
        />
      )}
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar 
          title={getPageTitle()}
          onMenuClick={() => setSidebarOpen(true)}
          showMenuButton={isMobile}
        />
        
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
        
        <footer className="border-t border-border-subtle p-4 text-center">
          <p className="text-body-sm text-foreground-muted">
            © 2025 InBoxt. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}