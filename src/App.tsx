import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./index.css";

const App: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* ── Lenis smooth scroll ── */
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);

    /* ── Cursor glow follow (smooth with lerp) ── */
    const cursor = cursorRef.current;
    let mx = 0, my = 0, cx = 0, cy = 0;
    let animating = true;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener("mousemove", onMove);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const animate = () => {
      if (!animating) return;
      cx = lerp(cx, mx, 0.1);
      cy = lerp(cy, my, 0.1);
      if (cursor) { cursor.style.left = cx + "px"; cursor.style.top = cy + "px"; }
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      animating = false;
      lenis.destroy();
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#07090a] relative overflow-x-hidden">
      {/* Smooth cursor glow — desktop only */}
      <div ref={cursorRef} className="cursor-glow hidden lg:block" />

      {/* Global noise grain */}
      <div className="noise-overlay fixed inset-0 pointer-events-none z-[1] opacity-[0.028]" />

      {/* Subtle radial vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.04) 0%, transparent 60%)" }}
      />

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default App;
