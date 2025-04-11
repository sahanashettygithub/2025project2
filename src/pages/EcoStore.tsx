
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, ShoppingBag, Recycle } from "lucide-react";

const EcoStore = () => {
  const [priceRange, setPriceRange] = useState([0, 100]);
  
  // Updated recycled clothing products with more clothing-focused images
  const products = [
    {
      id: 1,
      name: "Recycled Cotton T-Shirt",
      description: "Made from 100% recycled cotton fabric",
      price: 24.99,
      discountPrice: 19.99,
      category: "Clothing",
      ecoPoints: 5,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500",
      materials: "100% Recycled Cotton"
    },
    {
      id: 2,
      name: "Upcycled Denim Jacket",
      description: "Created from recycled denim materials",
      price: 59.99,
      discountPrice: 45.99,
      category: "Clothing",
      ecoPoints: 15,
      image: "https://images.unsplash.com/photo-1552331704-0b9bfa8c8591?q=80&w=500",
      materials: "Recycled Denim"
    },
    {
      id: 3,
      name: "Eco-friendly Scarf",
      description: "Handmade from recycled textile waste",
      price: 19.99,
      discountPrice: 14.99,
      category: "Accessories",
      ecoPoints: 8,
      image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=500",
      materials: "Mixed Recycled Fibers"
    },
    {
      id: 4,
      name: "Recycled Polyester Backpack",
      description: "Made from plastic bottles converted to polyester",
      price: 49.99,
      discountPrice: 39.99,
      category: "Accessories",
      ecoPoints: 12,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=500",
      materials: "Recycled Polyester from PET"
    },
    {
      id: 5,
      name: "Upcycled Fabric Tote Bag",
      description: "Created from fabric remnants and textile waste",
      price: 29.99,
      discountPrice: 22.99,
      category: "Accessories",
      ecoPoints: 10,
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=500",
      materials: "Recycled Mixed Fabrics"
    },
    {
      id: 6,
      name: "Recycled Wool Sweater",
      description: "Cozy sweater made from recycled wool fibers",
      price: 74.99,
      discountPrice: 59.99,
      category: "Clothing",
      ecoPoints: 20,
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=500",
      materials: "Recycled Wool"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-eco-primary">Eco Store</h1>
              <p className="text-muted-foreground">Shop sustainable products made from recycled clothing</p>
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-sm font-medium">Your Eco Points: </p>
              <Badge variant="outline" className="bg-eco-light text-eco-primary font-bold">
                45 points
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="md:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Filter className="h-5 w-5" /> 
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search products" className="pl-10" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                        <SelectItem value="home">Home Goods</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Materials</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All Materials" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Materials</SelectItem>
                        <SelectItem value="recycled-cotton">Recycled Cotton</SelectItem>
                        <SelectItem value="recycled-polyester">Recycled Polyester</SelectItem>
                        <SelectItem value="recycled-denim">Recycled Denim</SelectItem>
                        <SelectItem value="recycled-wool">Recycled Wool</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Price Range</label>
                      <span className="text-sm text-muted-foreground">
                        ${priceRange[0]} - ${priceRange[1]}
                      </span>
                    </div>
                    <Slider
                      defaultValue={[0, 100]}
                      max={100}
                      step={5}
                      value={priceRange}
                      onValueChange={(value) => setPriceRange(value)}
                      className="py-4"
                    />
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
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Recycle className="h-5 w-5" />
                    About Our Products
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    All items in our eco store are made from recycled clothing materials. 
                    By shopping here, you're supporting sustainable fashion and reducing textile waste.
                  </p>
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium text-sm mb-2">How it works:</h4>
                    <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                      <li>Sellers provide used clothes</li>
                      <li>Buyers purchase and recycle them</li>
                      <li>New sustainable products are created</li>
                      <li>You shop with eco points discounts!</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Products Grid */}
            <div className="md:col-span-2 lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Card key={product.id} className="overflow-hidden flex flex-col h-full">
                    <div className="aspect-square relative overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="object-cover w-full h-full transition-transform hover:scale-105"
                        loading="lazy"
                      />
                      {product.ecoPoints > 0 && (
                        <Badge className="absolute top-3 right-3 bg-eco-primary">
                          {product.ecoPoints} eco points discount
                        </Badge>
                      )}
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2 flex-grow">
                      <p className="text-sm text-muted-foreground">Materials: {product.materials}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center border-t pt-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold">${product.discountPrice}</span>
                          <span className="text-sm text-muted-foreground line-through">${product.price}</span>
                        </div>
                      </div>
                      <Button size="sm" className="bg-eco-primary hover:bg-eco-dark">
                        <ShoppingBag className="h-4 w-4 mr-2" /> Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              <div className="mt-10 flex justify-center">
                <Button variant="outline" className="mx-2">Previous</Button>
                <Button variant="outline" className="bg-eco-primary text-white mx-2">1</Button>
                <Button variant="outline" className="mx-2">2</Button>
                <Button variant="outline" className="mx-2">3</Button>
                <Button variant="outline" className="mx-2">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EcoStore;
