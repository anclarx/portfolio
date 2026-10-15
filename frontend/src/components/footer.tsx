import Text from "./text";
import ItemButton from "./item-button";
import { useLanguage } from "../context/languageContext";

import iconGithub from "../assets/icons/github.svg";
import iconLinkedin from "../assets/icons/linkedin.svg";

export default function Footer() {
  const { translations } = useLanguage();
  const t = translations.footer;

  return (
    <footer className="bg-white">
      <div className="mx-auto flex h-59.5 w-300 flex-col gap-7 pt-11">
        <nav className="flex justify-between">
          {translations.nav.map((item) => (
            <a key={item.label} href={item.href} className="hover:underline">
              <Text variant="body-normal-uppercase">{item.label}</Text>
            </a>
          ))}
        </nav>
        <div className="h-3 border border-black" />
        <div className="flex items-start justify-between">
          <Text as="p">
            {t.descriptionLine1}
            <br />
            {t.descriptionLine2}
          </Text>
          <div className="flex gap-2">
            <div className="flex shrink-0 items-center border border-black p-0.5">
              <ItemButton
                imageUrl={iconGithub}
                imageAlt={t.githubAlt}
                onClick={() =>
                  window.open(
                    "https://github.com/anclarx",
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
                className="size-10"
              />
            </div>
            <div className="flex shrink-0 items-center border border-black p-0.5">
              <ItemButton
                imageUrl={iconLinkedin}
                imageAlt={t.linkedinAlt}
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/anclarxs2",
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
                className="size-10"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
