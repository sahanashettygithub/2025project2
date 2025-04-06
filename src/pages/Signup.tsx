
import { useState, useEffect } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Leaf, Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// Parse URL query params
const useQuery = () => {
  const { search } = useLocation();
  return new URLSearchParams(search);
};

const Signup = () => {
  const query = useQuery();
  const roleParam = query.get("role") || "";
  const { signUp, loading, user } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(roleParam);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");

  // Set role from URL parameter
  useEffect(() => {
    if (roleParam && ["donor", "receiver", "seller", "buyer"].includes(roleParam)) {
      setRole(roleParam);
    }
  }, [roleParam]);

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/" />;
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted || !role) return;
    
    const userData = {
      username,
      full_name: name,
      role
    };

    await signUp(email, password, userData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="max-w-md mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center mb-8">
            <Leaf className="h-12 w-12 text-eco-primary mb-4" />
            <h1 className="text-3xl font-bold text-center">Join Waste2Worth</h1>
            <p className="text-muted-foreground text-center mt-2">
              Create an account to start your sustainable journey
            </p>
          </div>
          
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Sign up</CardTitle>
              <CardDescription className="text-center">
                Fill in your details to create your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe" 
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="username" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="johndoe123" 
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="email" 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com" 
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="phone" 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000" 
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="pl-10 pr-10"
                      required
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Password must be at least 8 characters long
                  </p>
                </div>
                
                <div className="space-y-3">
                  <Label>I want to join as</Label>
                  <RadioGroup value={role} onValueChange={setRole} className="grid grid-cols-2 gap-4">
                    <Label
                      htmlFor="donor"
                      className={`flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-accent cursor-pointer
                        ${role === "donor" ? "border-eco-primary bg-eco-light" : "border-muted"}
                      `}
                    >
                      <RadioGroupItem value="donor" id="donor" className="sr-only" />
                      <span className="block text-center">Donor</span>
                    </Label>
                    <Label
                      htmlFor="receiver"
                      className={`flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-accent cursor-pointer
                        ${role === "receiver" ? "border-eco-primary bg-eco-light" : "border-muted"}
                      `}
                    >
                      <RadioGroupItem value="receiver" id="receiver" className="sr-only" />
                      <span className="block text-center">Receiver</span>
                    </Label>
                    <Label
                      htmlFor="seller"
                      className={`flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-accent cursor-pointer
                        ${role === "seller" ? "border-eco-primary bg-eco-light" : "border-muted"}
                      `}
                    >
                      <RadioGroupItem value="seller" id="seller" className="sr-only" />
                      <span className="block text-center">Seller</span>
                    </Label>
                    <Label
                      htmlFor="buyer"
                      className={`flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-accent cursor-pointer
                        ${role === "buyer" ? "border-eco-primary bg-eco-light" : "border-muted"}
                      `}
                    >
                      <RadioGroupItem value="buyer" id="buyer" className="sr-only" />
                      <span className="block text-center">Buyer</span>
                    </Label>
                  </RadioGroup>
                </div>
                
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox 
                    id="terms" 
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setTermsAccepted(!!checked)}
                    required
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{" "}
                    <Link to="/terms" className="text-eco-primary hover:underline">
                      Terms of Service
                    </Link>
                    {" "}and{" "}
                    <Link to="/privacy-policy" className="text-eco-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-eco-primary hover:bg-eco-dark"
                  disabled={loading || !termsAccepted || !role}
                >
                  {loading ? "Creating account..." : "Create Account"}
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline">Google</Button>
                <Button variant="outline">Facebook</Button>
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-center text-sm w-full">
                Already have an account?{" "}
                <Link to="/login" className="text-eco-primary hover:underline">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;
