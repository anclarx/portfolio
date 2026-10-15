import Form from "../../../components/form";
import ItemButton from "../../../components/item-button";
import Text from "../../../components/text";
import { useLanguage } from "../../../context/languageContext";

import carta from "../../../assets/images/Carta.png";
import foto from "../../../assets/images/Foto.png";
import fotoRedonda from "../../../assets/images/FotoRedondaA.png";
import item from "../../../assets/images/PapelariaItem.png";
import arrowIcon from "../../../assets/icons/arrow.svg";

export default function Contact() {
  const { translations } = useLanguage();
  const t = translations.form;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="contact"
      className="mx-auto flex w-[75rem] flex-col space-y-2xl"
    >
      <Text as="h2" variant="subtitle" className="text-right">
        {t.title}
      </Text>

      <div className="relative h-[49.75rem] w-full">
        <img
          src={carta}
          alt=""
          className="absolute top-0 left-[34.25rem] w-[40.125rem]"
        />
        <img
          src={foto}
          alt=""
          className="absolute top-[6.625rem] left-[0.625rem] w-[33.9375rem]"
        />
        <div className="absolute top-[1.625rem] left-[16.625rem] z-20 w-[30.875rem]">
          <Form />
        </div>
        <img
          src={fotoRedonda}
          alt=""
          className="absolute top-[25.625rem] left-[8.5rem] z-30 w-[13.5625rem]"
        />
        <img
          src={item}
          alt=""
          className="absolute top-[15.875rem] left-[41.3125rem] z-30 w-[25.625rem]"
        />
        <div className="absolute top-[44.0625rem] right-0 z-40 flex items-center border border-black p-[0.125rem] transition-transform hover:-translate-y-[0.25rem]">
          <ItemButton
            imageUrl={arrowIcon}
            imageAlt="Voltar ao topo"
            onClick={scrollToTop}
            className="size-[2.75rem]"
          />
        </div>
      </div>
    </section>
  );
}
