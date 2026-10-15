import { useEffect, useLayoutEffect, useRef } from "react";
import { useLanguage } from "../context/languageContext";

import iconMenu from "../assets/icons/menu.svg";
import logo from "../assets/icons/xmark.svg";

import Button from "./button";
import ItemButton from "./item-button";

export default function TopBar() {
  const { translations, toggleLanguage } = useLanguage();
  const headerRef = useRef<HTMLElement>(null);

  // O topbar é fixo (sai do fluxo da página), então publica a própria altura em
  // --topbar-height. O hero usa essa variável pra reservar o espaço dele.
  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const publish = () =>
      document.documentElement.style.setProperty(
        "--topbar-height",
        `${header.offsetHeight}px`,
      );
    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(header);
    return () => ro.disconnect();
  }, []);

  // Comportamento padrão: some ao rolar pra baixo e volta ao rolar pra cima.
  // Fases do hero (data-hero-phase no <html>, definidas em floating-section.tsx):
  //   before / pinned -> sempre visível
  //   covering        -> Projetos está passando POR CIMA da barra (a barra fica
  //                      atrás dele, ver z-index no className)
  //   after           -> Projetos já cobriu tudo: some ao descer, volta ao subir
  // data-reveal="true" = barra mostrada de propósito por cima de Projetos
  // (rolou pra cima). Sem isso, na fase "after" ela fica atrás (z baixo), pra
  // não aparecer por um instante por cima de Projetos antes de esconder.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    let lastY = window.scrollY;
    let frame = 0;

    const hideInstantly = () => {
      header.style.transition = "none";
      header.dataset.hidden = "true";
      void header.offsetHeight;
      header.style.transition = "";
    };

    const apply = () => {
      frame = 0;
      const y = window.scrollY;
      const phase = document.documentElement.dataset.heroPhase ?? "";
      if (phase !== "after") {
        header.dataset.hidden = "false";
        header.dataset.reveal = "false";
      } else if (y < lastY) {
        header.dataset.reveal = "true";
        header.dataset.hidden = "false";
      } else if (header.dataset.reveal !== "true") {
        // ainda escondida atrás de Projetos: some na hora, sem animar
        if (header.dataset.hidden !== "true") hideInstantly();
      } else if (y > lastY) {
        // estava visível por cima de Projetos: sai animando
        header.dataset.hidden = "true";
      }
      lastY = y;
    };

    // ao terminar de sair, volta pra trás de Projetos (z baixo)
    const onTransitionEnd = () => {
      if (header.dataset.hidden === "true") header.dataset.reveal = "false";
    };

    // dois rAF: roda depois do update() do floating-section (que atualiza a fase)
    const onScroll = () => {
      if (!frame)
        frame = requestAnimationFrame(() => requestAnimationFrame(apply));
    };

    header.addEventListener("transitionend", onTransitionEnd);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      header.removeEventListener("transitionend", onTransitionEnd);
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      data-hidden="false"
      className="fixed inset-x-0 top-0 z-50 [:root[data-hero-phase=covering]_&]:z-5 [:root[data-hero-phase=after]_&:not([data-reveal=true])]:z-5 border-b border-black bg-ice px-8 py-4 transition-transform duration-300 data-[hidden=true]:-translate-y-full"
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center border border-black p-0.5">
          <ItemButton
            imageUrl={logo}
            imageAlt={translations.topBar.logoAlt}
            onClick={() => {}}
            className="h-11 w-11"
          />
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex h-12 items-center justify-center border border-black px-6"
            onClick={toggleLanguage}
          >
            {translations.languageButton}
          </Button>

          <div className="flex items-center border border-black p-0.5">
            <ItemButton
              imageUrl={iconMenu}
              imageAlt={translations.topBar.menuAlt}
              onClick={() => {}}
              className="h-11 w-11"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
