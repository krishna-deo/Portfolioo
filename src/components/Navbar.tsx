import React, { useState, useEffect } from "react";
import { navLinks } from "../data/portfolioData";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map((n) => n.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 130) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    document
      .getElementById(href.replace("#", ""))
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    /* No border-b on not-scrolled state — avoids the white line artifact */
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled ? "rgba(7,9,10,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(18px) saturate(150%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(16,185,129,0.1)" : "none",
        transition:
          "background 0.5s ease, backdrop-filter 0.5s ease, border-bottom 0.5s ease",
        padding: scrolled ? "12px 0" : "20px 0",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNav("#home");
          }}
          className="flex items-center gap-1.5 text-white font-bold text-base tracking-tight select-none"
        >
          <span
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-[#07090a]"
            style={{ background: "linear-gradient(135deg, #10b981, #34d399)" }}
          >
            K
          </span>
          <span>
            rishna<span className="text-emerald-500">.</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = active === id;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(link.href);
                }}
                className="relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-300"
                style={{
                  color: isActive ? "#34d399" : "rgba(255,255,255,0.42)",
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLElement).style.color =
                      "rgba(255,255,255,0.82)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLElement).style.color =
                      "rgba(255,255,255,0.42)";
                }}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-0.5 rounded-full bg-emerald-400" />
                )}
              </a>
            );
          })}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            handleNav("#contact");
          }}
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-[#07090a] btn-emerald-glow"
          style={{ background: "linear-gradient(135deg, #34d399, #34d399)" }}
        >
          Hire Me
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white/55 hover:text-white transition-colors p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        style={{
          overflow: "hidden",
          maxHeight: menuOpen ? "340px" : "0",
          opacity: menuOpen ? 1 : 0,
          transition: "max-height 0.35s ease, opacity 0.25s ease",
          background: "rgba(7,9,10,0.96)",
          backdropFilter: "blur(18px)",
          borderBottom: menuOpen ? "1px solid rgba(16,185,129,0.1)" : "none",
        }}
      >
        <div className="px-6 py-5 flex flex-col gap-1">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(link.href);
                }}
                className="px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                style={{
                  color: active === id ? "#34d399" : "rgba(255,255,255,0.55)",
                }}
              >
                {link.label}
              </a>
            );
          })}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNav("#contact");
            }}
            className="mt-3 px-4 py-3 rounded-lg text-sm font-semibold text-center text-[#07090a]"
            style={{ background: "linear-gradient(135deg, #34d399, #34d399)" }}
          >
            Hire Me
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
