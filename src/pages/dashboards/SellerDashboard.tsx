
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CircleDollarSign, TrendingUp, ShoppingCart, Check } from "lucide-react";

interface ListingItem {
  id: string;
  title: string;
  category: string;
  price: number;
  status: string;
  created_at: string;
  weight?: number; // Optional weight field for eco points calculation
}

const ECO_POINTS_PER_KG = 10; // Eco points earned per kg of clothes sold

const SellerDashboard = () => {
  const { profile } = useAuth();
  const [listings, setListings] = useState<ListingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingItem, setProcessingItem] = useState<string | null>(null);
  
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

  const handleMarkAsSold = async (itemId: string, weight: number = 1) => {
    if (!profile) return;
    
    setProcessingItem(itemId);
    
    try {
      // 1. Update item status to 'sold'
      const { error: updateError } = await supabase
        .from('items_for_sale')
        .update({ status: 'sold' })
        .eq('id', itemId);
        
      if (updateError) throw updateError;
      
      // 2. Calculate eco points to award (10 points per kg)
      const ecoPointsEarned = Math.round(weight * ECO_POINTS_PER_KG);
      
      // 3. Update user's eco points
      const { error: pointsError } = await supabase
        .from('profiles')
        .update({ 
          points: (profile.points || 0) + ecoPointsEarned 
        })
        .eq('id', profile.id);
        
      if (pointsError) throw pointsError;
      
      // 4. Create a transaction record
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          seller_id: profile.id,
          item_id: itemId,
          transaction_type: 'sale',
          points: ecoPointsEarned,
          status: 'completed'
        });
        
      if (transactionError) throw transactionError;
      
      // 5. Update local state
      setListings(listings.map(item => 
        item.id === itemId ? { ...item, status: 'sold' } : item
      ));
      
      // 6. Show success message
      toast({
        title: "Item marked as sold!",
        description: `You've earned ${ecoPointsEarned} eco points for recycling this item.`,
      });
      
    } catch (error: any) {
      console.error('Error marking item as sold:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to process sale",
        variant: "destructive"
      });
    } finally {
      setProcessingItem(null);
    }
  };

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
              <p className="text-xs text-muted-foreground mt-1">Earned from recycling clothes</p>
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
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      Loading listings...
                    </TableCell>
                  </TableRow>
                ) : listings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
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
                      <TableCell>
                        {listing.status === 'available' && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex items-center gap-1"
                            onClick={() => handleMarkAsSold(listing.id, listing.weight || 1)}
                            disabled={processingItem === listing.id}
                          >
                            {processingItem === listing.id ? (
                              <span>Processing...</span>
                            ) : (
                              <>
                                <Check className="h-4 w-4" /> 
                                <span>Mark Sold</span>
                              </>
                            )}
                          </Button>
                        )}
                        {listing.status === 'sold' && (
                          <span className="text-sm text-muted-foreground">
                            Eco points earned
                          </span>
                        )}
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
