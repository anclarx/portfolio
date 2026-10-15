import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import ItemButton from "../../../components/item-button";

import secaoDesign from "../../../assets/images/SecaoDesign.png";
import secaoPlayground from "../../../assets/images/SecaoPlayground.png";
import secaoProdutoDev from "../../../assets/images/SecaoProdutoDev.png";
import bordado from "../../../assets/images/Bordado.png";
import estrela from "../../../assets/images/Estrela.png";
import fotoRedonda from "../../../assets/images/FotoRedondaA.png";
import textoA from "../../../assets/images/TextoA.png";
import textoB from "../../../assets/images/TextoB.png";
import textoC from "../../../assets/images/TextoC.png";

// Posições finais tiradas do seu Figma (print da direita), em % do HERO:
//   --w          largura
//   --fl / --ft  posição final (left / top): onde ficam fixos em cima do hero
//   --sl         left de onde saem (pequena deriva lateral enquanto sobem)
//   --d / --win  quando começam (0 a 1 do scroll) e quanto do scroll levam
//   --rot        giro inicial em graus (zera ao chegar)
// A ordem da lista é a ordem de empilhamento (o último fica por cima).
// (As classes ficam por extenso porque o Tailwind só enxerga texto literal.)
const ITEMS = [
  {
    img: bordado,
    vars: "[--w:26] [--sl:17] [--fl:21.8] [--ft:17.6] [--d:0.1] [--win:0.5] [--rot:6]",
  },
  {
    img: fotoRedonda,
    vars: "[--w:22] [--sl:79] [--fl:75.2] [--ft:54] [--d:0.35] [--win:0.5] [--rot:-8]",
  },
  {
    img: secaoDesign,
    alt: "Seção design",
    url: "/design",
    vars: "[--w:28.9] [--sl:-1] [--fl:2.2] [--ft:27] [--d:0] [--win:0.5] [--rot:-6]",
  },
  {
    img: secaoProdutoDev,
    alt: "Seção produto e desenvolvimento",
    url: "/produto-e-desenvolvimento",
    vars: "[--w:28.6] [--sl:34] [--fl:30.5] [--ft:42.5] [--d:0.2] [--win:0.5] [--rot:-4]",
  },
  {
    img: secaoPlayground,
    alt: "Seção playground",
    url: "/playground",
    vars: "[--w:29.7] [--sl:66] [--fl:62.7] [--ft:58.4] [--d:0.4] [--win:0.5] [--rot:6]",
  },
  {
    img: estrela,
    vars: "[--w:9.3] [--sl:22] [--fl:26.4] [--ft:47.6] [--d:0.3] [--win:0.5] [--rot:30]",
  },
  {
    img: textoA,
    vars: "[--w:26.7] [--sl:68] [--fl:65.1] [--ft:26.2] [--d:0.25] [--win:0.5] [--rot:5]",
  },
  {
    img: textoB,
    vars: "[--w:13.4] [--sl:70] [--fl:72.8] [--ft:33.9] [--d:0.45] [--win:0.5] [--rot:-12]",
  },
  {
    img: textoC,
    vars: "[--w:27.8] [--sl:64] [--fl:67.3] [--ft:41.2] [--d:0.5] [--win:0.5] [--rot:4]",
  },
] as { img: string; alt?: string; url?: string; vars: string }[];

// Quanto de scroll (em alturas de tela) os itens levam pra subir. Depois disso
// o hero continua travado por mais uma altura de tela, enquanto a seção
// Projetos sobe e cobre ele (efeito "cortina").
const PIN_SCREENS = 1.5;

// Só os 3 cards têm link (navegam pelo react-router); os itens decorativos
// não fazem nada.
const noop = () => {};

