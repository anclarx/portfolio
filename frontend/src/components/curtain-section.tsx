import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

// "Travadinha": quando o conteúdo trava na tela, ele fica parado por esse
// trecho de scroll (em alturas de tela) antes da próxima seção começar a
// subir por cima dele.
const HOLD_SCREENS = 0.4;

/**
 * Efeito "cortina": o conteúdo rola normalmente até a BASE dele encostar na
 * base da tela. Aí ele fica travado (fixed) e a seção SEGUINTE sobe por cima
 * dele, até cobrir tudo.
 *
 * Uso:
 *   <CurtainSection><Projects /></CurtainSection>
 *   <About />   // precisa de fundo próprio e `relative z-20`
 *
 * Usa position: fixed (não sticky) porque o App tem overflow-x-hidden, que
 * quebra o sticky.
 */
export default function CurtainSection({ children }: { children: ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const stage = stageRef.current;
    if (!outer || !stage) return;

    let frame = 0;
    let lastH = -1;
    let lastVh = -1;

    const measure = () => {
      const h = stage.offsetHeight;
      const vh = window.innerHeight;
      if (h === lastH && vh === lastVh) return;
      lastH = h;
      lastVh = vh;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
      const hold = reduce.matches ? 0 : vh * HOLD_SCREENS;
      // altura reservada = conteúdo + pausa + uma tela (o trecho em que a
      // próxima seção sobe); a margem negativa faz a próxima seção começar
      // embaixo do conteúdo, só depois da pausa.
      outer.style.setProperty("--curtain-height", `${h + hold + vh}px`);
      outer.style.setProperty("--curtain-pull", `${-vh}px`);
      update();
    };

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const h = stage.offsetHeight;
      const box = outer.getBoundingClientRect();
      const next = outer.nextElementSibling;
      const nextTop = next ? next.getBoundingClientRect().top : box.top + h;

      const phase =
        box.top > vh - h ? "before" : nextTop <= 0 ? "after" : "pinned";
      stage.dataset.phase = phase;

      if (phase === "pinned") {
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
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={outerRef}
      className="relative z-10 mb-(--curtain-pull) h-(--curtain-height)"
      style={{ "--curtain-height": "auto" } as CSSProperties}
    >
      <div
        ref={stageRef}
        data-phase="before"
        className="data-[phase=after]:invisible data-[phase=pinned]:fixed data-[phase=pinned]:bottom-0"
      >
        {children}
      </div>
    </div>
  );
}
