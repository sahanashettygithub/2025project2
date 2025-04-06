
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Calendar, Weight, PackageCheck, Filter, Phone } from "lucide-react";

const BuyClothes = () => {
  const [isContacting, setIsContacting] = useState(false);
  const { toast } = useToast();

  const clothesListings = [
    {
      id: 1,
      title: "Men's Casual Wear Bundle",
      description: "Collection of men's shirts, t-shirts, and jeans in good condition",
      weight: 5.5,
      location: "Downtown Area, City",
      distance: "2.3 km",
      date: "2025-04-10",
      timeWindow: "10:00 AM - 2:00 PM",
      condition: "Good",
      seller: {
        name: "Alex Johnson",
        rating: 4.8,
        totalSales: 12
      },
      images: ["https://placehold.co/300x300/e2f0d9/1d4d25?text=Men's+Bundle"]
    },
    {
      id: 2,
      title: "Mixed Children's Clothing",
      description: "Various children's clothes, ages 3-6, light wear and tear but good condition",
      weight: 3.2,
      location: "North Suburb, City",
      distance: "4.7 km",
      date: "2025-04-12",
      timeWindow: "9:00 AM - 12:00 PM",
      condition: "Good",
      seller: {
        name: "Sarah Miller",
        rating: 4.6,
        totalSales: 8
      },
      images: ["https://placehold.co/300x300/d9e6f2/254a77?text=Kids+Clothes"]
    },
    {
      id: 3,
      title: "Women's Winter Collection",
      description: "Winter jackets, sweaters, and some accessories, minimal usage",
      weight: 7.8,
      location: "East District, City",
      distance: "3.1 km",
      date: "2025-04-08",
      timeWindow: "2:00 PM - 6:00 PM",
      condition: "Like New",
      seller: {
        name: "Emma Wilson",
        rating: 4.9,
        totalSales: 15
      },
      images: ["https://placehold.co/300x300/f2e2d9/774425?text=Winter+Collection"]
    },
    {
      id: 4,
      title: "Mixed Fabric Remnants",
      description: "Assorted fabric pieces and damaged clothing suitable for recycling projects",
      weight: 10.5,
      location: "West End, City",
      distance: "5.8 km",
      date: "2025-04-15",
      timeWindow: "11:00 AM - 4:00 PM",
      condition: "Fair",
      seller: {
        name: "David Chen",
        rating: 4.7,
        totalSales: 20
      },
      images: ["https://placehold.co/300x300/e2d9f2/472577?text=Fabric+Remnants"]
    }
  ];

  const handleContact = (listing) => {
    setIsContacting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsContacting(false);
      toast({
        title: "Request sent!",
        description: `You've contacted ${listing.seller.name} about "${listing.title}". They will be notified shortly.`,
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-eco-primary">Buy Used Clothing For Recycling</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Connect with sellers in your area to buy used clothes for your recycling factory.
              Help reduce textile waste while sourcing materials for your eco-friendly products.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters column */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" /> Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <div className="flex gap-2">
                      <Input placeholder="Enter your location" className="flex-1" />
                      <Button variant="outline" size="icon">
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </div>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Distance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">Within 5 km</SelectItem>
                        <SelectItem value="10">Within 10 km</SelectItem>
                        <SelectItem value="25">Within 25 km</SelectItem>
                        <SelectItem value="50">Within 50 km</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Minimum Weight</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Any weight" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any weight</SelectItem>
                        <SelectItem value="5">5+ kg</SelectItem>
                        <SelectItem value="10">10+ kg</SelectItem>
                        <SelectItem value="25">25+ kg</SelectItem>
                        <SelectItem value="50">50+ kg</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Condition</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Any condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any condition</SelectItem>
                        <SelectItem value="new">Like New</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="worn">Worn</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="pt-2">
                    <Button className="w-full bg-eco-primary hover:bg-eco-dark">
                      Apply Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Buyer Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium">My Recycling Factory</h4>
                    <p className="text-sm text-muted-foreground">EcoFabric Solutions</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Factory Address</h4>
                    <p className="text-sm text-muted-foreground">
                      123 Green Industrial Park, <br />
                      Sustainability District, <br />
                      Eco City
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Total Collected</h4>
                    <p className="text-sm font-bold">1,250 kg</p>
                    <p className="text-xs text-muted-foreground">(Last 30 days)</p>
                  </div>
                  <Button variant="outline" className="w-full">
                    Update Profile
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Listings column */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="available">
                <TabsList className="mb-6">
                  <TabsTrigger value="available">Available Listings</TabsTrigger>
                  <TabsTrigger value="scheduled">Scheduled Pickups</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                
                <TabsContent value="available" className="space-y-6">
                  {clothesListings.map((listing) => (
                    <Card key={listing.id}>
                      <div className="lg:flex">
                        <div className="lg:w-1/3 aspect-square">
                          <img 
                            src={listing.images[0]} 
                            alt={listing.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="lg:w-2/3">
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle>{listing.title}</CardTitle>
                                <CardDescription className="mt-1">{listing.description}</CardDescription>
                              </div>
                              <Badge variant="outline" className="bg-eco-light text-eco-primary">
                                {listing.condition}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div className="flex items-center gap-2">
                                <Weight className="h-4 w-4 text-muted-foreground" />
                                <span>{listing.weight} kg</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>{listing.location} ({listing.distance})</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>{new Date(listing.date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <PackageCheck className="h-4 w-4 text-muted-foreground" />
                                <span>Available: {listing.timeWindow}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center mt-2 pt-2 border-t">
                              <div className="text-sm">
                                <span className="font-medium">Seller: </span>
                                <span>{listing.seller.name}</span>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <span>★ {listing.seller.rating}</span>
                                  <span>•</span>
                                  <span>{listing.seller.totalSales} sales</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <div className="grid grid-cols-2 gap-4 w-full">
                              <Button
                                variant="outline"
                                className="flex gap-2"
                                onClick={() => handleContact(listing)}
                                disabled={isContacting}
                              >
                                <Phone className="h-4 w-4" />
                                <span>Contact Seller</span>
                              </Button>
                              <Button 
                                className="bg-eco-primary hover:bg-eco-dark"
                                onClick={() => {
                                  toast({
                                    title: "Pickup request sent!",
                                    description: `You've scheduled a pickup for "${listing.title}". Please coordinate with the seller.`,
                                  });
                                }}
                              >
                                Schedule Pickup
                              </Button>
                            </div>
                          </CardFooter>
                        </div>
                      </div>
                    </Card>
                  ))}
                  
                  <div className="mt-10 flex justify-center">
                    <Button variant="outline" className="mx-2">Previous</Button>
                    <Button variant="outline" className="bg-eco-primary text-white mx-2">1</Button>
                    <Button variant="outline" className="mx-2">2</Button>
                    <Button variant="outline" className="mx-2">Next</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="scheduled">
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium">No scheduled pickups</h3>
                    <p className="text-muted-foreground mt-2">
                      You currently don't have any scheduled pickups. 
                      Browse available listings and schedule some pickups.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="completed">
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium">No completed pickups</h3>
                    <p className="text-muted-foreground mt-2">
                      You haven't completed any pickups yet. 
                      Your completed pickups will appear here.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BuyClothes;
