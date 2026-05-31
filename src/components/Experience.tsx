import React from "react";
import { experience } from "../data/portfolioData";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { Briefcase, Calendar } from "lucide-react";

const Experience: React.FC = () => {
  const ref = useScrollReveal();
  return (
    <section id="experience" className="py-28 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px]"
          style={{ background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.15), transparent)" }} />
      </div>
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref}>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-emerald-500" />
            <span className="text-emerald-400 text-xs uppercase tracking-[0.22em] font-semibold">Experience</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-12" style={{ letterSpacing: "-0.02em" }}>
            Where I've worked
          </h2>
          <div className="relative pl-14">
            <div className="absolute left-5 top-2 bottom-2 w-px" style={{ background: "linear-gradient(to bottom, rgba(16,185,129,0.5), rgba(16,185,129,0.05))" }} />
            <div className="space-y-8">
              {experience.map((exp) => (
                <div key={exp.role} className="relative group p-7 rounded-2xl transition-all duration-300"
                  style={{ border: "1px solid rgba(16,185,129,0.1)", background: "rgba(16,185,129,0.025)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(16,185,129,0.06)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(16,185,129,0.2)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(16,185,129,0.025)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(16,185,129,0.1)"; }}
                >
                  <div className="absolute -left-[37px] top-8 w-4 h-4 rounded-full border-2 border-emerald-500 bg-[#07090a]" />
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2.5 mb-1">
                        <Briefcase size={14} className="text-emerald-400" />
                        <h3 className="text-white font-bold text-lg">{exp.role}</h3>
                      </div>
                      <p className="text-white/45 text-sm">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-2 text-white/28 text-xs">
                      <Calendar size={12} /><span>{exp.period}</span>
                    </div>
                  </div>
                  <p className="text-white/45 text-sm leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Experience;
