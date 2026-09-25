import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import BooksHome from './pages/BooksHome';
import OrdersPage from './pages/OrdersPage';
import WishlistPage from './pages/WishlistPage';
import WritersPage from './pages/WritersPage';
import PurchaseSuccessModal from './components/PurchaseSuccessModal/PurchaseSuccessModal';
import { Book, CartItem, Writer, Order } from './types';
import * as api from './api/bookstore';
import './App.css';

type Tab = 'home' | 'my_orders' | 'my_wishlist' | 'my_writers';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [books, setBooks] = useState<Book[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [wishlistBooks, setWishlistBooks] = useState<Book[]>([]);
  const [writers, setWriters] = useState<Writer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [booksLoading, setBooksLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [writersLoading, setWritersLoading] = useState(false);
  const [successOrder, setSuccessOrder] = useState<Order | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  // Load books + cart + wishlist on mount
  useEffect(() => {
    setBooksLoading(true);
    Promise.all([api.fetchBooks(), api.fetchCart(), api.fetchWishlist()])
      .then(([bRes, cRes, wRes]) => {
        setBooks(bRes.data);
        setCartItems(cRes.data);
        setWishlistIds(wRes.ids);
        setWishlistBooks(wRes.data);
      })
      .catch(() => {})
      .finally(() => setBooksLoading(false));
  }, []);

  // Lazy-load tab data
  useEffect(() => {
    if (activeTab === 'my_orders') {
      setOrdersLoading(true);
      api.fetchOrders()
        .then(r => setOrders(r.data))
        .catch(() => {})
        .finally(() => setOrdersLoading(false));
    }
    if (activeTab === 'my_writers') {
      setWritersLoading(true);
      api.fetchWriters()
        .then(r => setWriters(r.data))
        .catch(() => {})
        .finally(() => setWritersLoading(false));
    }
  }, [activeTab]);

  const handleAddToCart = useCallback(async (book: Book) => {
    try {
      const res = await api.addToCart(book.id);
      setCartItems(res.data);
      showToast(`"${book.title}" added to cart`);
    } catch { showToast('Failed to add to cart'); }
  }, []);

  const handleUpdateCartQty = useCallback(async (bookId: string, qty: number) => {
    try {
      const res = await api.updateCartItem(bookId, qty);
      setCartItems(res.data);
    } catch {}
  }, []);

  const handleRemoveFromCart = useCallback(async (bookId: string) => {
    try {
      const res = await api.removeFromCart(bookId);
      setCartItems(res.data);
    } catch {}
  }, []);

  const handleToggleWishlist = useCallback(async (bookId: string) => {
    try {
      const isIn = wishlistIds.includes(bookId);
      const res = isIn
        ? await api.removeFromWishlist(bookId)
        : await api.addToWishlist(bookId);
      setWishlistIds(res.ids);
      setWishlistBooks(res.data);
      showToast(isIn ? 'Removed from wishlist' : 'Added to wishlist');
    } catch {}
  }, [wishlistIds]);

  const handleCheckout = useCallback(async () => {
    if (cartItems.length === 0) return;
    try {
      const res = await api.checkout(cartItems);
      setCartItems([]);
      setSuccessOrder(res.order);
      setOrders(prev => [res.order, ...prev]);
    } catch { showToast('Checkout failed, please try again'); }
  }, [cartItems]);

  const renderTab = () => {
    switch (activeTab) {
      case 'my_orders':
        return <OrdersPage orders={orders} loading={ordersLoading} />;
      case 'my_wishlist':
        return (
          <WishlistPage
            books={wishlistBooks}
            wishlistIds={wishlistIds}
            loading={false}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
          />
        );
      case 'my_writers':
        return <WritersPage writers={writers} loading={writersLoading} />;
      default:
        return (
          <>
            <Hero onBrowse={() => document.getElementById('books-grid')?.scrollIntoView({ behavior: 'smooth' })} />
            <div id="books-grid">
              <BooksHome
                books={books}
                wishlistIds={wishlistIds}
                loading={booksLoading}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
              />
            </div>
          </>
        );
    }
  };

  return (
    <div className="app">
      <Navbar
        cartItems={cartItems}
        wishlistCount={wishlistIds.length}
        activeTab={activeTab}
        onTabChange={(t) => setActiveTab(t as Tab)}
        onUpdateCartQty={handleUpdateCartQty}
        onRemoveFromCart={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />
      <main>{renderTab()}</main>

      <PurchaseSuccessModal order={successOrder} onClose={() => setSuccessOrder(null)} />

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
};

export default App;
