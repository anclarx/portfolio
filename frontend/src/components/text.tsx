import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const textVariants = cva("text-black", {
  variants: {
    variant: {
      "body-normal": "font-paragraf text-xl leading-8 font-normal",
      "body-normal-uppercase":
        "font-paragraf text-xl leading-7 font-normal uppercase",
      title: "font-arkhaven text-8xl leading-32",
      subtitle: "font-arkhaven text-6xl leading-16",
    },
  },
  defaultVariants: {
    variant: "body-normal",
  },
});

interface TextProps extends VariantProps<typeof textVariants> {
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode;
}

export default function Text({
  as = "span",
  variant,
  className,
  children,
  ...props
}: TextProps) {
  return React.createElement(
    as,
    {
      className: textVariants({ variant, className }),
      ...props,
    },
    children,
  );
}
