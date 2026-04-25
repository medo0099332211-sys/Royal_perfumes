import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import heroImg from "@/assets/hero-bg.jpg";
import { useLanguage } from "@/hooks/useLanguage";

const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 8}s`,
  duration: `${8 + Math.random() * 10}s`,
  size: `${2 + Math.random() * 3}px`,
}));

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    const handleParallax = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        const bg = heroRef.current.querySelector(".hero-parallax-bg") as HTMLElement;
        if (bg) {
          bg.style.transform = `translateY(${scrollY * 0.4}px) scale(1.1)`;
        }
      }
    };
    window.addEventListener("scroll", handleParallax, { passive: true });
    return () => window.removeEventListener("scroll", handleParallax);
  }, []);

  return (
    <section
      ref={heroRef}
      dir={isRTL ? "rtl" : "ltr"}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Parallax Background */}
      <div className="hero-parallax-bg absolute inset-0 will-change-transform">
        <img
          src={heroImg}
          alt="Kings for Perfume Hero"
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Particles */}
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            width: p.size,
            height: p.size,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-24">
        <div className={`max-w-3xl ${isRTL ? "mr-auto" : ""}`}>
          {/* Eyebrow */}
          <div
            className="flex items-center gap-3 mb-6"
            style={{ animation: "fadeUp 0.7s ease-out 0.2s both" }}
          >
            <div className="section-divider w-12" />
            <span className="text-xs text-gold-500 tracking-[0.35em] uppercase font-sans font-medium">
              {t("luxuryFragrances")}
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] mb-6"
            style={{ animation: "fadeUp 0.8s ease-out 0.4s both" }}
          >
            {isRTL ? (
              <span className="gold-text-animate">{t("brandName")}</span>
            ) : (
              <>
                <span className="text-white">Kings for</span>
                <br />
                <span className="gold-text-animate">Perfume</span>
              </>
            )}
          </h1>

          {/* Tagline */}
          <p
            className="font-serif text-xl sm:text-2xl text-white/70 italic mb-4 leading-relaxed"
            style={{ animation: "fadeUp 0.8s ease-out 0.6s both" }}
          >
            {t("brandSlogan")}
          </p>

          {/* Sub description */}
          <p
            className="font-sans text-sm text-white/45 leading-relaxed max-w-xl mb-10"
            style={{ animation: "fadeUp 0.8s ease-out 0.75s both" }}
          >
            {t("heroSubline")}
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-wrap items-center gap-4"
            style={{ animation: "fadeUp 0.8s ease-out 0.9s both" }}
          >
            <Link to="/products" className="btn-gold px-8 py-3.5 rounded text-sm">
              {t("exploreCollection")}
            </Link>
            <a
              href="https://wa.me/201143304017"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold px-8 py-3.5 rounded text-sm"
            >
              {t("orderNow")}
            </a>
          </div>

          {/* Stats */}
          <div
            className="flex items-center gap-8 mt-14"
            style={{ animation: "fadeUp 0.8s ease-out 1.1s both" }}
          >
            {[
              { value: "100+", label: t("uniqueScents") },
              { value: "15K+", label: t("happyClients") },
              { value: "12yr", label: t("ofExcellence") },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-2xl font-bold gold-text">{stat.value}</p>
                <p className="text-xs text-white/40 tracking-widest uppercase font-sans mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#featured"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gold-500/60 hover:text-gold-400 transition-colors duration-300 z-10"
        style={{ animation: "fadeIn 1s ease-out 1.5s both" }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase font-sans">{t("discover")}</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
}
