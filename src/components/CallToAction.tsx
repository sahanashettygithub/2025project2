
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-16 bg-eco-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
        <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
          Join our community today and start contributing to a cleaner, more sustainable future.
          Every donation, every sale, and every purchase makes an impact.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/signup">
            <Button className="bg-white text-eco-primary hover:bg-eco-light py-6 px-8 text-lg flex gap-2 w-full sm:w-auto justify-center">
              <span>Join Now</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/buy-clothes">
            <Button variant="outline" className="border-white text-white hover:bg-white/10 py-6 px-8 text-lg w-full sm:w-auto">
              Buy Recyclable Clothes
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
