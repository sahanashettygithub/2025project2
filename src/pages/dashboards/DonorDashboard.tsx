
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Gift, Award, BarChart3 } from "lucide-react";

const DonorDashboard = () => {
  const { profile } = useAuth();
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      if (!profile) return;
      
      try {
        const { data, error } = await supabase
          .from('donated_items')
          .select('*')
          .eq('donor_id', profile.id)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        setDonations(data || []);
      } catch (error) {
        console.error('Error fetching donations:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDonations();
  }, [profile]);

  return (
    <DashboardLayout requiredRole="donor">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Donor Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {profile?.full_name || profile?.username || 'Donor'}! Manage your donations and impact.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
              <Gift className="h-4 w-4 text-eco-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{donations.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Items donated</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Eco Points</CardTitle>
              <Award className="h-4 w-4 text-eco-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profile?.points || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">Earned from donations</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Environmental Impact</CardTitle>
              <BarChart3 className="h-4 w-4 text-eco-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{donations.length * 2.5} kg</div>
              <p className="text-xs text-muted-foreground mt-1">CO₂ emissions saved</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Your Donations</h2>
          <Button className="bg-eco-primary hover:bg-eco-dark">
            Donate New Item
          </Button>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      Loading donations...
                    </TableCell>
                  </TableRow>
                ) : donations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      You haven't donated any items yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  donations.map((donation) => (
                    <TableRow key={donation.id}>
                      <TableCell className="font-medium">{donation.title}</TableCell>
                      <TableCell>{donation.category}</TableCell>
                      <TableCell>{donation.condition}</TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${donation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                           donation.status === 'claimed' ? 'bg-green-100 text-green-800' : 
                           'bg-blue-100 text-blue-800'}`}>
                          {donation.status === 'pending' ? 'Pending' : 
                           donation.status === 'claimed' ? 'Claimed' : 'Processing'}
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(donation.created_at).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DonorDashboard;
