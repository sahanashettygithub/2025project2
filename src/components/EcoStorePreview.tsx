
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag } from "lucide-react";

const products = [
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
    name: "Recycled Notebook Set",
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
  }
];

const EcoStorePreview = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="section-title mb-2">Eco Store</h2>
            <p className="text-muted-foreground max-w-2xl">
              Shop sustainable products made from recycled materials
              and use your eco points for exclusive discounts.
            </p>
          </div>
          <Link to="/eco-store" className="mt-4 md:mt-0">
            <Button variant="outline" className="border-eco-primary text-eco-primary hover:bg-eco-light">
              View All Products
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link to={`/eco-store/product/${product.id}`} key={product.id} className="group">
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcoStorePreview;
