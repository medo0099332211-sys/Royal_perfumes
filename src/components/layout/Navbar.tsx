import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Crown } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t, lang, toggleLang, isRTL } = useLanguage();

  const NAV_LINKS = [
    { label: t("home"), path: "/" },
    { label: t("products"), path: "/products" },
    { label: t("contact"), path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav
      dir={isRTL ? "rtl" : "ltr"}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-royal-black/95 backdrop-blur-xl border-b border-gold-500/20 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center group-hover:animate-glow-pulse transition-all duration-300">
            <Crown className="w-4 h-4 text-royal-black" />
          </div>
          <span className="font-serif text-lg font-semibold tracking-wide gold-text">
            {t("brandName")}
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? "active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="btn-outline-gold px-3 py-1.5 rounded text-xs font-bold tracking-widest min-w-[46px]"
            aria-label="Switch language"
          >
            {lang === "en" ? "AR" : "EN"}
          </button>
          <a
            href="https://wa.me/201143304017"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold px-5 py-2 rounded text-xs"
          >
            {t("orderNow")}
          </a>
        </div>

        {/* Mobile: lang + menu */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleLang}
            className="btn-outline-gold px-2.5 py-1 rounded text-xs font-bold"
          >
            {lang === "en" ? "AR" : "EN"}
          </button>
          <button
            className="text-gold-500 hover:text-gold-300 transition-colors p-1"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-royal-black/98 backdrop-blur-xl border-t border-gold-500/10 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link text-base py-2 ${location.pathname === link.path ? "active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://wa.me/201143304017"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold px-5 py-2.5 rounded text-xs text-center"
          >
            {t("orderNow")}
          </a>
        </div>
      </div>
    </nav>
  );
}
