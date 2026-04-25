import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/features/ProductCard";
import type { Product } from "@/types";

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const featured = products.filter((p) => p.featured).slice(0, 3);

  return (
    <section id="featured" className="py-24 relative">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold-500/3 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 reveal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="section-divider w-16" />
            <span className="text-xs text-gold-500 tracking-[0.35em] uppercase font-sans">
              Curated Selection
            </span>
            <div className="section-divider w-16" />
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">
            Featured <span className="gold-text">Fragrances</span>
          </h2>
          <p className="text-sm text-white/40 max-w-lg mx-auto font-sans leading-relaxed">
            Our most beloved masterpieces — handpicked for those who demand only the finest.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((product, i) => (
            <div
              key={product.id}
              className="reveal"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12 reveal">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 btn-outline-gold px-8 py-3 rounded text-sm group"
          >
            View All Products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
