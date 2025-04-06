
import { Recycle, CircleDollarSign, Rabbit, Leaf } from "lucide-react";

const features = [
  {
    icon: <Gift />,
    title: "Donate Food & Clothes",
    description:
      "Share your excess food and unused clothing with those in need, reducing waste while helping your community.",
  },
  {
    icon: <Recycle />,
    title: "Recycle Vegetable Waste",
    description:
      "Turn vegetable scraps into compost or animal feed through our network of farms and goshalas.",
  },
  {
    icon: <CircleDollarSign />,
    title: "Sell Old Clothes",
    description:
      "Convert your old clothes into income by selling them to recycling factories through our platform.",
  },
  {
    icon: <Leaf />,
    title: "Earn Eco Points",
    description:
      "Get rewarded with eco points for your sustainable actions, redeemable for discounts on recycled products.",
  },
];

import { Gift } from "lucide-react";

const FeatureSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">How It Works</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Our platform makes it easy to participate in the circular economy, 
            reducing waste and creating value from unwanted items.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="eco-card flex flex-col items-center text-center p-8 hover:border-eco-primary transition-colors"
            >
              <div className="w-16 h-16 rounded-full bg-eco-light flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
