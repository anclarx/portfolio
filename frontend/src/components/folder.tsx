import { useNavigate } from "react-router-dom";

import Text from "./text";
import ItemButton from "./item-button";

interface FolderProps {
  children: string;
  imageUrl: string;
  imageAlt: string;
  url: string;
}

const TAB_HEIGHT = "h-[6.875cqw]";
const LABEL_LEFT = "left-[5cqw]";
const LABEL_NUDGE = "top-[0.45cqw]";

export default function Folder({
  children,
  imageUrl,
  imageAlt,
  url,
}: FolderProps) {
  const navigate = useNavigate();
  return (
    <div className="@container relative block w-full transition-transform duration-300 ease-out hover:-translate-y-3">
      <ItemButton
        imageUrl={imageUrl}
        imageAlt={imageAlt}
        onClick={() => navigate(url)}
      />

      <div
        className={`pointer-events-none absolute flex items-center ${TAB_HEIGHT} ${LABEL_LEFT} ${LABEL_NUDGE}`}
      >
        <Text variant="body-normal-uppercase">{children}</Text>
      </div>
    </div>
  );
}
