import { Link } from "react-router-dom";
import { MessageCircle, Send, Star } from "lucide-react";
import { buildWhatsAppUrl, buildTelegramUrl, formatPrice } from "@/lib/utils";
import { useLanguage } from "@/hooks/useLanguage";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const whatsappUrl = buildWhatsAppUrl(product.name);
  const telegramUrl = buildTelegramUrl();
  const { t } = useLanguage();

  return (
    <div className="card-luxury rounded-lg overflow-hidden group">
      {/* Image */}
      <Link to={`/products/${product.id}`} className="block">
        <div className="product-img-container aspect-[3/4] relative overflow-hidden bg-royal-dark">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-royal-black via-transparent to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.featured && <span className="badge-featured">{t("featured")}</span>}
            {product.discount && <span className="badge-discount">-{product.discount}%</span>}
          </div>

          {/* Quick view overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="glass-card px-4 py-2 text-xs tracking-widest uppercase text-gold-400 font-sans font-semibold rounded">
              {t("viewDetails")}
            </span>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        {/* Rating */}
        <div className="flex items-center gap-0.5 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < product.rating ? "fill-gold-500 text-gold-500" : "text-white/15"}`} />
          ))}
        </div>

        {/* Name */}
        <Link to={`/products/${product.id}`}>
          <h3 className="font-serif text-lg font-semibold text-white hover:text-gold-400 transition-colors duration-300 mb-1 leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Category */}
        <p className="text-xs text-gold-600 tracking-widest uppercase font-sans mb-2">
          {product.category} · {product.volume}
        </p>

        {/* Description */}
        <p className="text-xs text-white/40 font-sans leading-relaxed mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-5">
          <span className="price-tag text-xl">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-white/25 line-through font-sans">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        {/* Order Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn flex items-center justify-center gap-1.5 px-3 py-2.5 rounded text-xs font-semibold font-sans tracking-wide"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            {t("orderViaWhatsApp")}
          </a>
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="telegram-btn flex items-center justify-center gap-1.5 px-3 py-2.5 rounded text-xs font-semibold font-sans tracking-wide"
          >
            <Send className="w-3.5 h-3.5" />
            {t("orderViaTelegram")}
          </a>
        </div>
      </div>
    </div>
  );
}
