import { useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
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
      case '/chat':
        return 'Chat';
      case '/settings':
        return 'Settings';
      default:
        return 'InBoxt';
    }
  };

  // Pages that should NOT show the footer
  const hideFooterPaths = ['/chat', '/history', '/tasks'];
  const shouldShowFooter = !hideFooterPaths.includes(location.pathname);

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
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
        
        {shouldShowFooter && (
          <footer className="border-t border-border-subtle p-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3 text-sm">Product</h4>
                  <ul className="space-y-2 text-sm text-foreground-muted">
                    <li><Link to="/features" className="hover:text-foreground transition-colors">Features</Link></li>
                    <li><Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                    <li><Link to="/security" className="hover:text-foreground transition-colors">Security</Link></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-3 text-sm">Support</h4>
                  <ul className="space-y-2 text-sm text-foreground-muted">
                    <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
                    <li><Link to="/status" className="hover:text-foreground transition-colors">Status</Link></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-3 text-sm">Legal</h4>
                  <ul className="space-y-2 text-sm text-foreground-muted">
                    <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                    <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
                    <li><Link to="/gdpr" className="hover:text-foreground transition-colors">GDPR</Link></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-3 text-sm">App</h4>
                  <ul className="space-y-2 text-sm text-foreground-muted">
                    <li><Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
                    <li><Link to="/tasks" className="hover:text-foreground transition-colors">Tasks</Link></li>
                    <li><Link to="/settings" className="hover:text-foreground transition-colors">Settings</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-border-subtle pt-4 text-center text-sm text-foreground-muted">
                <p>© 2025 InBoxt. All rights reserved.</p>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}