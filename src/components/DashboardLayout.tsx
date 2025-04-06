
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Spinner } from "@/components/ui/spinner";

interface DashboardLayoutProps {
  children: ReactNode;
  requiredRole?: string;
}

const DashboardLayout = ({ children, requiredRole }: DashboardLayoutProps) => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If role is required and doesn't match, redirect to home
  if (requiredRole && profile && profile.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
