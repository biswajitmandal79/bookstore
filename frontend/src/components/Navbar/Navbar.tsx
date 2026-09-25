import React, { useState } from 'react';
import { CartItem } from '../../types';
import CartSidebar from './CartSidebar';
import './Navbar.css';

interface NavbarProps {
  cartItems: CartItem[];
  wishlistCount: number;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onUpdateCartQty: (bookId: string, qty: number) => void;
  onRemoveFromCart: (bookId: string) => void;
  onCheckout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  wishlistCount,
  activeTab,
  onTabChange,
  onUpdateCartQty,
  onRemoveFromCart,
  onCheckout,
}) => {
  const [cartOpen, setCartOpen] = useState(false);
  const totalQty = cartItems.reduce((s, i) => s + i.quantity, 0);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          {/* Brand */}
          <button className="navbar-brand" onClick={() => onTabChange('home')}>
            <span className="brand-icon">📚</span>
            <span className="brand-text">Book Worm</span>
          </button>

          {/* Nav links */}
          <ul className="navbar-links">
            {['My Orders', 'My Wishlist', 'My Writers'].map((label) => {
              const key = label.toLowerCase().replace(/\s+/g, '_');
              return (
                <li key={key}>
                  <button
                    className={`nav-link ${activeTab === key ? 'active' : ''}`}
                    onClick={() => onTabChange(key)}
                  >
                    {label}
                    {label === 'My Wishlist' && wishlistCount > 0 && (
                      <span className="badge">{wishlistCount}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right icons */}
          <div className="navbar-actions">
            <button
              className="icon-btn cart-btn"
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {totalQty > 0 && <span className="badge">{totalQty}</span>}
            </button>
            <button className="icon-btn profile-btn" aria-label="Profile">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={onUpdateCartQty}
        onRemove={onRemoveFromCart}
        onCheckout={() => { setCartOpen(false); onCheckout(); }}
      />
    </>
  );
};

export default Navbar;
