import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer: React.FC = () => (
  <footer
    className="py-12"
    style={{ borderTop: "1px solid rgba(16,185,129,0.1)" }}
  >
    <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-white/20 text-sm">
        <span
          className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-black text-[#07090a]"
          style={{ background: "linear-gradient(135deg, #10b981, #34d399)" }}
        >
          K
        </span>
        <span>
          <span className="text-white/35 font-medium">Krishna Deo</span> · Built
          with React & Tailwind
        </span>
      </div>
      <div className="flex items-center gap-3">
        {[
          { icon: Github, href: "#" },
          { icon: Linkedin, href: "#" },
          { icon: Mail, href: "mailto:krishnadeo@example.com" },
        ].map(({ icon: Icon, href }, i) => (
          <a
            key={i}
            href={href}
            className="p-2 rounded-lg text-white/25 hover:text-emerald-400/60 transition-colors duration-300"
          >
            <Icon size={15} />
          </a>
        ))}
      </div>
    </div>
  </footer>
);
export default Footer;
