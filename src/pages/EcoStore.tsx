
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Search, Filter, SlidersHorizontal } from "lucide-react";

// Sample product data
const allProducts = [
  {
    id: 1,
    name: "Recycled Cotton T-Shirt",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=500",
    originalPrice: 29.99,
    discountedPrice: 23.99,
    ecoPoints: 10,
    category: "Clothing"
  },
  {
    id: 2,
    name: "Upcycled Denim Tote Bag",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=500",
    originalPrice: 34.99,
    discountedPrice: 27.99,
    ecoPoints: 15,
    category: "Accessories"
  },
  {
    id: 3,
    name: "Recycled Paper Notebook Set",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=500",
    originalPrice: 19.99,
    discountedPrice: 15.99,
    ecoPoints: 8,
    category: "Stationery"
  },
  {
    id: 4,
    name: "Eco-Friendly Water Bottle",
    image: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?q=80&w=500",
    originalPrice: 24.99,
    discountedPrice: 19.99,
    ecoPoints: 12,
    category: "Home"
  },
  {
    id: 5,
    name: "Recycled Polyester Backpack",
    image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?q=80&w=500",
    originalPrice: 49.99,
    discountedPrice: 39.99,
    ecoPoints: 20,
    category: "Accessories"
  },
  {
    id: 6,
    name: "Plant-Based Phone Case",
    image: "https://images.unsplash.com/photo-1541480601022-2308c0f02487?q=80&w=500",
    originalPrice: 19.99,
    discountedPrice: 15.99,
    ecoPoints: 5,
    category: "Electronics"
  },
  {
    id: 7,
    name: "Upcycled Fabric Cushion Cover",
    image: "https://images.unsplash.com/photo-1540638349517-3abd5afc5847?q=80&w=500",
    originalPrice: 14.99,
    discountedPrice: 11.99,
    ecoPoints: 7,
    category: "Home"
  },
  {
    id: 8,
    name: "Bamboo Toothbrush Set",
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=500",
    originalPrice: 9.99,
    discountedPrice: 7.99,
    ecoPoints: 4,
    category: "Personal Care"
  },
];

// Categories for filtering
const categories = ["All", "Clothing", "Accessories", "Home", "Stationery", "Electronics", "Personal Care"];

const EcoStore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [products, setProducts] = useState(allProducts);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  // Apply filters
  const applyFilters = () => {
    let filtered = [...allProducts];
    
    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Apply price range filter
    filtered = filtered.filter(product => 
      product.discountedPrice >= priceRange[0] && 
      product.discountedPrice <= priceRange[1]
    );
    
    setProducts(filtered);
  };

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle category selection
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  // Handle price range change
  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
  };

  // Toggle filters visibility on mobile
  const toggleFilters = () => {
    setIsFiltersVisible(!isFiltersVisible);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-eco-primary">Eco Store</h1>
            <p className="text-muted-foreground mt-2">
              Shop sustainable products made from recycled materials and use your eco points for discounts
            </p>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10"
              />
            </div>
            <Button 
              variant="outline"
              onClick={toggleFilters}
              className="ml-4 md:hidden"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters sidebar */}
            <aside 
              className={`w-full md:w-64 shrink-0 ${isFiltersVisible ? 'block' : 'hidden'} md:block`}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Filters</h3>
                    <SlidersHorizontal className="h-4 w-4" />
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Category</h4>
                      <Select 
                        value={selectedCategory} 
                        onValueChange={handleCategoryChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-3">Price Range</h4>
                      <Slider
                        defaultValue={[0, 50]}
                        max={50}
                        step={1}
                        value={priceRange}
                        onValueChange={handlePriceRangeChange}
                        className="mb-2"
                      />
                      <div className="flex items-center justify-between text-sm">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Eco Points</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">Use points for discounts</span>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={applyFilters}
                      className="w-full bg-eco-primary hover:bg-eco-dark"
                    >
                      Apply Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </aside>
            
            {/* Product grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="group">
                    <div className="eco-card h-full flex flex-col overflow-hidden hover:shadow-lg">
                      <div className="relative h-48 overflow-hidden bg-gray-100 rounded-t-lg">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-2 right-2 bg-eco-primary">
                          {product.ecoPoints} Points
                        </Badge>
                      </div>
                      <div className="p-4 flex-grow">
                        <h3 className="font-medium text-lg group-hover:text-eco-primary transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {product.category}
                        </p>
                        <div className="mt-2 flex items-center">
                          <span className="text-eco-primary font-bold">${product.discountedPrice}</span>
                          <span className="ml-2 text-sm text-muted-foreground line-through">
                            ${product.originalPrice}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 pt-0">
                        <Button className="w-full bg-eco-primary hover:bg-eco-dark flex items-center justify-center gap-2">
                          <ShoppingBag className="h-4 w-4" />
                          <span>Add to Cart</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {products.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-xl text-muted-foreground">No products found matching your criteria.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("All");
                      setPriceRange([0, 50]);
                      setProducts(allProducts);
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EcoStore;
