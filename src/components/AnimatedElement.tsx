
import { ReactNode, useEffect, useRef } from "react";
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
  variant = "fade-up",
  delay = 0,
  duration = 0.6,
  className = "",
  threshold = 0.1,
}: AnimatedElementProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("animate");
            }, delay * 1000);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    const current = ref.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [delay, threshold]);

  return (
    <div
      ref={ref}
      className={cn(
        "transform transition-all opacity-0",
        {
          "translate-y-8 data-[state=animate]:translate-y-0 data-[state=animate]:opacity-100": variant === "fade-up",
          "translate-y-[-32px] data-[state=animate]:translate-y-0 data-[state=animate]:opacity-100": variant === "fade-down",
          "translate-x-[-32px] data-[state=animate]:translate-x-0 data-[state=animate]:opacity-100": variant === "fade-left",
          "translate-x-8 data-[state=animate]:translate-x-0 data-[state=animate]:opacity-100": variant === "fade-right",
          "scale-95 data-[state=animate]:scale-100 data-[state=animate]:opacity-100": variant === "zoom-in",
          "data-[state=animate]:animate-bounce": variant === "bounce",
          "data-[state=animate]:animate-pulse": variant === "pulse",
        },
        className
      )}
      style={{ transitionDuration: `${duration}s` }}
      data-state={ref.current?.classList.contains("animate") ? "animate" : "initial"}
    >
      {children}
    </div>
  );
};
