import React from "react";
import { skillCategories } from "../data/portfolioData";
import { useScrollReveal } from "../hooks/useScrollReveal";
import {
  Code2,
  Layout,
  Server,
  Database,
  Wrench,
  ShieldCheck,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);
const iconMap: Record<string, React.ElementType> = {
  Code2,
  Layout,
  Server,
  Database,
  Wrench,
  ShieldCheck,
};

const Skills: React.FC = () => {
  const ref = useScrollReveal();
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll(".skill-card");
    if (!cards) return;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
          once: true,
        },
      },
    );
  }, []);

  return (
    <section id="skills" className="py-28 relative">
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
        <div ref={ref}>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-emerald-500" />
            <span className="text-emerald-400 text-xs uppercase tracking-[0.22em] font-semibold">
              Skills
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <h2
              className="text-4xl sm:text-5xl font-black text-white leading-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              What I work with
            </h2>
            <p className="text-white/30 text-sm max-w-xs leading-relaxed">
              Tools and technologies I reach for when building things.
            </p>
          </div>

          <div
            ref={cardsRef}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {skillCategories.map((cat) => {
              const Icon = iconMap[cat.icon];
              return (
                <div
                  key={cat.title}
                  className="skill-card group p-6 rounded-2xl transition-all duration-350"
                  style={{
                    border: "1px solid rgba(16,185,129,0.1)",
                    background: "rgba(16,185,129,0.025)",
                    opacity: 0,
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      y: -4,
                      duration: 0.3,
                      ease: "power2.out",
                    });
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(16,185,129,0.22)";
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(16,185,129,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      y: 0,
                      duration: 0.4,
                      ease: "power3.out",
                    });
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(16,185,129,0.1)";
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(16,185,129,0.025)";
                  }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: "rgba(16,185,129,0.1)" }}
                    >
                      {Icon && <Icon size={16} className="text-emerald-400" />}
                    </div>
                    <h3 className="text-white/75 font-bold text-sm">
                      {cat.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="skill-chip px-3 py-1.5 rounded-lg text-xs font-medium cursor-default transition-all duration-200"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          color: "rgba(255,255,255,0.5)",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Skills;
