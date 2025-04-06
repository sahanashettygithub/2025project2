
import { Link } from "react-router-dom";
import { Leaf, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-eco-primary" />
              <span className="font-bold text-lg text-eco-primary">Waste2Worth</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Converting waste into valuable resources while promoting sustainability and circular economy.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-eco-primary">About Us</Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-eco-primary">How It Works</Link>
              </li>
              <li>
                <Link to="/impact" className="text-muted-foreground hover:text-eco-primary">Our Impact</Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-eco-primary">Blog</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/donate" className="text-muted-foreground hover:text-eco-primary">Food Donation</Link>
              </li>
              <li>
                <Link to="/donate" className="text-muted-foreground hover:text-eco-primary">Clothes Donation</Link>
              </li>
              <li>
                <Link to="/donate" className="text-muted-foreground hover:text-eco-primary">Vegetable Waste</Link>
              </li>
              <li>
                <Link to="/sell" className="text-muted-foreground hover:text-eco-primary">Sell Old Clothes</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-eco-primary" />
                <span className="text-muted-foreground">123 Green Street, Eco City</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-eco-primary" />
                <a href="mailto:info@waste2worth.com" className="text-muted-foreground hover:text-eco-primary">
                  info@waste2worth.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-eco-primary" />
                <a href="tel:+123456789" className="text-muted-foreground hover:text-eco-primary">
                  +1 (234) 567-89
                </a>
              </li>
            </ul>

            <div className="mt-4 flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-eco-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-eco-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-eco-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Waste2Worth. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex gap-4 text-sm">
            <Link to="/privacy-policy" className="text-muted-foreground hover:text-eco-primary">Privacy Policy</Link>
            <Link to="/terms" className="text-muted-foreground hover:text-eco-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
