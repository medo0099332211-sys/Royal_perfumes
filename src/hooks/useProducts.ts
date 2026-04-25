import { useState, useEffect, useCallback } from "react";
import type { Product } from "@/types";
import { DEFAULT_PRODUCTS } from "@/constants/products";
import { generateId } from "@/lib/utils";

const STORAGE_KEY = "royal_perfumes_products";

function loadProducts(): Product[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
    return DEFAULT_PRODUCTS;
  } catch {
    return DEFAULT_PRODUCTS;
  }
}

function saveProducts(products: Product[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch {
    console.error("Failed to save products to localStorage");
  }
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(() => loadProducts());

  const addProduct = useCallback((data: Omit<Product, "id">) => {
    const newProduct: Product = { ...data, id: generateId() };
    setProducts((prev) => {
      const updated = [newProduct, ...prev];
      saveProducts(updated);
      return updated;
    });
    return newProduct;
  }, []);

  const updateProduct = useCallback((id: string, data: Partial<Product>) => {
    setProducts((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, ...data } : p));
      saveProducts(updated);
      return updated;
    });
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      saveProducts(updated);
      return updated;
    });
  }, []);

  const getProduct = useCallback(
    (id: string) => products.find((p) => p.id === id),
    [products]
  );

  const getFeaturedProducts = useCallback(
    () => products.filter((p) => p.featured),
    [products]
  );

  const getProductsByCategory = useCallback(
    (category: string) =>
      category === "All" ? products : products.filter((p) => p.category === category),
    [products]
  );

  const resetToDefaults = useCallback(() => {
    saveProducts(DEFAULT_PRODUCTS);
    setProducts(DEFAULT_PRODUCTS);
  }, []);

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getFeaturedProducts,
    getProductsByCategory,
    resetToDefaults,
  };
}

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem("kings_admin_auth") === "true";
  });

  const login = useCallback((username: string, password: string): boolean => {
    if (username === "admin" && password === "0099332211") {
      sessionStorage.setItem("kings_admin_auth", "true");
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem("kings_admin_auth");
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, login, logout };
}

export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const elements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
