
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";

import Index from "./pages/Index";
import Donate from "./pages/Donate";
import Sell from "./pages/Sell";
import EcoStore from "./pages/EcoStore";
import BuyClothes from "./pages/BuyClothes";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import DonorDashboard from "./pages/dashboards/DonorDashboard";
import ReceiverDashboard from "./pages/dashboards/ReceiverDashboard";
import SellerDashboard from "./pages/dashboards/SellerDashboard";
import BuyerDashboard from "./pages/dashboards/BuyerDashboard";
import AccountConfirmation from "./pages/AccountConfirmation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/buy-clothes" element={<BuyClothes />} />
          <Route path="/eco-store" element={<EcoStore />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Make sure the route accepts query parameters */}
          <Route path="/account-confirmation" element={<AccountConfirmation />} />
          
          <Route path="/donor-dashboard" element={<DonorDashboard />} />
          <Route path="/receiver-dashboard" element={<ReceiverDashboard />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
          <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
