
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { ShoppingBag, Recycle, CircleDollarSign } from "lucide-react";

const BuyerDashboard = () => {
  const { profile } = useAuth();
  const [purchases, setPurchases] = useState<any[]>([]);
  const [availableItems, setAvailableItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      if (!profile) return;
      
      try {
        setLoading(true);
        
        // Fetch items bought by this user
        const { data: bought, error: boughtError } = await supabase
          .from('items_for_sale')
          .select('*')
          .eq('buyer_id', profile.id)
          .order('created_at', { ascending: false });
          
        if (boughtError) throw boughtError;
        setPurchases(bought || []);
        
        // Fetch available items for sale
        const { data: available, error: availableError } = await supabase
          .from('items_for_sale')
          .select('*')
          .eq('status', 'available')
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

  // Calculate total spent on purchases
  const totalSpent = purchases.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <DashboardLayout requiredRole="buyer">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Buyer Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {profile?.full_name || profile?.username || 'Buyer'}! Browse recyclable clothes and manage your purchases.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Purchases</CardTitle>
              <ShoppingBag className="h-4 w-4 text-eco-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{purchases.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Items purchased</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Amount Spent</CardTitle>
              <CircleDollarSign className="h-4 w-4 text-eco-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">Total investment</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Environmental Impact</CardTitle>
              <Recycle className="h-4 w-4 text-eco-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{purchases.length * 5} kg</div>
              <p className="text-xs text-muted-foreground mt-1">CO₂ emissions saved</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Available Items</h2>
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
                  <TableHead>Price</TableHead>
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
                      No items available for purchase at the moment.
                    </TableCell>
                  </TableRow>
                ) : (
                  availableItems.slice(0, 5).map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.condition}</TableCell>
                      <TableCell>${Number(item.price).toFixed(2)}</TableCell>
                      <TableCell>
                        <Button size="sm" className="bg-eco-primary hover:bg-eco-dark">
                          Buy Now
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
          <h2 className="text-xl font-semibold">Your Purchases</h2>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Purchase Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      Loading your purchases...
                    </TableCell>
                  </TableRow>
                ) : purchases.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      You haven't purchased any items yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  purchases.map((purchase) => (
                    <TableRow key={purchase.id}>
                      <TableCell className="font-medium">{purchase.title}</TableCell>
                      <TableCell>{purchase.category}</TableCell>
                      <TableCell>${Number(purchase.price).toFixed(2)}</TableCell>
                      <TableCell>
                        {new Date(purchase.updated_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Purchased
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

export default BuyerDashboard;
