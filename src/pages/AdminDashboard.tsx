import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Crown, Plus, Pencil, Trash2, LogOut, Package,
  Star, Tag, Eye, Search, RotateCcw
} from "lucide-react";
import { useProducts, useAdminAuth } from "@/hooks/useProducts";
import { useLanguage } from "@/hooks/useLanguage";
import AdminProductForm from "@/components/features/AdminProductForm";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";
import { toast } from "sonner";

export default function AdminDashboard() {
  const { isAuthenticated, logout } = useAdminAuth();
  const { products, addProduct, updateProduct, deleteProduct, resetToDefaults } = useProducts();
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) navigate("/admin");
    document.title = `${t("adminDashboard")} — ${t("brandName")}`;
  }, [isAuthenticated, navigate, t]);

  const handleLogout = () => {
    logout();
    navigate("/admin");
    toast.success(t("loggedOutSuccess"));
  };

  const handleSave = (data: Omit<Product, "id">) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, data);
      toast.success(`"${data.name}" updated`);
    } else {
      addProduct(data);
      toast.success(`"${data.name}" added`);
    }
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = (id: string, name: string) => {
    setDeletingId(id);
    setTimeout(() => {
      deleteProduct(id);
      setDeletingId(null);
      toast.success(`"${name}" removed`);
    }, 300);
  };

  const handleReset = () => {
    if (window.confirm(t("resetConfirm"))) {
      resetToDefaults();
      toast.success(t("resetSuccess"));
    }
  };

  const filtered = products.filter(
    (p) =>
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: products.length,
    featured: products.filter((p) => p.featured).length,
    discounted: products.filter((p) => p.discount).length,
    inStock: products.filter((p) => p.inStock).length,
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-royal-black" dir={isRTL ? "rtl" : "ltr"}>
      {/* Top Bar */}
      <header className="bg-royal-dark/95 backdrop-blur-xl border-b border-gold-500/15 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center">
              <Crown className="w-4 h-4 text-royal-black" />
            </div>
            <div>
              <h1 className="font-serif text-base font-semibold text-white">{t("adminDashboard")}</h1>
              <p className="text-xs text-gold-500 font-sans">{t("brandName")}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="text-xs text-white/40 hover:text-gold-400 transition-colors font-sans flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              {t("viewSite")}
            </button>
            <button
              onClick={handleLogout}
              className="btn-outline-gold px-4 py-2 rounded text-xs flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              {t("logout")}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: t("totalProducts"),    value: stats.total,     icon: Package, color: "text-gold-400" },
            { label: t("featuredProducts"), value: stats.featured,  icon: Star,    color: "text-gold-500" },
            { label: t("onDiscount"),       value: stats.discounted,icon: Tag,     color: "text-gold-600" },
            { label: t("inStockCount"),     value: stats.inStock,   icon: Package, color: "text-green-400" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="card-luxury rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                  <span className="text-xs text-white/25 font-sans">{stat.label}</span>
                </div>
                <p className="font-serif text-3xl font-bold text-white">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
          <h2 className="font-serif text-xl font-semibold text-white">
            {t("productManagement")} <span className="gold-text">{t("management")}</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className={`absolute ${isRTL ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/40`} />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("searchProducts")}
                className={`input-luxury ${isRTL ? "pr-9 pl-4" : "pl-9 pr-4"} py-2 rounded text-sm w-48`}
              />
            </div>
            <button onClick={handleReset} className="btn-outline-gold px-4 py-2 rounded text-xs flex items-center gap-1.5" title="Reset to defaults">
              <RotateCcw className="w-3.5 h-3.5" />
              {t("reset")}
            </button>
            <button onClick={() => { setEditingProduct(null); setShowForm(true); }} className="btn-gold px-4 py-2 rounded text-xs flex items-center gap-1.5">
              <Plus className="w-4 h-4" />
              {t("addProduct")}
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className="card-luxury rounded-xl overflow-hidden">
          <div className="hidden lg:grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 px-6 py-3 border-b border-gold-500/10 text-xs text-gold-500 tracking-widest uppercase font-sans">
            <span>{t("image")}</span>
            <span>{t("product")}</span>
            <span>{t("price")}</span>
            <span>{t("category")}</span>
            <span>{t("status")}</span>
            <span>{t("actions")}</span>
          </div>

          <div className="divide-y divide-gold-500/6">
            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <Package className="w-10 h-10 text-white/10 mx-auto mb-3" />
                <p className="text-white/30 font-sans text-sm">{t("noProductsFound")}</p>
              </div>
            ) : (
              filtered.map((product) => (
                <div
                  key={product.id}
                  className={`flex flex-col lg:grid lg:grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 px-6 py-4 items-start lg:items-center transition-all duration-300 hover:bg-gold-500/3 ${
                    deletingId === product.id ? "opacity-0 scale-95" : "opacity-100 scale-100"
                  }`}
                >
                  <div className="w-12 h-14 rounded overflow-hidden bg-royal-dark flex-shrink-0">
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-serif font-semibold text-white text-sm">{product.name}</p>
                      {product.featured && <span className="badge-featured text-[9px]">{t("featured")}</span>}
                      {product.discount && <span className="badge-discount text-[9px]">-{product.discount}%</span>}
                    </div>
                    <p className="text-xs text-white/30 font-sans mt-0.5 truncate">{product.description}</p>
                  </div>
                  <div className="lg:text-right">
                    <p className="price-tag text-sm">{formatPrice(product.price)}</p>
                    {product.originalPrice && (
                      <p className="text-xs text-white/20 line-through font-sans">{formatPrice(product.originalPrice)}</p>
                    )}
                  </div>
                  <span className="text-xs text-gold-600 font-sans tracking-wide">{product.category}</span>
                  <span className={`text-xs font-sans ${product.inStock ? "text-green-400" : "text-red-400/60"}`}>
                    {product.inStock ? "● In Stock" : "○ Out of Stock"}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="w-8 h-8 rounded flex items-center justify-center border border-gold-500/20 text-gold-500/60 hover:text-gold-400 hover:border-gold-500/50 transition-all duration-200"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      className="w-8 h-8 rounded flex items-center justify-center border border-red-500/20 text-red-500/50 hover:text-red-400 hover:border-red-500/40 transition-all duration-200"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <p className="text-xs text-white/20 font-sans mt-4 text-center">
          {filtered.length} {filtered.length !== 1 ? t("fragrances") : t("fragrance")} · {t("changesAutoSaved")}
        </p>
      </div>

      {showForm && (
        <AdminProductForm
          product={editingProduct}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditingProduct(null); }}
        />
      )}
    </div>
  );
}
