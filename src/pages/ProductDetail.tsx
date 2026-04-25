import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { MessageCircle, Send, Star, ArrowLeft, ChevronRight, Droplets } from "lucide-react";
import { useProducts, useScrollReveal } from "@/hooks/useProducts";
import { useLanguage } from "@/hooks/useLanguage";
import { buildWhatsAppUrl, buildTelegramUrl, formatPrice } from "@/lib/utils";
import ProductCard from "@/components/features/ProductCard";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { products, getProduct } = useProducts();
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const product = id ? getProduct(id) : undefined;
  const [activeImage, setActiveImage] = useState(0);
  useScrollReveal();

  useEffect(() => {
    if (product) document.title = `${product.name} — ${t("brandName")}`;
    window.scrollTo(0, 0);
  }, [product, id, t]);

  if (!product) {
    return (
      <div className="min-h-screen bg-royal-black flex items-center justify-center">
        <div className="text-center">
          <p className="font-serif text-2xl text-white/30 mb-4">{t("fragranceNotFound")}</p>
          <Link to="/products" className="btn-gold px-6 py-3 rounded text-sm">{t("backToCollection")}</Link>
        </div>
      </div>
    );
  }

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);

  return (
    <div className="bg-royal-black min-h-screen pt-24" dir={isRTL ? "rtl" : "ltr"}>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
        <div className="flex items-center gap-2 text-xs text-white/30 font-sans">
          <Link to="/" className="hover:text-gold-400 transition-colors">{t("home")}</Link>
          <ChevronRight className={`w-3 h-3 ${isRTL ? "rotate-180" : ""}`} />
          <Link to="/products" className="hover:text-gold-400 transition-colors">{t("products")}</Link>
          <ChevronRight className={`w-3 h-3 ${isRTL ? "rotate-180" : ""}`} />
          <span className="text-gold-500">{product.name}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Images */}
          <div className="reveal-left">
            <div className="aspect-[4/5] rounded-xl overflow-hidden bg-royal-dark mb-4 relative">
              <img src={product.images[activeImage]} alt={product.name} className="w-full h-full object-cover transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-royal-black/30 to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.featured && <span className="badge-featured">{t("featured")}</span>}
                {product.discount && <span className="badge-discount">-{product.discount}%</span>}
              </div>
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 flex-shrink-0 ${
                      activeImage === i ? "border-gold-500 scale-105" : "border-transparent opacity-50 hover:opacity-80"
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="reveal-right">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-xs text-white/30 hover:text-gold-400 transition-colors mb-6 font-sans"
            >
              <ArrowLeft className={`w-3.5 h-3.5 ${isRTL ? "rotate-180" : ""}`} />
              {t("back")}
            </button>

            <p className="text-xs text-gold-500 tracking-[0.3em] uppercase font-sans mb-3">
              {product.category} · {product.volume}
            </p>

            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">{product.name}</h1>

            <div className="flex items-center gap-2 mb-5">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < product.rating ? "fill-gold-500 text-gold-500" : "text-white/15"}`} />
                ))}
              </div>
              <span className="text-xs text-white/30 font-sans">({product.rating}.0)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="price-tag text-3xl">{formatPrice(product.price)}</span>
              {product.originalPrice && <span className="text-lg text-white/25 line-through font-sans">{formatPrice(product.originalPrice)}</span>}
              {product.discount && <span className="badge-discount">{product.discount}% OFF</span>}
            </div>

            <p className="text-sm text-white/60 font-sans leading-relaxed mb-6 border-l-2 border-gold-500/30 pl-4 italic">
              {product.description}
            </p>
            <p className="text-sm text-white/45 font-sans leading-relaxed mb-8">{product.fullDescription}</p>

            {/* Scent Notes */}
            <div className="card-luxury rounded-xl p-6 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Droplets className="w-4 h-4 text-gold-500" />
                <h3 className="font-serif text-base font-semibold text-white">{t("scentPyramid")}</h3>
              </div>
              <div className="space-y-3">
                {[
                  { label: t("topNotes"),   notes: product.notes.top    },
                  { label: t("heartNotes"), notes: product.notes.middle  },
                  { label: t("baseNotes"),  notes: product.notes.base    },
                ].map((group) => (
                  <div key={group.label} className="flex items-start gap-4">
                    <span className="text-xs text-white/30 font-sans w-24 flex-shrink-0 pt-0.5">{group.label}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {group.notes.map((note) => (
                        <span key={note} className="text-xs bg-gold-500/10 border border-gold-500/20 text-gold-400 px-2.5 py-1 rounded font-sans">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Buttons */}
            <div className="space-y-3">
              <a
                href={buildWhatsAppUrl(product.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn w-full flex items-center justify-center gap-2.5 py-4 rounded-lg text-sm font-semibold font-sans"
              >
                <MessageCircle className="w-5 h-5" />
                {t("orderViaWhatsAppFull")}
              </a>
              <a
                href={buildTelegramUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="telegram-btn w-full flex items-center justify-center gap-2.5 py-4 rounded-lg text-sm font-semibold font-sans"
              >
                <Send className="w-5 h-5" />
                {t("orderViaTelegramFull")}
              </a>
            </div>

            <p className="text-xs text-center mt-4 font-sans">
              {product.inStock ? (
                <span className="text-green-400">● {t("inStock")}</span>
              ) : (
                <span className="text-red-400/70">● {t("outOfStock")}</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="border-t border-gold-500/10 py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-10 reveal">
              <h2 className="font-serif text-2xl font-bold text-white">
                {t("youMayAlsoLove")} <span className="gold-text">{t("love")}</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {related.map((p, i) => (
                <div key={p.id} className="reveal" style={{ transitionDelay: `${i * 0.12}s` }}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
