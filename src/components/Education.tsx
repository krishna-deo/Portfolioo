import React from "react";
import { education } from "../data/portfolioData";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { GraduationCap, MapPin } from "lucide-react";

const Education: React.FC = () => {
  const ref = useScrollReveal();
  return (
    <section id="education" className="py-24 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px]"
          style={{ background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.15), transparent)" }} />
      </div>
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref}>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-emerald-500" />
            <span className="text-emerald-400 text-xs uppercase tracking-[0.22em] font-semibold">Education</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-12" style={{ letterSpacing: "-0.02em" }}>
            Academic background
          </h2>
          {education.map((edu) => (
            <div key={edu.institution} className="group p-8 rounded-2xl transition-all duration-300 max-w-2xl"
              style={{ border: "1px solid rgba(16,185,129,0.1)", background: "rgba(16,185,129,0.025)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(16,185,129,0.06)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(16,185,129,0.2)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(16,185,129,0.025)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(16,185,129,0.1)"; }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(16,185,129,0.1)" }}>
                <GraduationCap size={22} className="text-emerald-400" />
              </div>
              <h3 className="text-white font-bold text-lg mb-1">{edu.degree}</h3>
              <p className="text-emerald-400/75 text-sm font-semibold mb-3">{edu.institution}</p>
              <div className="flex items-center gap-4 text-white/30 text-xs">
                <span>{edu.period}</span>
                <span className="w-1 h-1 rounded-full bg-white/15" />
                <div className="flex items-center gap-1"><MapPin size={11} /><span>{edu.location}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Education;
