import React, { useRef } from "react";
import { projects } from "../data/portfolioData";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { ExternalLink, Github, CheckCircle, ArrowUpRight } from "lucide-react";
import gsap from "gsap";

const Projects: React.FC = () => {
  const sectionRef = useScrollReveal();

  // Tilt effect
  const cardRef = useRef<HTMLDivElement>(null);
  const onTiltMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el, {
      rotationY: x * 5,
      rotationX: -y * 4,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };
  const onTiltLeave = () => {
    if (cardRef.current)
      gsap.to(cardRef.current, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.6,
        ease: "power3.out",
      });
  };

  return (
    <section id="projects" className="py-28 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(16,185,129,0.15), transparent)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div ref={sectionRef}>
          {/* Label */}
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-emerald-500" />
            <span className="text-emerald-400 text-xs uppercase tracking-[0.22em] font-semibold">
              Projects
            </span>
          </div>
          <h2
            className="text-4xl sm:text-5xl font-black text-white leading-tight mb-14"
            style={{ letterSpacing: "-0.02em" }}
          >
            Featured work
          </h2>

          {projects.map((project) => (
            <div
              key={project.title}
              ref={cardRef}
              onMouseMove={onTiltMove}
              onMouseLeave={onTiltLeave}
              className="tilt-card relative rounded-3xl overflow-hidden"
              style={{
                border: "1px solid rgba(16,185,129,0.14)",
                background:
                  "linear-gradient(135deg, rgba(16,185,129,0.04) 0%, rgba(7,9,10,0.8) 60%)",
              }}
            >
              {/* Emerald shimmer top edge */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.4) 40%, rgba(52,211,153,0.6) 50%, rgba(16,185,129,0.4) 60%, transparent 100%)",
                }}
              />

              <div className="grid lg:grid-cols-5">
                {/* Image */}
                <div className="lg:col-span-2 p-7 lg:p-10 flex items-center">
                  <div
                    className="img-zoom-wrap w-full rounded-2xl overflow-hidden relative"
                    style={{
                      aspectRatio: "16/10",
                      border: "1px solid rgba(16,185,129,0.12)",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                    }}
                  >
                    {/*
                      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                      PROJECT SCREENSHOT:
                      Place your screenshot at /public/project-preview.png
                      Recommended: 1280×800px PNG of your live project
                      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    */}
                    <img
                      src="/project-preview.png"
                      alt={`${project.title} preview`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const el = e.currentTarget;
                        el.style.display = "none";
                        const fb = el.nextElementSibling as HTMLElement;
                        if (fb) fb.style.display = "flex";
                      }}
                    />
                    {/* Fallback */}
                    <div
                      style={{
                        display: "none",
                        position: "absolute",
                        inset: 0,
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        background:
                          "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(7,9,10,0.9))",
                      }}
                    >
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 12,
                          background: "rgba(16,185,129,0.1)",
                          border: "1px solid rgba(16,185,129,0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <ExternalLink
                          size={18}
                          style={{ color: "rgba(16,185,129,0.5)" }}
                        />
                      </div>
                      <span
                        style={{
                          color: "rgba(255,255,255,0.18)",
                          fontSize: 11,
                          textAlign: "center",
                        }}
                      >
                        Add screenshot to
                        <br />
                        /public/project-preview.png
                      </span>
                    </div>
                    {/* Hover dark overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(7,9,10,0.5), transparent)",
                      }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-3 p-7 lg:p-10 lg:pl-2 flex flex-col justify-center">
                  {/* Badge */}
                  <span
                    className="inline-block self-start px-3 py-1 rounded-full text-xs font-semibold mb-4"
                    style={{
                      background: "rgba(16,185,129,0.1)",
                      border: "1px solid rgba(16,185,129,0.22)",
                      color: "#34d399",
                    }}
                  >
                    {project.type}
                  </span>

                  <h3
                    className="text-2xl sm:text-3xl font-black text-white mb-1"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-emerald-400 text-sm font-semibold mb-4">
                    {project.subtitle}
                  </p>
                  <p className="text-white/45 text-sm leading-relaxed mb-6 max-w-lg">
                    {project.description}
                  </p>

                  <ul className="space-y-2 mb-7">
                    {project.highlights.map((p) => (
                      <li key={p} className="flex items-start gap-2.5">
                        <CheckCircle
                          size={13}
                          className="text-emerald-500 mt-0.5 shrink-0"
                        />
                        <span className="text-white/45 text-sm leading-relaxed">
                          {p}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono"
                        style={{
                          background: "rgba(16,185,129,0.06)",
                          border: "1px solid rgba(16,185,129,0.15)",
                          color: "rgba(110,231,183,0.55)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 flex-wrap">
                    {/*
                      LIVE DEMO LINK:
                      Replace ADD_MY_LIVE_DEMO_LINK_HERE with your deployed URL
                      e.g. href="https://the-setu.vercel.app"
                    */}
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-emerald-glow flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-black"
                      style={{
                        background: "linear-gradient(135deg, #34d399, #34d399)",
                        transition:
                          "transform 0.25s ease, box-shadow 0.35s ease",
                      }}
                    >
                      <ExternalLink size={14} />
                      Live Demo
                      <ArrowUpRight size={13} />
                    </a>
                    {/*
                      GITHUB LINK:
                      Replace ADD_MY_GITHUB_LINK_HERE with your repo URL
                      e.g. href="https://github.com/krishnadeo/the-setu"
                    */}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-emerald-glow flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white/60"
                      style={{
                        border: "1px solid rgba(16,185,129,0.22)",
                        transition:
                          "border-color 0.25s ease, color 0.25s ease, box-shadow 0.35s ease",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "rgba(52,211,153,0.4)";
                        el.style.color = "rgba(255,255,255,0.85)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "rgba(16,185,129,0.22)";
                        el.style.color = "rgba(255,255,255,0.6)";
                      }}
                    >
                      <Github size={14} />
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Projects;
