
import { useState, useEffect } from "react";
import { Utensils, ShoppingBag, Leaf } from "lucide-react";
import { AnimatedElement } from "./AnimatedElement";

type CounterProps = {
  end: number;
  suffix: string;
  duration?: number;
};

const Counter = ({ end, suffix, duration = 2000 }: CounterProps) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;
    
    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Use easeOutQuad for smoother counter animation
      const easing = 1 - Math.pow(1 - percentage, 2);
      setCount(Math.floor(easing * end));
      
      if (progress < duration) {
        animationFrameId = requestAnimationFrame(updateCount);
      }
    };
    
    animationFrameId = requestAnimationFrame(updateCount);
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration]);

  return (
    <span className="text-4xl font-bold text-eco-primary">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const ImpactCounter = () => {
  return (
    <section className="py-20 bg-muted overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedElement>
          <div className="text-center mb-12">
            <h2 className="section-title">Our Impact</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Together, we're making significant progress in reducing waste and supporting communities. 
              Here's our impact so far:
            </p>
          </div>
        </AnimatedElement>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <AnimatedElement>
            <div className="eco-card">
              <div className="w-16 h-16 mx-auto rounded-full bg-eco-light flex items-center justify-center mb-4">
                <Utensils className="h-8 w-8 text-eco-primary" />
              </div>
              <Counter end={5280} suffix="kg" duration={2500} />
              <p className="mt-2 text-muted-foreground">Food Donated</p>
            </div>
          </AnimatedElement>
          
          <AnimatedElement>
            <div className="eco-card">
              <div className="w-16 h-16 mx-auto rounded-full bg-eco-light flex items-center justify-center mb-4">
                <ShoppingBag className="h-8 w-8 text-eco-primary" />
              </div>
              <Counter end={8750} suffix="kg" duration={2500} />
              <p className="mt-2 text-muted-foreground">Clothes Recycled</p>
            </div>
          </AnimatedElement>
          
          <AnimatedElement>
            <div className="eco-card">
              <div className="w-16 h-16 mx-auto rounded-full bg-eco-light flex items-center justify-center mb-4">
                <Leaf className="h-8 w-8 text-eco-primary" />
              </div>
              <Counter end={3120} suffix="kg" duration={2500} />
              <p className="mt-2 text-muted-foreground">Vegetable Waste Composted</p>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
};

export default ImpactCounter;
