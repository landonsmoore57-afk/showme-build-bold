import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-black ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl hover:scale-105",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg hover:shadow-xl",
        outline: "border-3 border-primary bg-background text-primary hover:bg-primary/10 shadow-md hover:shadow-lg hover:scale-105",
        secondary: "bg-gradient-to-r from-secondary to-orange-600 text-white hover:from-secondary/90 hover:to-orange-600/90 shadow-[0_8px_30px_hsl(23_95%_39%_/_0.4)] hover:shadow-[0_12px_40px_hsl(23_95%_39%_/_0.6)] hover:scale-110 hover:-translate-y-0.5",
        ghost: "hover:bg-accent/20 hover:text-primary hover:scale-105",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-gradient-to-r from-secondary via-orange-600 to-secondary text-white hover:from-secondary/90 hover:via-orange-600/90 hover:to-secondary/90 shadow-[0_10px_40px_hsl(23_95%_39%_/_0.5)] hover:shadow-[0_16px_50px_hsl(23_95%_39%_/_0.7)] hover:scale-110 hover:-translate-y-1 font-black tracking-tight",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-xl px-5 text-sm",
        lg: "h-16 rounded-2xl px-12 text-lg",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
