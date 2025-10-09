import { NavLink, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  History, 
  CheckSquare, 
  Settings,
  MessageSquare
} from "lucide-react";
import inboxtLogo from "@/assets/inboxt-logo.png";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Chat", 
    href: "/chat",
    icon: MessageSquare,
  },
  {
    name: "History", 
    href: "/history",
    icon: History,
  },
  {
    name: "Tasks",
    href: "/tasks", 
    icon: CheckSquare,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("bg-surface border-r border-border-subtle", className)}>
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-center px-6 border-b border-border-subtle">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src={inboxtLogo} 
              alt="InBoxt Logo" 
              className="w-8 h-8 object-contain"
            />
            <span className="text-xl font-bold text-foreground">InBoxt-Digest</span>
          </Link>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-150",
                  "hover:bg-card-hover",
                  "focus-ring",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-foreground-muted hover:text-foreground"
                )
              }
            >
              <item.icon className="mr-3 h-4 w-4 flex-shrink-0" />
              {item.name}
            </NavLink>
          ))}
        </nav>
        
        {/* Footer Links */}
        <div className="px-4 pb-4 border-t border-border-subtle pt-4">
          <div className="space-y-2 text-xs text-foreground-muted">
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              <Link to="/features" className="hover:text-foreground transition-colors">Features</Link>
              <Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
              <Link to="/security" className="hover:text-foreground transition-colors">Security</Link>
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
              <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}