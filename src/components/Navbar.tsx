
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogIn, Home, Gift, ShoppingBag, Leaf, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to get user initials for avatar fallback
  const getUserInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase();
    }
    return user?.email?.substring(0, 2).toUpperCase() || 'U';
  };

  // Get dashboard link based on user role
  const getDashboardLink = () => {
    if (!profile) return '/';
    
    switch (profile.role) {
      case 'donor': return '/donor-dashboard';
      case 'receiver': return '/receiver-dashboard';
      case 'seller': return '/seller-dashboard';
      case 'buyer': return '/buyer-dashboard';
      default: return '/';
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Leaf className="h-8 w-8 text-eco-primary" />
              <span className="font-bold text-xl text-eco-primary">Waste2Worth</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-foreground hover:text-eco-primary px-3 py-2 flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link to="/donate" className="text-foreground hover:text-eco-primary px-3 py-2 flex items-center gap-1">
              <Gift className="h-4 w-4" />
              <span>Donate</span>
            </Link>
            <Link to="/sell" className="text-foreground hover:text-eco-primary px-3 py-2 flex items-center gap-1">
              <ShoppingBag className="h-4 w-4" />
              <span>Sell</span>
            </Link>
            <Link to="/eco-store" className="text-foreground hover:text-eco-primary px-3 py-2 flex items-center gap-1">
              <Leaf className="h-4 w-4" />
              <span>Eco Store</span>
            </Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-9 w-9 border border-border">
                      <AvatarImage src={profile?.avatar_url || ''} />
                      <AvatarFallback className="bg-muted text-eco-primary">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  {profile && (
                    <div className="px-2 py-1.5 text-sm">
                      <p className="font-medium">{profile.full_name || 'User'}</p>
                      <p className="text-muted-foreground text-xs">{user.email}</p>
                      <p className="text-muted-foreground text-xs capitalize mt-1">Role: {profile.role}</p>
                      {profile.points !== undefined && (
                        <p className="text-eco-primary text-xs font-medium mt-1">
                          Eco Points: {profile.points}
                        </p>
                      )}
                    </div>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={getDashboardLink()} className="w-full cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="cursor-pointer text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="ml-4 flex items-center gap-1">
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-eco-primary hover:bg-eco-dark flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>Sign Up</span>
                  </Button>
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 mr-2 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={profile?.avatar_url || ''} />
                      <AvatarFallback className="bg-muted text-eco-primary text-xs">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link to={getDashboardLink()}>
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut} className="cursor-pointer text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-eco-primary focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-eco-primary">
              Home
            </Link>
            <Link to="/donate" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-eco-primary">
              Donate
            </Link>
            <Link to="/sell" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-eco-primary">
              Sell
            </Link>
            <Link to="/eco-store" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-eco-primary">
              Eco Store
            </Link>
            
            {user ? (
              <>
                {profile && (
                  <div className="px-3 py-2">
                    <p className="font-medium">{profile.full_name || 'User'}</p>
                    <p className="text-muted-foreground text-sm">{user.email}</p>
                    <p className="text-muted-foreground text-sm capitalize mt-1">Role: {profile.role}</p>
                    {profile.points !== undefined && (
                      <p className="text-eco-primary text-sm font-medium mt-1">
                        Eco Points: {profile.points}
                      </p>
                    )}
                  </div>
                )}
                <Link to={getDashboardLink()} className="block px-3 py-2 rounded-md text-base font-medium text-eco-primary hover:bg-eco-primary hover:bg-opacity-10">
                  <div className="flex items-center">
                    <LayoutDashboard className="mr-2 h-5 w-5" />
                    <span>Dashboard</span>
                  </div>
                </Link>
                <button
                  onClick={signOut}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-destructive hover:bg-destructive hover:bg-opacity-10"
                >
                  <div className="flex items-center">
                    <LogOut className="mr-2 h-5 w-5" />
                    <span>Log out</span>
                  </div>
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="w-full justify-center mt-3">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="w-full justify-center mt-2 bg-eco-primary hover:bg-eco-dark">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
