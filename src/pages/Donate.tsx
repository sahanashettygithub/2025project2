
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, MapPin, Image, Clock, AlertCircle } from "lucide-react";
import { format } from "date-fns";

const DonationForm = ({ type }: { type: string }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    type === "food" ? new Date() : undefined
  );
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
        title: "Donation submitted successfully!",
        description: "Thank you for your generosity. A receiver will contact you soon.",
      });
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" placeholder={`${type === "food" ? "e.g., Leftover catering food" : type === "clothes" ? "e.g., Winter clothes" : "e.g., Kitchen vegetable waste"}`} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          placeholder={`Describe your ${type} donation in detail`} 
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={`Select ${type} category`} />
            </SelectTrigger>
            <SelectContent>
              {type === "food" ? (
                <>
                  <SelectItem value="cooked">Cooked Food</SelectItem>
                  <SelectItem value="packaged">Packaged Food</SelectItem>
                  <SelectItem value="grains">Grains & Cereals</SelectItem>
                  <SelectItem value="produce">Fresh Produce</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </>
              ) : type === "clothes" ? (
                <>
                  <SelectItem value="men">Men's Clothing</SelectItem>
                  <SelectItem value="women">Women's Clothing</SelectItem>
                  <SelectItem value="children">Children's Clothing</SelectItem>
                  <SelectItem value="winter">Winter Wear</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="kitchen">Kitchen Scraps</SelectItem>
                  <SelectItem value="garden">Garden Waste</SelectItem>
                  <SelectItem value="fruits">Fruit Peels</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">{type === "vegetable" ? "Quantity (in kg)" : "Quantity"}</Label>
          <div className="grid grid-cols-2 gap-4">
            <Input 
              id="quantity" 
              type="number" 
              placeholder="Amount"
              min="1"
              required
            />
            {type !== "vegetable" && (
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  {type === "food" ? (
                    <>
                      <SelectItem value="kg">Kilograms</SelectItem>
                      <SelectItem value="servings">Servings</SelectItem>
                      <SelectItem value="items">Items</SelectItem>
                      <SelectItem value="packages">Packages</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="items">Items</SelectItem>
                      <SelectItem value="bags">Bags</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </div>

      {type === "food" && (
        <div className="space-y-2">
          <Label>Expiry Date</Label>
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? (
                    format(selectedDate, "PPP")
                  ) : (
                    <span>Select expiry date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-start gap-2 text-sm text-amber-600">
            <AlertCircle className="h-4 w-4" />
            <p>For food safety, please only donate items that haven't expired</p>
          </div>
        </div>
      )}

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
      </div>

      {type === "vegetable" && (
        <div className="space-y-2">
          <Label htmlFor="preferredReceiver">Preferred Receiver</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Who should receive this waste?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="farm">Farms for Composting</SelectItem>
              <SelectItem value="goshala">Goshala for Animal Feed</SelectItem>
              <SelectItem value="composting">Composting Center</SelectItem>
              <SelectItem value="any">Any Receiver</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-2">
        <Label>Pickup Availability</Label>
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

      <div className="pt-4">
        <Button 
          type="submit" 
          className="w-full bg-eco-primary hover:bg-eco-dark py-6"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : `Donate ${type}`}
        </Button>
      </div>
    </form>
  );
};

const Donate = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-eco-primary">Make a Donation</h1>
            <p className="text-muted-foreground mt-2">
              Your generosity helps reduce waste and supports those in need
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>What would you like to donate?</CardTitle>
              <CardDescription>
                Choose the type of donation you'd like to make below
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="food">
                <TabsList className="grid grid-cols-3 mb-8">
                  <TabsTrigger value="food">Food</TabsTrigger>
                  <TabsTrigger value="clothes">Clothes</TabsTrigger>
                  <TabsTrigger value="vegetable">Vegetable Waste</TabsTrigger>
                </TabsList>
                <TabsContent value="food">
                  <DonationForm type="food" />
                </TabsContent>
                <TabsContent value="clothes">
                  <DonationForm type="clothes" />
                </TabsContent>
                <TabsContent value="vegetable">
                  <DonationForm type="vegetable" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Donate;
