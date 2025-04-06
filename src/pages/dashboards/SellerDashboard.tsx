
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { CircleDollarSign, TrendingUp, ShoppingCart } from "lucide-react";

const SellerDashboard = () => {
  const { profile } = useAuth();
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchListings = async () => {
      if (!profile) return;
      
      try {
        const { data, error } = await supabase
          .from('items_for_sale')
          .select('*')
          .eq('seller_id', profile.id)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        setListings(data || []);
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchListings();
  }, [profile]);

  // Calculate total earnings from sold items
  const totalEarnings = listings
    .filter(item => item.status === 'sold')
    .reduce((sum, item) => sum + Number(item.price), 0);

  // Count sold items
  const soldItems = listings.filter(item => item.status === 'sold').length;
  
  return (
    <DashboardLayout requiredRole="seller">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Seller Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {profile?.full_name || profile?.username || 'Seller'}! Manage your listings and sales.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <CircleDollarSign className="h-4 w-4 text-eco-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalEarnings.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">From sold items</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Eco Points</CardTitle>
              <TrendingUp className="h-4 w-4 text-eco-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profile?.points || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">Earned from recycling</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Items Sold</CardTitle>
              <ShoppingCart className="h-4 w-4 text-eco-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{soldItems}</div>
              <p className="text-xs text-muted-foreground mt-1">Total items sold</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Your Listings</h2>
          <Button className="bg-eco-primary hover:bg-eco-dark">
            Add New Listing
          </Button>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Listed Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      Loading listings...
                    </TableCell>
                  </TableRow>
                ) : listings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      You haven't listed any items for sale yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  listings.map((listing) => (
                    <TableRow key={listing.id}>
                      <TableCell className="font-medium">{listing.title}</TableCell>
                      <TableCell>{listing.category}</TableCell>
                      <TableCell>${Number(listing.price).toFixed(2)}</TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${listing.status === 'available' ? 'bg-green-100 text-green-800' : 
                           listing.status === 'sold' ? 'bg-blue-100 text-blue-800' : 
                           'bg-yellow-100 text-yellow-800'}`}>
                          {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(listing.created_at).toLocaleDateString()}
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

export default SellerDashboard;
