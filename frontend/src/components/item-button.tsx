import React from "react";

interface ItemButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  imageUrl: string;
  imageAlt: string;
  animation?: string;
  className?: string;
}

export default function ItemButton({
  imageUrl,
  imageAlt,
  animation = "",
  className = "",
  type = "button",
  ...props
}: ItemButtonProps) {
  return (
    <button
      type={type}
      className={`cursor-pointer select-none bg-transparent border-none p-0 focus-visible:outline-2 ${className}`}
      {...props}
    >
      <img
        src={imageUrl}
        alt={imageAlt}
        draggable={false}
        className={`inline-block w-full h-auto pointer-events-none ${animation}`}
      />
    </button>
  );
}
