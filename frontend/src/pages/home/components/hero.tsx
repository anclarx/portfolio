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
    <section
      id="hero"
      className="relative z-30 flex h-[calc(100svh-var(--topbar-height,0px))] w-full flex-col p-sm"
    >
      {/* CABEÇALHO PRINCIPAL */}
      <div className="mb-sm flex w-full items-center justify-between">
        <div className="border border-black p-sm text-center">
          <div className="w-[11.875rem]">
            <Text variant="body-normal-uppercase">{t.tags.design}</Text>
          </div>
          <div className="w-[11.875rem]">
            <Text variant="body-normal-uppercase">{t.tags.uiux}</Text>
          </div>
          <div className="w-[11.875rem]">
            <Text variant="body-normal-uppercase">{t.tags.developer}</Text>
          </div>
        </div>

        <img
          src={imageOrnamental}
          alt={t.ornamentLeftAlt}
          className="size-[8rem] object-cover"
        />

        <div className="w-[26.875rem] shrink-0 text-center">
          <Text variant="title">{t.title}</Text>
        </div>

        <img
          src={imageOrnamental}
          alt={t.ornamentRightAlt}
          className="size-[8rem] object-cover"
        />

        <div className="border border-black p-sm text-center">
          <div className="w-[11.875rem]">
            <Text variant="body-normal-uppercase">{t.tags.projects}</Text>
          </div>
          <div className="w-[11.875rem]">
            <Text variant="body-normal-uppercase">{t.tags.about}</Text>
          </div>
          <div className="w-[11.875rem]">
            <Text variant="body-normal-uppercase">{t.tags.contact}</Text>
          </div>
        </div>
      </div>

      {/* SUB-BARRA */}
      <div className="mb-sm flex w-full items-center justify-between gap-xs border-y border-black p-sm">
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

      {/* CONTAINER PRINCIPAL (CAIXA DE CONTEÚDO): ocupa o espaço que sobra até
          a base da tela, assim o hero sempre cabe inteiro */}
      <div className="min-h-0 w-full flex-1 border border-black p-sm">
        <div className="grid h-full grid-cols-2 items-stretch gap-x-md">
          <div className="flex h-full flex-col justify-between">
            <Text as="p" variant="body-normal" className="text-justify">
              <img
                src={imageCapitular}
                alt={t.capitularAlt}
                className="float-left mr-sm mb-[0.5rem] size-[9.25rem] object-cover"
              />
              {t.description}
            </Text>

            <Button type="button" variant="outline" className="self-end">
              {t.viewArchiveButton}
            </Button>
          </div>

          <div className="relative flex h-full min-h-0 w-full items-center justify-center overflow-hidden">
            <img
              src={imageMainJournal}
              alt={t.mainImageAlt}
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
