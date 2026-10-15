import Text from "../../../components/text";
import Button from "../../../components/button";
import { useLanguage } from "../../../context/languageContext";

import imageMainJournal from "../../../assets/images/FotoJornal.png";
import imageCapitular from "../../../assets/images/Capitular.png";
import imageOrnamental from "../../../assets/images/OrnamentoJornal.png";

export default function Hero() {
  const { translations } = useLanguage();
  const t = translations.hero;

  return (
    <section id="hero" className="relative z-30 w-full p-8">
      {/* CABEÇALHO PRINCIPAL */}
      <div className="mb-8 flex w-full items-center justify-between">
        <div className="border border-black p-6 text-center">
          <div className="w-47.5">
            <Text variant="body-normal-uppercase">{t.tags.design}</Text>
          </div>
          <div className="w-47.5">
            <Text variant="body-normal-uppercase">{t.tags.uiux}</Text>
          </div>
          <div className="w-47.5">
            <Text variant="body-normal-uppercase">{t.tags.developer}</Text>
          </div>
        </div>

        <img
          src={imageOrnamental}
          alt={t.ornamentLeftAlt}
          className="h-32 w-32 object-cover"
        />

        <div className="w-[430px] shrink-0 text-center">
          <Text variant="title">{t.title}</Text>
        </div>

        <img
          src={imageOrnamental}
          alt={t.ornamentRightAlt}
          className="h-32 w-32 object-cover"
        />

        <div className="border border-black p-6 text-center">
          <div className="w-47.5">
            <Text variant="body-normal-uppercase">{t.tags.projects}</Text>
          </div>
          <div className="w-47.5">
            <Text variant="body-normal-uppercase">{t.tags.about}</Text>
          </div>
          <div className="w-47.5">
            <Text variant="body-normal-uppercase">{t.tags.contact}</Text>
          </div>
        </div>
      </div>

      {/* SUB-BARRA */}
      <div className="mb-8 flex w-full items-center justify-between border-y border-black p-6 gap-4">
        <div className="flex-1 text-left">
          <Text variant="body-normal-uppercase">{t.location}</Text>
        </div>
        <div className="flex-1 text-center">
          <Text variant="body-normal-uppercase">{t.name}</Text>
        </div>
        <div className="flex-1 text-right">
          <Text variant="body-normal-uppercase">{t.date}</Text>
        </div>
      </div>

      {/* CONTAINER PRINCIPAL (CAIXA DE CONTEÚDO) */}
      <div className="w-full border border-black p-8">
        <div className="grid grid-cols-2 gap-x-9 items-stretch">
          <div className="flex flex-col justify-between h-full">
            <Text as="p" variant="body-normal" className="text-justify">
              <img
                src={imageCapitular}
                alt={t.capitularAlt}
                className="float-left mr-5 mb-2 h-37 w-37 object-cover"
              />
              {t.description}
            </Text>

            <Button
              type="button"
              variant="outline"
              className="self-end border border-black px-6 py-2"
            >
              <Text variant="body-normal-uppercase">{t.viewArchiveButton}</Text>
            </Button>
          </div>

          <div className="relative flex aspect-[900/480] h-full w-full items-center justify-center overflow-hidden">
            <img
              src={imageMainJournal}
              alt={t.mainImageAlt}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
