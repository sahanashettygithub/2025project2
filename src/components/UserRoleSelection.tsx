
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, ShoppingBag, Trash2, CircleDollarSign } from "lucide-react";

const UserRoleSelection = () => {
  const roles = [
    {
      title: "Donor",
      description: "Donate food, clothes, or vegetable waste to help others and reduce waste",
      icon: <Gift className="h-12 w-12 text-eco-primary" />,
      link: "/signup?role=donor",
      color: "bg-eco-light",
    },
    {
      title: "Receiver",
      description: "Find and collect donated food and clothes for personal use or community distribution",
      icon: <ShoppingBag className="h-12 w-12 text-eco-primary" />,
      link: "/signup?role=receiver",
      color: "bg-eco-light",
    },
    {
      title: "Seller",
      description: "Sell your old clothes to recycling factories and earn eco points",
      icon: <CircleDollarSign className="h-12 w-12 text-eco-primary" />,
      link: "/signup?role=seller",
      color: "bg-eco-light",
    },
    {
      title: "Buyer",
      description: "Purchase old clothes for recycling and sell recycled products through our eco store",
      icon: <Trash2 className="h-12 w-12 text-eco-primary" />,
      link: "/signup?role=buyer",
      color: "bg-eco-light",
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title">Join Our Community</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose your role in our circular economy platform. Whether you're donating,
            receiving, selling, or buying recycled goods, we have a place for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role, index) => (
            <Card key={index} className="overflow-hidden border-border hover:border-eco-primary transition-colors">
              <CardHeader className={`${role.color} text-center py-6`}>
                <div className="mx-auto">{role.icon}</div>
                <CardTitle className="mt-3 text-xl">{role.title}</CardTitle>
              </CardHeader>
              <CardContent className="py-4">
                <p className="text-center text-muted-foreground">{role.description}</p>
              </CardContent>
              <CardFooter className="flex justify-center pb-6">
                <Link to={role.link}>
                  <Button className="bg-eco-primary hover:bg-eco-dark">Get Started</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserRoleSelection;
