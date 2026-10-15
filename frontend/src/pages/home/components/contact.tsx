import Form from "../../../components/form";
import ItemButton from "../../../components/item-button";

import carta from "../../../assets/images/Carta.png";
import foto from "../../../assets/images/Foto.png";
import fotoRedonda from "../../../assets/images/FotoRedondaA.png";
import item from "../../../assets/images/PapelariaItem.png";
import arrowIcon from "../../../assets/icons/arrow.svg";

export default function Contact() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <section id="contact" className="relative mx-auto h-218.75 w-300">
      <img src={carta} alt="" className="absolute top-19.75 left-137 w-160.5" />
      <img src={foto} alt="" className="absolute top-46.25 left-2.5 w-135.75" />
      <div className="absolute top-26.25 left-66.5 z-20 w-123.5">
        <Form />
      </div>
      <img
        src={fotoRedonda}
        alt=""
        className="absolute top-122.25 left-34 z-30 w-54.25"
      />
      <img
        src={item}
        alt=""
        className="absolute top-83.25 left-165.25 z-30 w-102.5"
      />
      <div className="absolute top-196 right-0 z-40 flex items-center border border-black p-0.5 transition-transform hover:-translate-y-1">
        <ItemButton
          imageUrl={arrowIcon}
          imageAlt="Voltar ao topo"
          onClick={scrollToTop}
          className="h-11 w-11"
        />
      </div>
    </section>
  );
}
