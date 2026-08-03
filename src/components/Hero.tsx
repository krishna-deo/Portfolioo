import React, { useEffect, useRef } from "react";
import { Github, Linkedin, ArrowDown } from "lucide-react";
import * as THREE from "three";
import gsap from "gsap";
import { contact } from "../data/portfolioData";

/* ── Magnetic button hook ───────────────────────────────── */
function useMagnetic(strength = 0.3) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * strength;
      const dy = (e.clientY - (r.top + r.height / 2)) * strength;
      (el as HTMLElement).style.transform = `translate(${dx}px,${dy}px)`;
    };
    const onLeave = () => {
      (el as HTMLElement).style.transform = "translate(0,0)";
    };
    el.addEventListener("mousemove", onMove as EventListener);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove as EventListener);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);
  return ref as React.RefObject<HTMLButtonElement>;
}

/* ── Three.js floating particles background ─────────────── */
function useParticleCanvas(canvasRef: React.RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      canvas.offsetWidth / canvas.offsetHeight,
      0.1,
      100,
    );
    camera.position.z = 3;

    /* Particles */
    const COUNT = 320;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
      sizes[i] = Math.random() * 1.8 + 0.4;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.PointsMaterial({
      color: 0x10b981,
      size: 0.025,
      transparent: true,
      opacity: 0.35,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    /* Mouse parallax */
    let mx = 0,
      my = 0;
    const onMouse = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 0.4;
      my = -(e.clientY / window.innerHeight - 0.5) * 0.25;
    };
    window.addEventListener("mousemove", onMouse);

    /* Resize */
    const resize = () => {
      const w = canvas.offsetWidth,
        h = canvas.offsetHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    /* Animate */
    let frame: number;
    let t = 0;
    const tick = () => {
      frame = requestAnimationFrame(tick);
      t += 0.0008;
      points.rotation.y = t + mx;
      points.rotation.x = t * 0.4 + my;
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
    };
  }, [canvasRef]);
}

