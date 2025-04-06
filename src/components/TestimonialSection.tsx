
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

type TestimonialProps = {
  quote: string;
  name: string;
  role: string;
  avatar?: string;
};

const Testimonial = ({ quote, name, role, avatar }: TestimonialProps) => (
  <Card className="h-full">
    <CardContent className="p-6 flex flex-col h-full">
      <div className="flex-grow">
        <div className="text-3xl text-eco-primary font-serif mb-4">"</div>
        <p className="text-muted-foreground mb-6">{quote}</p>
      </div>
      <div className="flex items-center">
        {avatar ? (
          <img src={avatar} alt={name} className="w-12 h-12 rounded-full mr-4" />
        ) : (
          <div className="w-12 h-12 rounded-full bg-eco-light flex items-center justify-center mr-4">
            <User className="h-6 w-6 text-eco-primary" />
          </div>
        )}
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const TestimonialSection = () => {
  const testimonials = [
    {
      quote: "As a restaurant owner, I used to throw away excess food every day. Now, I can donate it through Waste2Worth and help feed those in need. It's a win-win!",
      name: "Ravi Sharma",
      role: "Food Donor"
    },
    {
      quote: "I've been able to clothe my family with quality donations from generous donors. This platform has been a blessing for us during difficult times.",
      name: "Priya Patel",
      role: "Donation Receiver"
    },
    {
      quote: "Our recycling factory has increased production by 30% thanks to the steady supply of old clothes from Waste2Worth sellers. The platform is revolutionary!",
      name: "Suresh Kumar",
      role: "Factory Buyer"
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title">What People Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from our community members about their experiences with Waste2Worth
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              role={testimonial.role}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
