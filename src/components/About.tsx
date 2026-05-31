import React from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { Layers, Globe, ShieldCheck } from "lucide-react";

const pillars = [
  {
    icon: Layers,
    label: "Full Stack",
    desc: "React on the frontend, Node.js + Express on the backend, MongoDB as the data layer.",
  },
  {
    icon: Globe,
    label: "Web-Focused",
    desc: "Responsive, accessible UIs with clean component architecture and APIs that make sense.",
  },
  {
    icon: ShieldCheck,
    label: "Security Aware",
    desc: "JWT, bcrypt, OTP — building apps that are robust and secure from the ground up.",
  },
];

const About: React.FC = () => {
  const ref = useScrollReveal();
  return (
    <section id="about" className="py-28 relative">
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
              About
            </span>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2
                className="text-4xl sm:text-5xl font-black text-white leading-tight mb-6"
                style={{ letterSpacing: "-0.02em" }}
              >
                Building the web,{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #10b981, #34d399)",
                  }}
                >
                  end to end.
                </span>
              </h2>
              <div className="space-y-4 text-white/50 leading-relaxed text-[1.04rem]">
                <p>
                  I'm a Computer Science student at Parul Institute of
                  Engineering and Technology, Vadodara — graduating in 2027.
                  Aspiring Full Stack Development and focused on building
                  products that are fast, scalable, and genuinely useful.
                </p>
                <p>
                  I enjoy turning complex ideas into clean user experiences,
                  designing reliable backend systems, and creating applications
                  that solve real problems. Whether it's a responsive frontend,
                  a secure API, or an AI-powered feature, I care about building
                  things that people actually enjoy using.
                </p>
                <p>
                  My cybersecurity background sharpens how I think about auth
                  flows, secure coding, and data protection — I build apps that
                  are safer by design, not as an afterthought.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-white/25 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                B.Tech CSE · Parul University · 2023–2027
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {pillars.map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="group flex items-start gap-4 p-5 rounded-2xl transition-all duration-300"
                  style={{
                    border: "1px solid rgba(16,185,129,0.12)",
                    background: "rgba(16,185,129,0.03)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(16,185,129,0.07)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(16,185,129,0.22)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(16,185,129,0.03)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(16,185,129,0.12)";
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300"
                    style={{ background: "rgba(16,185,129,0.1)" }}
                  >
                    <Icon size={18} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-bold text-white/85 text-sm mb-1">
                      {label}
                    </p>
                    <p className="text-white/40 text-sm leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
