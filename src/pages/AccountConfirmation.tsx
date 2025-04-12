
import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { AnimatedElement } from "@/components/AnimatedElement";

const AccountConfirmation = () => {
  const { user, profile, session } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Check if this is an email confirmation redirect
    const searchParams = new URLSearchParams(location.search);
    const type = searchParams.get('type');
    
    if (type === 'email_confirmation') {
      toast({
        title: "Email verified successfully!",
        description: "Your account is now active.",
        variant: "default",
      });
    }
    
    // If no user after 7 seconds, redirect to login
    const timer = setTimeout(() => {
      if (!user) {
        navigate("/login");
      }
    }, 7000);
    
    return () => clearTimeout(timer);
  }, [user, navigate, location.search]);

  // Determine where to redirect based on role
  const getDashboardUrl = () => {
    if (!profile) return "/";
    
    switch (profile.role) {
      case "seller":
        return "/seller-dashboard";
      case "buyer":
        return "/buyer-dashboard";
      case "donor":
        return "/donor-dashboard";
      case "receiver":
        return "/receiver-dashboard";
      default:
        return "/";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <AnimatedElement>
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center pb-2">
            <AnimatedElement>
              <CheckCircle2 className="h-16 w-16 mx-auto text-green-500 mb-4" />
            </AnimatedElement>
            <AnimatedElement>
              <CardTitle className="text-2xl font-bold text-green-700">Account Confirmed!</CardTitle>
            </AnimatedElement>
          </CardHeader>
          <CardContent className="text-center pb-6">
            <AnimatedElement>
              <p className="text-gray-600 mb-4">
                Your email has been verified and your account is now active.
              </p>
              {user ? (
                <p className="font-medium text-gray-700">
                  Welcome to Waste2Worth, {profile?.full_name || user.email}!
                </p>
              ) : (
                <div className="space-y-2">
                  <p className="text-gray-600">
                    Redirecting you to login...
                  </p>
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-t-green-500 border-gray-200 rounded-full animate-spin"></div>
                  </div>
                </div>
              )}
            </AnimatedElement>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <AnimatedElement>
              {user ? (
                <Button asChild className="w-full bg-eco-primary hover:bg-eco-dark">
                  <Link to={getDashboardUrl()}>Go to Dashboard</Link>
                </Button>
              ) : (
                <Button asChild className="w-full bg-eco-primary hover:bg-eco-dark">
                  <Link to="/login">Login</Link>
                </Button>
              )}
              <Button asChild variant="outline" className="w-full hover:bg-eco-light transition-colors">
                <Link to="/">Return to Homepage</Link>
              </Button>
            </AnimatedElement>
          </CardFooter>
        </Card>
      </AnimatedElement>
    </div>
  );
};

export default AccountConfirmation;
