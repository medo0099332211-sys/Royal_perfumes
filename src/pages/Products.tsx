import { useState, useEffect } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/features/ProductCard";
import { useProducts, useScrollReveal } from "@/hooks/useProducts";
import { useLanguage } from "@/hooks/useLanguage";
import { CATEGORIES } from "@/constants/products";

export default function Products() {
  const { products } = useProducts();
  const { t, isRTL } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  useScrollReveal();

  useEffect(() => {
    document.title = `${t("products")} — ${t("brandName")}`;
  }, [t]);

  const filtered = products
    .filter((p) => selectedCategory === "All" || p.category === selectedCategory)
    .filter(
      (p) =>
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "featured") return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      return 0;
    });

  return (
    <div className="bg-royal-black min-h-screen" dir={isRTL ? "rtl" : "ltr"}>
      {/* Page Header */}
      <div className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold-500/4 blur-[100px] rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-4" style={{ animation: "fadeUp 0.7s ease-out 0.2s both" }}>
            <div className="section-divider w-12" />
            <span className="text-xs text-gold-500 tracking-[0.35em] uppercase font-sans">{t("ourCollection")}</span>
            <div className="section-divider w-12" />
          </div>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold mb-4" style={{ animation: "fadeUp 0.7s ease-out 0.4s both" }}>
            <span className="text-white">{t("theCollection")} </span>
            <span className="gold-text">{t("collection")}</span>
          </h1>
          <p className="text-sm text-white/40 max-w-md mx-auto font-sans" style={{ animation: "fadeUp 0.7s ease-out 0.6s both" }}>
            {t("eachFragrance")}
          </p>
        </div>
      </div>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* Filters */}
      <div className="sticky top-[65px] z-30 bg-royal-black/95 backdrop-blur-xl border-b border-gold-500/10 py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Category tabs */}
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded text-xs tracking-widest uppercase font-sans font-medium transition-all duration-300 ${
                    selectedCategory === cat
                      ? "bg-gold-gradient text-royal-black"
                      : "border border-gold-500/20 text-white/50 hover:border-gold-500/40 hover:text-white/70"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search + Sort */}
            <div className="flex gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-56">
                <Search className={`absolute ${isRTL ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/40`} />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("searchFragrances")}
                  className={`input-luxury w-full ${isRTL ? "pr-9 pl-4" : "pl-9 pr-4"} py-2 rounded text-sm`}
                />
              </div>
              <div className="relative">
                <SlidersHorizontal className={`absolute ${isRTL ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gold-500/40 pointer-events-none`} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`input-luxury ${isRTL ? "pr-9 pl-4" : "pl-9 pr-4"} py-2 rounded text-sm appearance-none cursor-pointer`}
                >
                  <option value="default">{t("defaultSort")}</option>
                  <option value="featured">{t("featuredFirst")}</option>
                  <option value="price-asc">{t("priceLowHigh")}</option>
                  <option value="price-desc">{t("priceHighLow")}</option>
                  <option value="name">{t("nameAZ")}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-serif text-xl text-white/30 mb-2">{t("noFragrancesFound")}</p>
            <p className="text-sm text-white/20 font-sans">{t("adjustSearch")}</p>
          </div>
        ) : (
          <>
            <p className="text-xs text-white/30 font-sans mb-8 tracking-wide">
              {filtered.length} {filtered.length !== 1 ? t("fragrances") : t("fragrance")} {t("available")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
              {filtered.map((product, i) => (
                <div key={product.id} className="reveal" style={{ transitionDelay: `${(i % 8) * 0.07}s` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
