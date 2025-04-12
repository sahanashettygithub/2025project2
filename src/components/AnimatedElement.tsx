
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AnimationVariant = 
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "subtle-scale"
  | "slight-bounce";

type AnimatedElementProps = {
  children: ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
};

export const AnimatedElement = ({
  children,
  className = "",
  variant = "fade-up",
  delay = 0,
  duration = 300
}: AnimatedElementProps) => {
  const animationClasses = {
    "fade-up": "animate-fadeInUp",
    "fade-down": "animate-fadeInDown",
    "fade-left": "animate-fadeInLeft",
    "fade-right": "animate-fadeInRight",
    "subtle-scale": "animate-pulse-subtle",
    "slight-bounce": "animate-float"
  };

  return (
    <div 
      className={cn(
        animationClasses[variant],
        className
      )}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`
      }}
    >
      {children}
    </div>
  );
};
