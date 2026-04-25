import { useEffect } from "react";
import { MessageCircle, Send, Phone, Mail, Clock, MapPin, Crown } from "lucide-react";
import { useScrollReveal } from "@/hooks/useProducts";
import { useLanguage } from "@/hooks/useLanguage";

export default function Contact() {
  useScrollReveal();
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    document.title = `${t("contact")} — ${t("brandName")}`;
  }, [t]);

  return (
    <div className="bg-royal-black min-h-screen" dir={isRTL ? "rtl" : "ltr"}>
      {/* Hero */}
      <div className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[300px] bg-gold-500/4 blur-[100px] rounded-full" />
          <div className="absolute top-1/2 right-1/4 w-[300px] h-[200px] bg-gold-500/3 blur-[80px] rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-4" style={{ animation: "fadeUp 0.6s ease-out 0.2s both" }}>
            <div className="section-divider w-12" />
            <span className="text-xs text-gold-500 tracking-[0.35em] uppercase font-sans">{t("getInTouch")}</span>
            <div className="section-divider w-12" />
          </div>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold mb-4" style={{ animation: "fadeUp 0.7s ease-out 0.4s both" }}>
            <span className="text-white">{t("contactUs")} </span>
            <span className="gold-text">Us</span>
          </h1>
          <p className="text-sm text-white/40 max-w-md mx-auto font-sans" style={{ animation: "fadeUp 0.7s ease-out 0.6s both" }}>
            {t("contactSubtitle")}
          </p>
        </div>
      </div>

      <div className="section-divider max-w-4xl mx-auto" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Contact info + Order buttons */}
          <div className="space-y-8">
            <div className="reveal-left">
              <h2 className="font-serif text-2xl font-bold text-white mb-2">
                {t("orderDirectly")} <span className="gold-text">{t("directly")}</span>
              </h2>
              <p className="text-sm text-white/40 font-sans mb-6">{t("orderDirectlySubtitle")}</p>
              <div className="space-y-4">
                <a
                  href="https://wa.me/201143304017"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-btn flex items-center gap-4 p-5 rounded-xl group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm font-sans">{t("chatOnWhatsApp")}</p>
                    <p className="text-xs text-white/70 font-sans">{t("whatsappDesc")}</p>
                  </div>
                </a>

                <a
                  href="https://t.me/royal_perfumss"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="telegram-btn flex items-center gap-4 p-5 rounded-xl group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Send className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm font-sans">{t("messageOnTelegram")}</p>
                    <p className="text-xs text-white/70 font-sans">{t("telegramDesc")}</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="card-luxury rounded-xl p-6 reveal-left space-y-5">
              <h3 className="font-serif text-lg font-semibold text-white mb-4">{t("contactInformation")}</h3>
              {[
                { icon: Phone, label: t("phoneWhatsApp"), value: "+20 114 330 4017", href: "tel:+201143304017" },
                { icon: Mail,  label: t("email"), value: "contact@kingsperfume.com", href: "mailto:contact@kingsperfume.com" },
                { icon: Clock, label: t("responseTime"), value: t("responseTimeValue") },
                { icon: MapPin, label: t("shipsTo"), value: t("shipsToValue") },
              ].map((item) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-gold-500" />
                    </div>
                    <div>
                      <p className="text-xs text-white/30 font-sans tracking-widest uppercase mb-0.5">{item.label}</p>
                      <p className="text-sm text-white/70 font-sans">{item.value}</p>
                    </div>
                  </div>
                );
                return item.href ? (
                  <a key={item.label} href={item.href} className="block hover:text-gold-400 transition-colors">{content}</a>
                ) : (
                  <div key={item.label}>{content}</div>
                );
              })}
            </div>
          </div>

          {/* Right */}
          <div className="reveal-right space-y-6">
            <div className="card-luxury rounded-xl p-8 shimmer-overlay">
              <div className="w-14 h-14 rounded-full bg-gold-gradient flex items-center justify-center mb-6 animate-float">
                <Crown className="w-7 h-7 text-royal-black" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-white mb-4">
                {t("royalPromise")} <span className="gold-text">{t("promise")}</span>
              </h2>
              <p className="text-sm text-white/50 font-sans leading-relaxed mb-6">{t("royalPromiseText")}</p>
              <div className="space-y-3">
                {[
                  t("personalConsultation"),
                  t("securePackaging"),
                  t("worldwideDelivery"),
                  t("authentic"),
                  t("easyExchange"),
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0" />
                    <span className="text-sm text-white/50 font-sans">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-luxury rounded-xl p-6">
              <h3 className="font-serif text-base font-semibold text-white mb-4">{t("availableHours")}</h3>
              <div className="space-y-2">
                {[
                  { day: t("monFri"), hours: t("monFriHours") },
                  { day: t("satSun"), hours: t("satSunHours") },
                  { day: t("whatsappTelegram"), hours: t("whatsappTelegramHours") },
                ].map((item) => (
                  <div key={item.day} className="flex justify-between items-center py-2 border-b border-gold-500/8 last:border-0">
                    <span className="text-xs text-white/40 font-sans">{item.day}</span>
                    <span className="text-xs text-gold-500 font-sans font-medium">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
