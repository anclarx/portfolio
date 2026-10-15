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
const LINE_COLOR = "var(--color-black)";

function linePattern(color: string) {
  return `linear-gradient(to bottom, transparent ${LINE_HEIGHT - 1}px, ${color} ${LINE_HEIGHT - 1}px, ${color} ${LINE_HEIGHT}px)`;
}

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
    "w-full bg-transparent outline-none text-xl text-black px-1 placeholder:font-paragraf placeholder:opacity-50";

  return (
    <div className="flex items-start w-full gap-2">
      {label && (
        <div
          className="w-24 shrink-0 flex items-center"
          style={{ height: LINE_HEIGHT }}
        >
          <Text variant="body-normal-uppercase">{label}</Text>
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
          style={{
            height: LINE_HEIGHT,
            lineHeight: `${LINE_HEIGHT}px`,
            borderBottom: `1px solid ${LINE_COLOR}`,
          }}
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
            height: rows * LINE_HEIGHT,
            lineHeight: `${LINE_HEIGHT}px`,
            backgroundImage: linePattern(LINE_COLOR),
            backgroundSize: `100% ${LINE_HEIGHT}px`,
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
