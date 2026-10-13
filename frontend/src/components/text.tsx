import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const textVariants = cva("text-black", {
  variants: {
    variant: {
      "body-normal": "font-paragraf text-xl leading-8 font-normal",
      "body-xl-uppercase":
        "font-paragraf text-xl leading-7 font-normal uppercase",
      "body-xl-lowercase":
        "font-paragraf text-xl leading-7 font-normal lowercase",
      "body-xl-bold": "font-paragraf text-xl leading-7 font-bold lowercase",
      "body-base": "font-paragraf text-base leading-5.25 font-normal",
      "body-base-uppercase":
        "font-paragraf text-base leading-5.25 font-normal uppercase",
      "journal-name": "font-arkhaven ",
      "journal-title": "font-arkhaven",
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
