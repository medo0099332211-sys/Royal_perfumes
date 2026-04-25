import { useEffect } from "react";
import HeroSection from "@/components/features/HeroSection";
import FeaturedProducts from "@/components/features/FeaturedProducts";
import SpecialOffers from "@/components/features/SpecialOffers";
import { useProducts, useScrollReveal } from "@/hooks/useProducts";
import { useLanguage } from "@/hooks/useLanguage";
import { Crown, Gem, Leaf, Globe } from "lucide-react";

export default function Home() {
  const { products } = useProducts();
  const { t, isRTL } = useLanguage();
  useScrollReveal();

  const BRAND_VALUES = [
    { icon: Crown, title: t("royalHeritage"),     description: t("royalHeritageDesc") },
    { icon: Gem,   title: t("rareIngredients"),   description: t("rareIngredientsDesc") },
    { icon: Leaf,  title: t("naturalArtistry"),   description: t("naturalArtistryDesc") },
    { icon: Globe, title: t("globalDelivery"),    description: t("globalDeliveryDesc") },
  ];

  useEffect(() => {
    document.title = `${t("brandName")} — ${t("brandSlogan")}`;
  }, [t]);

  return (
    <div className="bg-royal-black" dir={isRTL ? "rtl" : "ltr"}>
      <HeroSection />
      <FeaturedProducts products={products} />

      {/* Brand Values */}
      <section className="py-20 relative">
        <div className="section-divider max-w-4xl mx-auto mb-20" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14 reveal">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="section-divider w-16" />
              <span className="text-xs text-gold-500 tracking-[0.35em] uppercase font-sans">
                {t("ourPromise")}
              </span>
              <div className="section-divider w-16" />
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white">
              {t("whyChooseUs")} <span className="gold-text">{t("brandName")}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BRAND_VALUES.map((val, i) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="card-luxury rounded-xl p-6 text-center group reveal"
                  style={{ transitionDelay: `${i * 0.12}s` }}
                >
                  <div className="w-14 h-14 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mx-auto mb-4 group-hover:border-gold-500/50 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-gold-500" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-white mb-2">{val.title}</h3>
                  <p className="text-xs text-white/40 font-sans leading-relaxed">{val.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <SpecialOffers products={products} />

      {/* Testimonials */}
      <section className="py-20 relative">
        <div className="section-divider max-w-4xl mx-auto mb-20" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14 reveal">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="section-divider w-16" />
              <span className="text-xs text-gold-500 tracking-[0.35em] uppercase font-sans">
                {t("clientStories")}
              </span>
              <div className="section-divider w-16" />
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white">
              {t("whatClientsSay")} <span className="gold-text">{t("clientsSay")}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "Royal Oud is the most magnificent fragrance I have ever worn. It commands attention and receives endless compliments. Worth every penny.",
                name: "Ahmed Al-Rashid",
                title: "Business Executive",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face&q=80",
              },
              {
                quote: "The Golden Elixir transported me to a Parisian garden. The quality is unmatched — I have tried many luxury brands and nothing compares.",
                name: "Sarah Khalil",
                title: "Fashion Designer",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face&q=80",
              },
              {
                quote: "Midnight Crown is pure power. I wore it to a business meeting and my clients commented on my fragrance before even sitting down. Exceptional.",
                name: "Omar Farouk",
                title: "Entrepreneur",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face&q=80",
              },
            ].map((testimonial, i) => (
              <div
                key={testimonial.name}
                className="card-luxury rounded-xl p-7 reveal"
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <span key={si} className="text-gold-500 text-sm">★</span>
                  ))}
                </div>
                <p className="text-sm text-white/55 font-sans leading-relaxed italic mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover border border-gold-500/20"
                  />
                  <div>
                    <p className="text-sm font-serif font-semibold text-white">{testimonial.name}</p>
                    <p className="text-xs text-gold-600 font-sans">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
