import { Link } from "react-router-dom";
import { Tag, MessageCircle, Send, Sparkles } from "lucide-react";
import featuredBg from "@/assets/featured-bg.jpg";
import type { Product } from "@/types";

interface SpecialOffersProps {
  products: Product[];
}

export default function SpecialOffers({ products }: SpecialOffersProps) {
  const discounted = products.filter((p) => p.discount).slice(0, 4);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Divider */}
      <div className="section-divider max-w-4xl mx-auto mb-24" />

      {/* Banner CTA */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="relative rounded-2xl overflow-hidden reveal">
          <img
            src={featuredBg}
            alt="Special Collection"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-royal-black via-royal-black/80 to-transparent" />
          <div className="relative z-10 py-16 px-10 lg:px-16 lg:w-2/3">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-gold-500" />
              <span className="text-xs text-gold-500 tracking-[0.3em] uppercase font-sans">Exclusive Collection</span>
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4 leading-snug">
              The Art of <br />
              <span className="gold-text">Rare Perfumery</span>
            </h2>
            <p className="text-sm text-white/50 font-sans leading-relaxed mb-8 max-w-md">
              Discover our exclusive limited-edition fragrances, crafted with the rarest 
              ingredients sourced from the corners of the world. An experience reserved for the few.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://wa.me/201143304017"
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn flex items-center gap-2 px-6 py-3 rounded text-sm font-semibold font-sans"
              >
                <MessageCircle className="w-4 h-4" />
                Order via WhatsApp
              </a>
              <a
                href="https://t.me/royal_perfumss"
                target="_blank"
                rel="noopener noreferrer"
                className="telegram-btn flex items-center gap-2 px-6 py-3 rounded text-sm font-semibold font-sans"
              >
                <Send className="w-4 h-4" />
                Order via Telegram
              </a>
            </div>
          </div>
        </div>

        {/* Special Offers Grid */}
        {discounted.length > 0 && (
          <div className="mt-24">
            <div className="text-center mb-12 reveal">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="section-divider w-16" />
                <span className="text-xs text-gold-500 tracking-[0.35em] uppercase font-sans">
                  Special Offers
                </span>
                <div className="section-divider w-16" />
              </div>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-3">
                Limited <span className="gold-text">Promotions</span>
              </h2>
              <p className="text-sm text-white/40 font-sans">
                Exclusive discounts on our most sought-after fragrances
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {discounted.map((product, i) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="card-luxury rounded-lg overflow-hidden group reveal"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div className="product-img-container aspect-square overflow-hidden bg-royal-dark">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="badge-discount flex items-center gap-1">
                        <Tag className="w-2.5 h-2.5" />
                        -{product.discount}%
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-base font-semibold text-white group-hover:text-gold-400 transition-colors duration-300 mb-1">
                      {product.name}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="price-tag text-base">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-white/25 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
