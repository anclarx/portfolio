import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import Text from "./text";

export const buttonVariants = cva(
  "inline-flex items-center justify-center cursor-pointer shrink-0 font-paragraf px-sm py-[0.5rem]",
  {
    variants: {
      variant: {
        outline: "bg-transparent border border-black text-black",
        "outline-white": "bg-transparent border border-white text-white",
      },
    },
    defaultVariants: {
      variant: "outline",
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
  variant = "outline",
  className,
  children,
  type = "submit",
  ...props
}: ButtonProps) {
  const textColor = variant === "outline-white" ? "text-white" : "text-black";

  return (
    <button
      type={type}
      className={buttonVariants({ variant, className })}
      {...props}
    >
      <Text variant="body-normal-uppercase" className={textColor}>
        {children}
      </Text>
    </button>
  );
}
