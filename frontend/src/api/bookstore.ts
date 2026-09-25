import { Book, CartItem, Writer, Order, ApiResponse } from '../types';

const BASE_URL = 'http://localhost:5001/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`Request failed: ${res.statusText}`);
  return res.json();
}

// Books
export const fetchBooks = (params?: { category?: string; search?: string; featured?: boolean }) => {
  const qs = new URLSearchParams();
  if (params?.category) qs.set('category', params.category);
  if (params?.search) qs.set('search', params.search);
  if (params?.featured !== undefined) qs.set('featured', String(params.featured));
  return request<ApiResponse<Book[]>>(`/books${qs.toString() ? '?' + qs.toString() : ''}`);
};

// Writers
export const fetchWriters = () => request<ApiResponse<Writer[]>>('/writers');

// Cart
export const fetchCart = () => request<ApiResponse<CartItem[]>>('/cart');

export const addToCart = (bookId: string, quantity = 1) =>
  request<ApiResponse<CartItem[]>>('/cart', {
    method: 'POST',
    body: JSON.stringify({ bookId, quantity }),
  });

export const updateCartItem = (bookId: string, quantity: number) =>
  request<ApiResponse<CartItem[]>>(`/cart/${bookId}`, {
    method: 'PUT',
    body: JSON.stringify({ quantity }),
  });

export const removeFromCart = (bookId: string) =>
  request<ApiResponse<CartItem[]>>(`/cart/${bookId}`, { method: 'DELETE' });

export const clearCart = () =>
  request<ApiResponse<CartItem[]>>('/cart', { method: 'DELETE' });

// Wishlist
export const fetchWishlist = () =>
  request<ApiResponse<Book[]> & { ids: string[] }>('/wishlist');

export const addToWishlist = (bookId: string) =>
  request<ApiResponse<Book[]> & { ids: string[] }>(`/wishlist/${bookId}`, { method: 'POST' });

export const removeFromWishlist = (bookId: string) =>
  request<ApiResponse<Book[]> & { ids: string[] }>(`/wishlist/${bookId}`, { method: 'DELETE' });

// Orders
export const fetchOrders = () => request<ApiResponse<Order[]>>('/orders');

export const checkout = (items: CartItem[]) =>
  request<{ success: boolean; message: string; order: Order }>('/checkout', {
    method: 'POST',
    body: JSON.stringify({ items }),
  });
