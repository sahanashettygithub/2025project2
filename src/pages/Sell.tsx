
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, MapPin, Image, Clock, AlertCircle } from "lucide-react";
import { format } from "date-fns";

const Sell = () => {
  const [pickupDate, setPickupDate] = useState<Date | undefined>();
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // In a real app, we'd upload these to a server and get back URLs
    // For this demo, we're just creating object URLs
    const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Clothing sale listing submitted!",
        description: "You'll earn 10 Eco Points for each kg once collected. Buyers will contact you soon.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-eco-primary">Sell Your Old Clothes</h1>
            <p className="text-muted-foreground mt-2">
              Convert your old clothes into eco points and help recycling factories create new products
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-eco-light flex items-center justify-center">
                    <span className="text-eco-primary font-bold">1</span>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-center mb-2">List Your Clothes</h3>
                <p className="text-center text-muted-foreground text-sm">
                  Fill in details about your old clothes, their condition, weight, and upload photos
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-eco-light flex items-center justify-center">
                    <span className="text-eco-primary font-bold">2</span>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-center mb-2">Schedule Pickup</h3>
                <p className="text-center text-muted-foreground text-sm">
                  Buyers will contact you to arrange a convenient pickup time
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-eco-light flex items-center justify-center">
                    <span className="text-eco-primary font-bold">3</span>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-center mb-2">Earn Eco Points</h3>
                <p className="text-center text-muted-foreground text-sm">
                  Get 10 eco points per kg of clothes that you sell, redeemable in our eco store
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sell Old Clothes</CardTitle>
              <CardDescription>
                Please provide details about the clothes you want to sell for recycling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="e.g., Men's Casual Wear Bundle" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe the types of clothes, their condition, etc." 
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select required>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select clothing category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mens">Men's Clothing</SelectItem>
                        <SelectItem value="womens">Women's Clothing</SelectItem>
                        <SelectItem value="kids">Children's Clothing</SelectItem>
                        <SelectItem value="mixed">Mixed Clothing</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight">Approximate Weight (kg)</Label>
                    <Input 
                      id="weight" 
                      type="number" 
                      placeholder="Enter weight in kg"
                      min="1"
                      step="0.5"
                      required
                    />
                    <p className="text-xs text-muted-foreground">You'll earn 10 eco points per kg</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="condition">Condition</Label>
                  <Select required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Like New</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="worn">Worn</SelectItem>
                      <SelectItem value="damaged">Damaged/Torn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Pickup Address</Label>
                  <div className="flex gap-2">
                    <Input id="address" placeholder="Enter your address" className="flex-1" required />
                    <Button type="button" variant="outline" className="flex gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>Map</span>
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Preferred Pickup Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {pickupDate ? (
                          format(pickupDate, "PPP")
                        ) : (
                          <span>Select date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={pickupDate}
                        onSelect={setPickupDate}
                        initialFocus
                        disabled={(date) => {
                          const today = new Date();
                          return date < today;
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Pickup Time Window</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="From" />
                        </SelectTrigger>
                        <SelectContent>
                          {[...Array(24)].map((_, i) => (
                            <SelectItem key={i} value={`${i}:00`}>
                              {i === 0 ? "12:00 AM" : i < 12 ? `${i}:00 AM` : i === 12 ? "12:00 PM" : `${i - 12}:00 PM`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="To" />
                        </SelectTrigger>
                        <SelectContent>
                          {[...Array(24)].map((_, i) => (
                            <SelectItem key={i} value={`${i}:00`}>
                              {i === 0 ? "12:00 AM" : i < 12 ? `${i}:00 AM` : i === 12 ? "12:00 PM" : `${i - 12}:00 PM`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="images">Upload Images</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-input rounded-md hover:border-primary cursor-pointer">
                      <input type="file" className="hidden" accept="image/*" multiple onChange={handleImageChange} />
                      <Image className="h-8 w-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">Add Photos</span>
                    </label>
                    
                    {images.map((img, i) => (
                      <div key={i} className="relative h-32 rounded-md overflow-hidden">
                        <img src={img} alt={`Upload ${i + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Add clear photos showing the clothes you want to sell
                  </p>
                </div>

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-eco-primary hover:bg-eco-dark py-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "List Your Clothes for Sale"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sell;
