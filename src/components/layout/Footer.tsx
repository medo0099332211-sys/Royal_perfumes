import { Link } from "react-router-dom";
import { Crown, MessageCircle, Send, Instagram, Mail, Settings } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export default function Footer() {
  const { t, isRTL } = useLanguage();

  return (
    <footer
      dir={isRTL ? "rtl" : "ltr"}
      className="relative bg-royal-black border-t border-gold-500/15 pt-16 pb-8 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-gold-500/3 blur-[80px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-full bg-gold-gradient flex items-center justify-center">
                <Crown className="w-5 h-5 text-royal-black" />
              </div>
              <span className="font-serif text-2xl font-semibold gold-text">{t("brandName")}</span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs font-sans">
              {t("crafting")}
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://wa.me/201143304017"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-gold-500/25 flex items-center justify-center text-gold-500 hover:bg-gold-500/10 hover:border-gold-500/50 transition-all duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://t.me/royal_perfumss"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-gold-500/25 flex items-center justify-center text-gold-500 hover:bg-gold-500/10 hover:border-gold-500/50 transition-all duration-300"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-gold-500/25 flex items-center justify-center text-gold-500 hover:bg-gold-500/10 hover:border-gold-500/50 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-gold-500 tracking-widest uppercase mb-5">
              {t("navigation")}
            </h4>
            <ul className="space-y-3">
              {[
                { label: t("home"), path: "/" },
                { label: t("ourProducts"), path: "/products" },
                { label: t("contact"), path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/40 hover:text-gold-400 transition-colors duration-300 font-sans"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Order */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-gold-500 tracking-widest uppercase mb-5">
              {t("orderNowSection")}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/201143304017"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/40 hover:text-gold-400 transition-colors duration-300 font-sans flex items-center gap-2"
                >
                  <MessageCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/royal_perfumss"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/40 hover:text-gold-400 transition-colors duration-300 font-sans flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5 flex-shrink-0" />
                  Telegram
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@kingsperfume.com"
                  className="text-sm text-white/40 hover:text-gold-400 transition-colors duration-300 font-sans flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                  {t("email")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider max-w-full mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p className="text-xs text-white/30 font-sans tracking-wide">
              © {new Date().getFullYear()} {t("brandName")}. {t("allRightsReserved")}.
            </p>
            {/* Store Management link */}
            <Link
              to="/admin"
              className="flex items-center gap-1.5 text-xs text-white/15 hover:text-gold-500/50 transition-colors duration-300 font-sans group"
            >
              <Settings className="w-3 h-3 group-hover:rotate-45 transition-transform duration-300" />
              {t("storeManagement")}
            </Link>
          </div>
          <p className="text-xs font-sans tracking-widest">
            <span className="text-white/25">{t("developedBy")} </span>
            <span className="gold-text font-semibold">Mido (M-E-D-O)</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
