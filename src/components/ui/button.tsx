import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "st-inline-flex st-items-center st-justify-center st-gap-2 st-whitespace-nowrap st-rounded-md st-text-sm st-font-medium st-transition-all disabled:st-pointer-events-none disabled:st-opacity-50 [&_svg]:st-pointer-events-none [&_svg:not([class*='size-'])]:st-size-4 st-shrink-0 [&_svg]:st-shrink-0 st-outline-none focus-visible:st-border-ring focus-visible:st-ring-ring/50 focus-visible:st-ring-[3px] aria-invalid:st-ring-destructive/20 dark:aria-invalid:st-ring-destructive/40 aria-invalid:st-border-destructive",
  {
    variants: {
      variant: {
        default: "st-bg-primary st-text-primary-foreground hover:st-bg-primary/90",
        destructive:
          "st-bg-destructive st-text-white hover:st-bg-destructive/90 focus-visible:st-ring-destructive/20 dark:focus-visible:st-ring-destructive/40 dark:st-bg-destructive/60",
        outline:
          "st-border st-bg-background st-shadow-xs hover:st-bg-accent hover:st-text-accent-foreground dark:st-bg-input/30 dark:st-border-input dark:hover:st-bg-input/50",
        secondary: "st-bg-secondary st-text-secondary-foreground hover:st-bg-secondary/80",
        ghost: "hover:st-bg-accent hover:st-text-accent-foreground dark:hover:st-bg-accent/50",
        link: "st-text-primary st-underline-offset-4 hover:st-underline",
      },
      size: {
        default: "st-h-9 st-px-4 st-py-2 has-[>svg]:st-px-3",
        sm: "st-h-8 st-rounded-md st-gap-1.5 st-px-3 has-[>svg]:st-px-2.5",
        lg: "st-h-10 st-rounded-md st-px-6 has-[>svg]:st-px-4",
        icon: "st-size-9",
        "icon-sm": "st-size-8",
        "icon-lg": "st-size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button };
