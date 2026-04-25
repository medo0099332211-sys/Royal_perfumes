import { useState, useEffect } from "react";
import { X, Plus, Minus } from "lucide-react";
import type { Product } from "@/types";

interface AdminProductFormProps {
  product?: Product | null;
  onSave: (data: Omit<Product, "id">) => void;
  onCancel: () => void;
}

const EMPTY_FORM = {
  name: "",
  price: 0,
  originalPrice: undefined as number | undefined,
  description: "",
  fullDescription: "",
  images: [""],
  category: "Oriental",
  featured: false,
  discount: undefined as number | undefined,
  inStock: true,
  rating: 5,
  notes: { top: [""], middle: [""], base: [""] },
  volume: "100ml",
};

export default function AdminProductForm({ product, onSave, onCancel }: AdminProductFormProps) {
  const [form, setForm] = useState<typeof EMPTY_FORM>(() =>
    product
      ? {
          ...product,
          images: product.images.length > 0 ? product.images : [""],
          notes: {
            top: product.notes.top.length > 0 ? product.notes.top : [""],
            middle: product.notes.middle.length > 0 ? product.notes.middle : [""],
            base: product.notes.base.length > 0 ? product.notes.base : [""],
          },
        }
      : EMPTY_FORM
  );

  useEffect(() => {
    if (product) {
      setForm({
        ...product,
        images: product.images.length > 0 ? product.images : [""],
        notes: {
          top: product.notes.top.length > 0 ? product.notes.top : [""],
          middle: product.notes.middle.length > 0 ? product.notes.middle : [""],
          base: product.notes.base.length > 0 ? product.notes.base : [""],
        },
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [product]);

  const updateField = (field: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateArrayField = (field: "images", idx: number, val: string) => {
    setForm((prev) => {
      const arr = [...prev[field]];
      arr[idx] = val;
      return { ...prev, [field]: arr };
    });
  };

  const addArrayField = (field: "images") => {
    setForm((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayField = (field: "images", idx: number) => {
    setForm((prev) => ({ ...prev, [field]: prev[field].filter((_, i) => i !== idx) }));
  };

  const updateNote = (type: "top" | "middle" | "base", idx: number, val: string) => {
    setForm((prev) => {
      const arr = [...prev.notes[type]];
      arr[idx] = val;
      return { ...prev, notes: { ...prev.notes, [type]: arr } };
    });
  };

  const addNote = (type: "top" | "middle" | "base") => {
    setForm((prev) => ({
      ...prev,
      notes: { ...prev.notes, [type]: [...prev.notes[type], ""] },
    }));
  };

  const removeNote = (type: "top" | "middle" | "base", idx: number) => {
    setForm((prev) => ({
      ...prev,
      notes: { ...prev.notes, [type]: prev.notes[type].filter((_, i) => i !== idx) },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedData = {
      ...form,
      images: form.images.filter((img) => img.trim()),
      notes: {
        top: form.notes.top.filter((n) => n.trim()),
        middle: form.notes.middle.filter((n) => n.trim()),
        base: form.notes.base.filter((n) => n.trim()),
      },
    };
    onSave(cleanedData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative glass-card rounded-xl w-full max-w-2xl my-8 z-10">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gold-500/15">
          <h2 className="font-serif text-xl text-gold-400">
            {product ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            onClick={onCancel}
            className="text-white/40 hover:text-white/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name & Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gold-500 tracking-widest uppercase mb-1.5 font-sans">
                Product Name *
              </label>
              <input
                required
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="input-luxury w-full px-3 py-2.5 rounded text-sm"
                placeholder="Royal Oud..."
              />
            </div>
            <div>
              <label className="block text-xs text-gold-500 tracking-widest uppercase mb-1.5 font-sans">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => updateField("category", e.target.value)}
                className="input-luxury w-full px-3 py-2.5 rounded text-sm"
              >
                <option value="Oud">Oud</option>
                <option value="Floral">Floral</option>
                <option value="Oriental">Oriental</option>
                <option value="Fresh">Fresh</option>
                <option value="Woody">Woody</option>
              </select>
            </div>
          </div>

          {/* Price & Original Price */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gold-500 tracking-widest uppercase mb-1.5 font-sans">
                Price ($) *
              </label>
              <input
                required
                type="number"
                min={0}
                value={form.price || ""}
                onChange={(e) => updateField("price", parseFloat(e.target.value) || 0)}
                className="input-luxury w-full px-3 py-2.5 rounded text-sm"
                placeholder="299"
              />
            </div>
            <div>
              <label className="block text-xs text-gold-500 tracking-widest uppercase mb-1.5 font-sans">
                Original Price ($)
              </label>
              <input
                type="number"
                min={0}
                value={form.originalPrice || ""}
                onChange={(e) => updateField("originalPrice", parseFloat(e.target.value) || undefined)}
                className="input-luxury w-full px-3 py-2.5 rounded text-sm"
                placeholder="380"
              />
            </div>
            <div>
              <label className="block text-xs text-gold-500 tracking-widest uppercase mb-1.5 font-sans">
                Discount (%)
              </label>
              <input
                type="number"
                min={0}
                max={99}
                value={form.discount || ""}
                onChange={(e) => updateField("discount", parseInt(e.target.value) || undefined)}
                className="input-luxury w-full px-3 py-2.5 rounded text-sm"
                placeholder="20"
              />
            </div>
          </div>

          {/* Volume & Rating */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gold-500 tracking-widest uppercase mb-1.5 font-sans">
                Volume
              </label>
              <input
                value={form.volume}
                onChange={(e) => updateField("volume", e.target.value)}
                className="input-luxury w-full px-3 py-2.5 rounded text-sm"
                placeholder="100ml"
              />
            </div>
            <div>
              <label className="block text-xs text-gold-500 tracking-widest uppercase mb-1.5 font-sans">
                Rating (1–5)
              </label>
              <select
                value={form.rating}
                onChange={(e) => updateField("rating", parseInt(e.target.value))}
                className="input-luxury w-full px-3 py-2.5 rounded text-sm"
              >
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>{r} Star{r > 1 ? "s" : ""}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-xs text-gold-500 tracking-widest uppercase mb-1.5 font-sans">
              Short Description *
            </label>
            <input
              required
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              className="input-luxury w-full px-3 py-2.5 rounded text-sm"
              placeholder="A brief tagline for the product..."
            />
          </div>

          {/* Full Description */}
          <div>
            <label className="block text-xs text-gold-500 tracking-widest uppercase mb-1.5 font-sans">
              Full Description
            </label>
            <textarea
              rows={4}
              value={form.fullDescription}
              onChange={(e) => updateField("fullDescription", e.target.value)}
              className="input-luxury w-full px-3 py-2.5 rounded text-sm resize-none"
              placeholder="Detailed product description..."
            />
          </div>

          {/* Images */}
          <div>
            <label className="block text-xs text-gold-500 tracking-widest uppercase mb-1.5 font-sans">
              Product Images (URLs)
            </label>
            <div className="space-y-2">
              {form.images.map((img, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    value={img}
                    onChange={(e) => updateArrayField("images", idx, e.target.value)}
                    className="input-luxury flex-1 px-3 py-2 rounded text-sm"
                    placeholder="https://..."
                  />
                  {form.images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayField("images", idx)}
                      className="text-red-400/70 hover:text-red-400 p-2"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayField("images")}
                className="text-gold-500/60 hover:text-gold-400 text-xs flex items-center gap-1 font-sans"
              >
                <Plus className="w-3.5 h-3.5" /> Add Image
              </button>
            </div>
          </div>

          {/* Notes */}
          {(["top", "middle", "base"] as const).map((noteType) => (
            <div key={noteType}>
              <label className="block text-xs text-gold-500 tracking-widest uppercase mb-1.5 font-sans">
                {noteType.charAt(0).toUpperCase() + noteType.slice(1)} Notes
              </label>
              <div className="space-y-2">
                {form.notes[noteType].map((note, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      value={note}
                      onChange={(e) => updateNote(noteType, idx, e.target.value)}
                      className="input-luxury flex-1 px-3 py-2 rounded text-sm"
                      placeholder="e.g. Bergamot..."
                    />
                    {form.notes[noteType].length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeNote(noteType, idx)}
                        className="text-red-400/70 hover:text-red-400 p-2"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addNote(noteType)}
                  className="text-gold-500/60 hover:text-gold-400 text-xs flex items-center gap-1 font-sans"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Note
                </button>
              </div>
            </div>
          ))}

          {/* Toggles */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <div
                className={`w-10 h-5 rounded-full transition-colors duration-300 relative ${
                  form.featured ? "bg-gold-500" : "bg-white/10"
                }`}
                onClick={() => updateField("featured", !form.featured)}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                    form.featured ? "left-5" : "left-0.5"
                  }`}
                />
              </div>
              <span className="text-sm text-white/60 font-sans">Featured</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <div
                className={`w-10 h-5 rounded-full transition-colors duration-300 relative ${
                  form.inStock ? "bg-gold-500" : "bg-white/10"
                }`}
                onClick={() => updateField("inStock", !form.inStock)}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                    form.inStock ? "left-5" : "left-0.5"
                  }`}
                />
              </div>
              <span className="text-sm text-white/60 font-sans">In Stock</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2 border-t border-gold-500/10">
            <button type="button" onClick={onCancel} className="btn-outline-gold flex-1 py-3 rounded text-sm">
              Cancel
            </button>
            <button type="submit" className="btn-gold flex-1 py-3 rounded text-sm">
              {product ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
