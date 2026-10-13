import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center cursor-pointer shrink-0 font-paragraf",
  {
    variants: {
      variant: {
        outline: "bg-transparent border border-black",
        solid: "bg-black text-white border border-black",
      },
      size: {
        default: "px-6 py-2",
        sm: "px-4 py-1.5 text-sm",
        lg: "px-8 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "default",
    },
  },
);

interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  className?: string;
  children: React.ReactNode;
}

export default function Button({
  variant,
  size,
  className,
  children,
  type = "submit",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonVariants({ variant, size, className })}
      {...props}
    >
      {children}
    </button>
  );
}