export default function FloatingSection({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const outerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const stage = stageRef.current;
    if (!outer || !stage) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let runway = 0; // scroll em que os itens sobem
    let pinEnd = 0; // scroll em que o hero termina de ser coberto
    let stickyTop = 0;

    // Mede o hero e define: altura do trecho travado, onde o hero "gruda" e
    // a distância que os itens percorrem (pra começarem abaixo da tela).
    let lastHero = -1;
    let lastVh = -1;
    const measure = () => {
      const vh = window.innerHeight;
      const hero = stage.offsetHeight;
      if (hero === lastHero && vh === lastVh) return;
      lastHero = hero;
      lastVh = vh;
      runway = reduce.matches ? 0 : vh * PIN_SCREENS;
      // depois dos itens, mais uma altura de tela pra Projetos cobrir o hero
      pinEnd = runway + vh;
      // trava sempre com o topo do hero no topo da tela (a barra de cima
      // continua visível). Se o hero for mais alto que a tela, a parte de baixo
      // só aparece quando o trecho acaba e ele volta a rolar.
      stickyTop = 0;
      outer.style.setProperty("--sticky-top", `${stickyTop}px`);
      outer.style.setProperty("--pin-height", `${hero + pinEnd}px`);
      // puxa a seção seguinte (Projetos) pra cima do hero: ela sobrepõe o hero
      // travado em vez de esperar o hero terminar
      outer.style.setProperty("--pull", `${-hero}px`);
      outer.style.setProperty("--drop", `${Math.max(hero, vh) + 400}`);
      update();
    };

    // O travamento usa position: fixed (e não sticky) pra funcionar mesmo que
    // algum elemento pai tenha overflow. Três fases:
    //   before = ainda não chegou   -> posição normal
    //   pinned = travado na tela    -> fixed
    //   after  = hero já coberto    -> absolute, escondido atrás de Projetos
    const update = () => {
      frame = 0;
      const scrolled = stickyTop - outer.getBoundingClientRect().top;
      const p = runway === 0 ? 1 : Math.min(1, Math.max(0, scrolled / runway));
      outer.style.setProperty("--p", p.toFixed(4));
      // "after" só quando Projetos realmente chegou ao topo da tela (posição
      // real, não calculada): assim o hero nunca some antes de ser coberto.
      const next = outer.nextElementSibling;
      const covered = next
        ? next.getBoundingClientRect().top <= 0
        : scrolled >= pinEnd;
      const phase = scrolled <= 0 ? "before" : covered ? "after" : "pinned";
      stage.dataset.phase = phase;
      // Fase extra "covering": Projetos já encostou na base da barra de cima e
      // está passando por cima dela (a barra fica atrás de Projetos).
      const topbarH =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--topbar-height",
          ),
        ) || 0;
      const underBar = next
        ? next.getBoundingClientRect().top <= topbarH
        : false;
      document.documentElement.dataset.heroPhase =
        phase === "pinned" && underBar ? "covering" : phase;

      // Travado (fixed), o stage precisa ter a mesma largura e posição
      // horizontal da coluna da página; com min-w no App, a largura da tela
      // pode ser menor que a da página.
      if (phase === "pinned") {
        const box = outer.getBoundingClientRect();
        stage.style.left = `${box.left}px`;
        stage.style.width = `${box.width}px`;
      } else {
        stage.style.left = "";
        stage.style.width = "";
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      delete document.documentElement.dataset.heroPhase;
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    // outer: reserva a altura do hero + o trecho de scroll em que ele fica
    // travado. A margem negativa (--pull) faz a seção seguinte começar por cima
    // do hero (ela precisa de z-index maior; ver projects.tsx).
    <div
      ref={outerRef}
      className="relative mb-(--pull) h-(--pin-height)"
      style={{ "--p": 0 } as CSSProperties}
    >
      {/* stage: o hero + os itens. Fica travado na tela (fase "pinned", definida
          em update()) enquanto os itens sobem e Projetos o cobre; quando está
          totalmente coberto ele fica invisível (fase "after"). */}
      <div
        ref={stageRef}
        data-phase="before"
        className="isolate pt-[var(--topbar-height,0px)] data-[phase=after]:invisible data-[phase=after]:absolute data-[phase=after]:inset-x-0 data-[phase=after]:bottom-0 data-[phase=pinned]:fixed data-[phase=pinned]:top-(--sticky-top)"
      >
        {children}

        <div className="pointer-events-none absolute inset-0 z-40">
          {ITEMS.map((item) => (
            <ItemButton
              key={item.img}
              imageUrl={item.img}
              imageAlt={item.alt ?? ""}
              onClick={item.url ? () => navigate(item.url!) : noop}
              className={`floating-item h-auto max-w-none ${item.vars} ${
                item.url ? "" : "pointer-events-none! cursor-default!"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
