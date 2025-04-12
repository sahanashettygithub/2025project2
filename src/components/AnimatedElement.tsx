
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AnimationVariant = 
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "zoom-in"
  | "bounce"
  | "pulse";

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
}: AnimatedElementProps) => {
  return (
    <div className={cn(className)}>
      {children}
    </div>
  );
};
