import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
  }).format(new Date(date));
}

export function formatDateTime(date: Date | string) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date));
}

export function getStockStatus(onHand: number, reserved: number, lowStock: number = 5) {
  const available = onHand - reserved;
  
  if (available <= 0) {
    return { status: 'out-of-stock', label: 'Out of Stock', color: 'red' };
  } else if (available <= lowStock) {
    return { status: 'low-stock', label: `Only ${available} left`, color: 'orange' };
  } else {
    return { status: 'in-stock', label: 'In Stock', color: 'green' };
  }
}

export function generateSKU(prefix: string = 'SKU') {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return `${prefix}-${timestamp}-${random}`.toUpperCase();
}

export function truncate(str: string, length: number) {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}
