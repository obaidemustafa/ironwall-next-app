import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Shield,
  Activity,
  History,
  FileText,
  Settings,
  User,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useChat } from "@/context/ChatContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: Activity },
  { path: "/discovery", label: "Discovery Monitor", icon: Activity },
  { path: "/history", label: "Scan History", icon: History },
  { path: "/reports", label: "Reports", icon: FileText },
  { path: "/settings", label: "Settings", icon: Settings },
];

// Get user from localStorage
const getSavedUser = () => {
  try {
    const saved = localStorage.getItem("ironwall_user");
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error("Failed to parse user data");
  }
  return null;
};

export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { openChat } = useChat();
  const { toast } = useToast();
  const [user, setUser] = useState(getSavedUser());

  // Fetch fresh user data on mount and when localStorage changes
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("ironwall_token");
      if (!token) return;

      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Update localStorage and state
          localStorage.setItem("ironwall_user", JSON.stringify(data));
          setUser(data);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();

    // Listen for storage changes (for cross-tab sync)
    const handleStorageChange = () => {
      setUser(getSavedUser());
    };

    window.addEventListener("storage", handleStorageChange);

    // Also listen for custom event for same-tab updates
    const handleUserUpdate = () => {
      setUser(getSavedUser());
    };
    window.addEventListener("ironwall_user_updated", handleUserUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("ironwall_user_updated", handleUserUpdate);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("ironwall_token");
    localStorage.removeItem("ironwall_user");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  const getInitials = (username?: string) => {
    if (!username) return "U";
    return username
      .split(/[_\s]/)
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary-glow group-hover:scale-110 transition-transform">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold tracking-tight">
              IRONWALL
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn("nav-link", isActive && "active")}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* User Section */}
          <div className="flex items-center gap-2">
            <button
              onClick={openChat}
              className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              title="AI Assistant"
            >
              <MessageSquare className="h-5 w-5" />
            </button>
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-full">
                  <Avatar className="h-8 w-8 border-2 border-primary/50 hover:border-primary transition-colors cursor-pointer">
                    <AvatarImage src={user?.avatar?.url} alt={user?.username} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground text-xs font-semibold">
                      {getInitials(user?.username)}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-card border-border"
              >
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{user?.username || "User"}</span>
                    <span className="text-xs font-normal text-foreground-muted">
                      {user?.email}
                    </span>
                    {user?.role && (
                      <span className="text-xs font-medium text-primary mt-1 capitalize">
                        {user.role}
                      </span>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-critical cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};
