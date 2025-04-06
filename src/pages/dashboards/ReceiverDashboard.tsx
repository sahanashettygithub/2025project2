
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { ShoppingBag, Package, Calendar } from "lucide-react";

interface DonationItem {
  id: string;
  title: string;
  category: string;
  condition: string;
  status: string;
  created_at: string;
}

const ReceiverDashboard = () => {
  const { profile } = useAuth();
  const [receivedItems, setReceivedItems] = useState<DonationItem[]>([]);
  const [availableItems, setAvailableItems] = useState<DonationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      if (!profile) return;
      
      try {
        setLoading(true);
        
        // Fetch items received by this user
        const { data: received, error: receivedError } = await supabase
          .from('donated_items')
          .select('*')
          .eq('receiver_id', profile.id)
          .order('created_at', { ascending: false });
          
        if (receivedError) throw receivedError;
        setReceivedItems(received || []);
        
        // Fetch available donations
        const { data: available, error: availableError } = await supabase
          .from('donated_items')
          .select('*')
          .eq('status', 'pending')
          .order('created_at', { ascending: false });
          
        if (availableError) throw availableError;
        setAvailableItems(available || []);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchItems();
  }, [profile]);

  return (
    <DashboardLayout requiredRole="receiver">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Receiver Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {profile?.full_name || profile?.username || 'Receiver'}! Browse and manage donations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Items Received</CardTitle>
              <ShoppingBag className="h-4 w-4 text-eco-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{receivedItems.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Total received items</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Available Items</CardTitle>
              <Package className="h-4 w-4 text-eco-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{availableItems.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Items available to claim</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Last Claim</CardTitle>
              <Calendar className="h-4 w-4 text-eco-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {receivedItems.length > 0 
                  ? new Date(receivedItems[0].created_at).toLocaleDateString() 
                  : "No claims yet"}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Most recent claim</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Available Donations</h2>
          <Button className="bg-eco-primary hover:bg-eco-dark">
            Browse All
          </Button>
        </div>
        
        <Card className="mb-8">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Added</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      Loading available items...
                    </TableCell>
                  </TableRow>
                ) : availableItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      No available donations at the moment.
                    </TableCell>
                  </TableRow>
                ) : (
                  availableItems.slice(0, 5).map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.condition}</TableCell>
                      <TableCell>
                        {new Date(item.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button size="sm" className="bg-eco-primary hover:bg-eco-dark">
                          Claim
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Your Claimed Items</h2>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Claimed Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      Loading your items...
                    </TableCell>
                  </TableRow>
                ) : receivedItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      You haven't claimed any items yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  receivedItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.condition}</TableCell>
                      <TableCell>
                        {new Date(item.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Claimed
                        </div>
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

export default ReceiverDashboard;
