import React from "react";
import Text from "./text";

interface InputProps {
  label?: string;
  labelTextVariant?: string;
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  placeholder?: string;
  rows?: number;
  type?: string;
  name?: string;
}

const LINE_HEIGHT = 35;

function linePattern(color: string) {
  return `repeating-linear-gradient(
    to bottom,
    transparent 0,
    transparent ${LINE_HEIGHT - 1}px,
    ${color} ${LINE_HEIGHT - 1}px,
    ${color} ${LINE_HEIGHT}px
  )`;
}

const LINE_COLOR = "var(--color-black)";

export default function Input({
  label,
  value,
  onChange,
  placeholder,
  rows = 1,
  type = "text",
  name,
}: InputProps) {
  const baseClass =
    "w-full bg-transparent outline-none text-black px-1 placeholder:opacity-50";

  const baseStyle: React.CSSProperties = {
    lineHeight: `${LINE_HEIGHT}px`,
    backgroundImage: linePattern(LINE_COLOR),
  };

  return (
    <div className="flex items-start w-full gap-2">
      {label && (
        <div
          className="w-16 shrink-0 flex items-center"
          style={{ height: LINE_HEIGHT }}
        >
          <Text variant="body-base-uppercase">{label}</Text>
        </div>
      )}

      {rows === 1 ? (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={baseClass}
          style={{ ...baseStyle, height: LINE_HEIGHT }}
        />
      ) : (
        <textarea
          name={name}
          lang="pt-BR"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className={`${baseClass} resize-none overflow-y-auto text-justify hyphens-auto`}
          style={{
            ...baseStyle,
            height: rows * LINE_HEIGHT,
            backgroundAttachment: "local",
            textAlignLast: "left",
            textJustify: "inter-word",
            scrollbarWidth: "thin",
          }}
        />
      )}
    </div>
  );
}
