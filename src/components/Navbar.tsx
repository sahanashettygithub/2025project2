
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogIn, Home, Gift, ShoppingBag, Leaf } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
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
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
