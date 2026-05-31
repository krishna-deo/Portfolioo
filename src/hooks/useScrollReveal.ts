import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useScrollReveal = (delay = 0) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set initial state
    gsap.set(el, { opacity: 0, y: 42 });

    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.95,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        once: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === el) t.kill();
      });
    };
  }, [delay]);

  return ref;
};
