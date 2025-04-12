
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Gift, ShoppingBag } from "lucide-react";
import { AnimatedElement } from "./AnimatedElement";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-eco-light to-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <AnimatedElement>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Turn Your <span className="text-eco-primary">Waste</span> Into <span className="text-eco-primary">Worth</span>
              </h1>
            </AnimatedElement>
            
            <AnimatedElement>
              <p className="text-lg text-muted-foreground mb-8">
                Join our circular economy platform to donate food and clothes, recycle vegetable waste, 
                or sell your old clothes to recycling factories—all while earning eco points.
              </p>
            </AnimatedElement>
            
            <AnimatedElement>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/donate">
                  <Button className="bg-eco-primary hover:bg-eco-dark py-6 px-8 text-lg flex gap-2 w-full sm:w-auto justify-center">
                    <Gift className="h-5 w-5" />
                    <span>Donate Now</span>
                  </Button>
                </Link>
                <Link to="/sell">
                  <Button variant="outline" className="border-eco-primary text-eco-primary hover:bg-eco-light py-6 px-8 text-lg flex gap-2 w-full sm:w-auto justify-center">
                    <ShoppingBag className="h-5 w-5" />
                    <span>Sell Clothes</span>
                  </Button>
                </Link>
              </div>
            </AnimatedElement>
          </div>
          
          <div className="hidden lg:block">
            <div className="relative">
              <div className="relative z-10 grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <AnimatedElement>
                    <div className="rounded-xl overflow-hidden shadow-lg">
                      <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" alt="Recycling technology" className="w-full h-48 object-cover" />
                    </div>
                  </AnimatedElement>
                  <AnimatedElement>
                    <div className="rounded-xl overflow-hidden shadow-lg">
                      <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" alt="Nature" className="w-full h-64 object-cover" />
                    </div>
                  </AnimatedElement>
                </div>
                <div className="space-y-4 mt-8">
                  <AnimatedElement>
                    <div className="rounded-xl overflow-hidden shadow-lg">
                      <img src="https://images.unsplash.com/photo-1501854140801-50d01698950b" alt="Sustainable environment" className="w-full h-64 object-cover" />
                    </div>
                  </AnimatedElement>
                  <AnimatedElement>
                    <div className="rounded-xl overflow-hidden shadow-lg">
                      <img src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07" alt="Flowers" className="w-full h-48 object-cover" />
                    </div>
                  </AnimatedElement>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
