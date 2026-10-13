interface ItemButtonProps {
  imageUrl: string;
  imageAlt: string;
  url: string;
  animation?: string;
}

export default function ItemButton({
  imageUrl,
  imageAlt,
  url,
  animation = "",
}: ItemButtonProps) {
  function handleOnClick() {
    window.location.href = url;
  }

  return (
    <img
      src={imageUrl}
      alt={imageAlt}
      onClick={handleOnClick}
      draggable={false}
      className={`inline-block w-full h-auto cursor-pointer 
        select-none pointer-events-auto ${animation}`}
    />
  );
}