/* ── Component ───────────────────────────────────────────── */
const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const mag1 = useMagnetic(0.28);
  const mag2 = useMagnetic(0.22);

  useParticleCanvas(canvasRef);

  /* GSAP entrance animations */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Text lines mask reveal */
      const lines = textRef.current?.querySelectorAll(".clip-inner");
      if (lines) {
        gsap.fromTo(
          lines,
          { yPercent: 108 },
          {
            yPercent: 0,
            duration: 1.1,
            ease: "power4.out",
            stagger: 0.12,
            delay: 0.3,
          },
        );
      }

      /* Photo reveal */
      gsap.fromTo(
        photoRef.current,
        { opacity: 0, scale: 0.92, filter: "blur(12px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "power3.out",
          delay: 0.6,
        },
      );

      /* Fade-in elements */
      gsap.fromTo(
        ".hero-fade",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.85,
        },
      );
    });
    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: "80px" }}
    >
      {/* Three.js particle canvas */}
      <canvas ref={canvasRef} id="hero-canvas" />

      {/* Background glow orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "-5%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "5%",
            width: 380,
            height: 380,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── LEFT: Text ───────────────────────────────── */}
          <div ref={textRef}>
            {/* Hi line */}
            <div className="clip-line mb-4">
              <span className="clip-inner hero-fade flex items-center gap-2 text-sm text-white/40 font-medium tracking-widest uppercase">
                <span className="w-6 h-px bg-emerald-500" />
                Hi, I'm Krishna Deo
              </span>
            </div>

            {/* Big heading */}
            <div className="mb-6">
              {["FULL ", "STACK"].map((word, i) => (
                <div key={i} className="clip-line">
                  <span
                    className="clip-inner block font-black leading-none tracking-tight"
                    style={{
                      fontSize: "clamp(3rem, 7vw, 5.5rem)",
                      color: i === 0 ? "#ffffff" : "transparent",
                      WebkitTextStroke:
                        i === 1 ? "1.5px rgba(255,255,255,0.18)" : undefined,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {word}
                  </span>
                </div>
              ))}
              {/* Emerald accent line */}
              <div className="clip-line mt-1">
                <span
                  className="clip-inner block font-black leading-none tracking-tight text-transparent bg-clip-text"
                  style={{
                    fontSize: "clamp(3rem, 7vw, 5.5rem)",
                    backgroundImage:
                      "linear-gradient(90deg, #10b981, #34d399, #6ee7b7)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  DEVELOPER.
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="clip-line mb-8 max-w-md">
              <p className="clip-inner text-white/45 text-base leading-relaxed">
                I build scalable full-stack web applications with clean
                interfaces, secure backend systems, and modern user experiences.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="hero-fade flex flex-wrap items-center gap-4 mb-8">
              {/* View Projects — Orange glow */}
              <button
                ref={mag1}
                onClick={() => scrollTo("projects")}
                className="magnetic-wrap btn-emerald-glow px-7 py-3.5 rounded-xl font-bold text-sm text-black"
                style={{
                  background:
                    "linear-gradient(90deg, #10b981, #34d399, #6ee7b7)",
                  transition:
                    "transform 0.3s cubic-bezier(0.23,1,0.32,1), box-shadow 0.35s ease",
                }}
              >
                View Projects
              </button>
              {/* Contact Me — Emerald ghost */}
              <button
                ref={mag2}
                onClick={() => scrollTo("contact")}
                className="magnetic-wrap btn-emerald-glow px-7 py-3.5 rounded-xl font-bold text-sm text-emerald-400"
                style={{
                  border: "1px solid rgba(16,185,129,0.3)",
                  transition:
                    "transform 0.3s cubic-bezier(0.23,1,0.32,1), box-shadow 0.35s ease, border-color 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(52,211,153,0.55)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(16,185,129,0.3)";
                }}
              >
                Contact Me
              </button>
            </div>

            {/* Socials + tag */}
            <div className="hero-fade flex items-center gap-5">
              {/* → Replace # with your GitHub URL */}
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-white/8 text-white/30 hover:text-white hover:border-white/22 transition-all duration-300"
              >
                <Github size={17} />
              </a>
              {/* → Replace # with your LinkedIn URL */}
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-white/8 text-white/30 hover:text-emerald-400 hover:border-emerald-700/35 transition-all duration-300"
              >
                <Linkedin size={17} />
              </a>
              <div className="h-5 w-px bg-white/10" />
              <span className="text-white/25 text-xs font-mono tracking-widest">
                @krishnadeo
              </span>
            </div>
          </div>

          {/* ── RIGHT: Photo ─────────────────────────────── */}
          <div
            ref={photoRef}
            className="hidden lg:flex items-center justify-center lg:justify-end"
            style={{ opacity: 0 }}
          >
            <div className="relative">
              {/* Animated glow behind photo */}
              <div
                className="photo-glow-pulse absolute inset-0 rounded-3xl"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 50%, rgba(16,185,129,0.22) 0%, transparent 70%)",
                  transform: "scale(1.15)",
                  filter: "blur(24px)",
                  zIndex: 0,
                }}
              />
              {/* Orange accent glow — bottom right corner */}
              <div
                className="absolute -bottom-4 -right-4 w-28 h-28 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(249,115,22,0.18) 0%, transparent 70%)",
                  filter: "blur(20px)",
                  zIndex: 0,
                }}
              />

              {/*
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                PROFILE PHOTO:
                Replace /profile-photo.png with your actual photo.
                Place your photo file in the /public folder as:
                  /public/profile-photo.png
                Recommended: use a high-quality PNG with transparent
                or dark background for best blending effect.
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              */}
              <div
                className="relative z-10 overflow-hidden"
                style={{
                  width: "clamp(260px, 36vw, 420px)",
                  aspectRatio: "3/4",
                  borderRadius: "24px",
                  border: "1px solid rgba(16,185,129,0.2)",
                  boxShadow:
                    "0 0 0 1px rgba(16,185,129,0.06), 0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
                }}
              >
                <img
                  src="/dp.png"
                  alt="Krishna Deo — Full Stack Developer"
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    // Fallback: elegant placeholder if photo missing
                    const el = e.currentTarget;
                    el.style.display = "none";
                    const next = el.nextElementSibling as HTMLElement;
                    if (next) next.style.display = "flex";
                  }}
                />
                {/* Fallback placeholder (hidden when photo loads) */}
                <div
                  className="absolute inset-0 flex-col items-center justify-center gap-4"
                  style={{
                    display: "none",
                    background:
                      "linear-gradient(160deg, #0d1f18 0%, #07090a 100%)",
                  }}
                >
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center"
                    style={{
                      background: "rgba(16,185,129,0.1)",
                      border: "1px solid rgba(16,185,129,0.2)",
                    }}
                  >
                    <span className="text-3xl font-black text-emerald-400/60">
                      KD
                    </span>
                  </div>
                  <span className="text-white/22 text-xs text-center px-6">
                    Add your photo to
                    <br />
                    /public/profile-photo.png
                  </span>
                </div>

                {/* Gradient overlay — blends image into dark bg */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(7,9,10,0.6) 0%, rgba(7,9,10,0.1) 35%, transparent 60%), linear-gradient(to right, rgba(7,9,10,0.15) 0%, transparent 40%)",
                  }}
                />
              </div>

              {/* Floating tag — experience */}
              <div
                className="absolute -bottom-5 -left-5 z-20 px-4 py-3 rounded-xl flex items-center gap-3"
                style={{
                  background: "rgba(7,9,10,0.9)",
                  border: "1px solid rgba(16,185,129,0.18)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(16,185,129,0.12)" }}
                >
                  <span className="text-emerald-400 text-sm font-black">
                    1+
                  </span>
                </div>
                <div>
                  <p className="text-white text-xs font-semibold leading-tight">
                    Years Building
                  </p>
                  <p className="text-white/35 text-xs leading-tight">
                    Full-Stack Projects
                  </p>
                </div>
              </div>

              {/* Floating tag — status */}
              <div
                className="absolute -top-4 -right-4 z-20 px-3 py-2 rounded-xl flex items-center gap-2"
                style={{
                  background: "rgba(7,9,10,0.9)",
                  border: "1px solid rgba(16,185,129,0.18)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400/80 text-xs font-medium">
                  Open to Work
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <button
          onClick={() => scrollTo("about")}
          className="hero-fade absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/18 hover:text-emerald-400/50 transition-colors duration-300"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase font-medium">
            Scroll
          </span>
          <ArrowDown size={13} className="animate-bounce" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
