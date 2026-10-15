import Text from "../../../components/text";
import { useLanguage } from "../../../context/languageContext";
import papeis from "../../../assets/images/Papeis.png";
import fotoGotica from "../../../assets/images/FotoGotica.png";

export default function About() {
  const { translations } = useLanguage();
  const t = translations.about;

  return (
    <section id="about" className="p-30">
      <div className="mx-auto flex w-full justify-between items-start gap-16">
        {/* Lado esquerdo (Papéis + Foto) */}
        <div className="relative ml-4 h-161.5 w-140.75 shrink-0">
          <img
            src={papeis}
            alt={t.paperAlt}
            className="absolute inset-0 size-full"
          />

          <Text
            as="p"
            variant="body-normal"
            className="absolute top-15 left-18 block w-105 text-justify transform -rotate-[1.38deg]"
          >
            {t.paperDescription}
          </Text>

          <img
            src={fotoGotica}
            alt={t.gothicPhotoAlt}
            className="absolute top-53.5 -left-8 w-69"
          />
        </div>

        {/* Lado direito (Título + Div com os textos ocupando todo o espaço restante) */}
        <div className="flex flex-col items-end space-y-16 flex-1 w-full">
          {/* Título alinhado à direita */}
          <Text as="h2" variant="subtitle" className="text-right">
            {t.title}
          </Text>

          {/* Div contendo os parágrafos preenchendo 100% da largura da coluna */}
          <div className="w-full space-y-8 flex flex-col items-end">
            <Text
              as="p"
              variant="body-normal"
              className="block text-justify w-full"
            >
              {t.paragraph1}
            </Text>

            <Text
              as="p"
              variant="body-normal"
              className="block text-justify w-full"
            >
              {t.paragraph2}
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
}
