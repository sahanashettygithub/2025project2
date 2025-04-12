
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const AccountConfirmation = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If no user after 5 seconds, redirect to login
    const timer = setTimeout(() => {
      if (!user) {
        navigate("/login");
      }
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [user, navigate]);

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center pb-2">
          <CheckCircle2 className="h-16 w-16 mx-auto text-green-500 mb-2" />
          <CardTitle className="text-2xl font-bold text-green-700">Account Confirmed!</CardTitle>
        </CardHeader>
        <CardContent className="text-center pb-6">
          <p className="text-gray-600 mb-4">
            Your email has been verified and your account is now active.
          </p>
          {user ? (
            <p className="text-gray-600">
              Welcome to Waste2Worth, {profile?.full_name || user.email}!
            </p>
          ) : (
            <p className="text-gray-600">
              Redirecting you to login...
            </p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          {user ? (
            <Button asChild className="w-full bg-eco-primary hover:bg-eco-dark">
              <Link to={getDashboardUrl()}>Go to Dashboard</Link>
            </Button>
          ) : (
            <Button asChild className="w-full bg-eco-primary hover:bg-eco-dark">
              <Link to="/login">Login</Link>
            </Button>
          )}
          <Button asChild variant="outline" className="w-full">
            <Link to="/">Return to Homepage</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AccountConfirmation;
