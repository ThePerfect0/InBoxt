import { useState } from "react";
import { RefreshCw, Search, Menu, User, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopBarProps {
  title: string;
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

export function TopBar({ title, onMenuClick, showMenuButton = false }: TopBarProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  return (
    <header className="h-16 bg-surface border-b border-border-subtle flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-4">
        {showMenuButton && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="md:hidden"
          >
            <Menu className="h-4 w-4" />
          </Button>
        )}
        
        <h1 className="text-heading-md text-foreground">{title}</h1>
      </div>
      
      {/* Search Bar */}
      <div className="flex-1 max-w-md mx-4 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground-muted" />
        <input
          type="text"
          placeholder="Search emails or tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-input border border-border-subtle rounded-lg text-sm text-foreground placeholder-foreground-muted focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
        />
      </div>
      
      <div className="flex items-center gap-3">
        {/* Refresh Button */}
        <Button
          variant="secondary"
          size="sm" 
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="hidden sm:flex"
        >
          <RefreshCw className={cn("h-4 w-4 mr-2", isRefreshing && "animate-spin")} />
          Refresh
        </Button>
        
        {/* Mobile Refresh */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="sm:hidden"
        >
          <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
        </Button>
        
        {/* Profile Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="focus-ring">
              <Avatar className="h-8 w-8">
                <div className="bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center w-full h-full">
                  JD
                </div>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-danger">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}