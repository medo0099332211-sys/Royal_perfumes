import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return `$${price.toLocaleString()}`;
}

export function buildWhatsAppUrl(productName: string): string {
  const message = encodeURIComponent(`I want to order ${productName} from Royal Perfumes`);
  return `https://wa.me/201143304017?text=${message}`;
}

export function buildTelegramUrl(): string {
  return `https://t.me/royal_perfumss`;
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
