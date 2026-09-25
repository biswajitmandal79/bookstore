import React, { useEffect } from 'react';
import { Order } from '../../types';
import './PurchaseSuccessModal.css';

interface PurchaseSuccessModalProps {
  order: Order | null;
  onClose: () => void;
}

const PurchaseSuccessModal: React.FC<PurchaseSuccessModalProps> = ({ order, onClose }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (order) {
      document.body.style.overflow = 'hidden';
    }
    return () => { document.body.style.overflow = ''; };
  }, [order]);

  if (!order) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Purchase success">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-success-icon" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div className="modal-header-text">
            <h2 className="modal-title">Purchase Successful!</h2>
            <p className="modal-subtitle">Your order has been confirmed</p>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Order meta */}
        <div className="modal-order-meta">
          <div className="order-meta-item">
            <span className="order-meta-label">Order ID</span>
            <span className="order-meta-value">{order.id}</span>
          </div>
          <div className="order-meta-item">
            <span className="order-meta-label">Date</span>
            <span className="order-meta-value">{order.date}</span>
          </div>
          <div className="order-meta-item">
            <span className="order-meta-label">Status</span>
            <span className="order-meta-status">{order.status}</span>
          </div>
          <div className="order-meta-item">
            <span className="order-meta-label">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:4}}>
                <rect x="1" y="3" width="15" height="13" rx="1" /><path d="M16 8h4l3 5v3h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              Delivery By
            </span>
            <span className="order-meta-value order-delivery">{order.deliveryDate}</span>
          </div>
        </div>

        {/* Books */}
        <div className="modal-body">
          <h3 className="modal-section-title">
            Purchased Books
            <span className="modal-section-count">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</span>
          </h3>
          <ul className="modal-book-list">
            {order.items.map((item, idx) => (
              <li key={idx} className="modal-book-item">
                <img
                  src={item.book.coverImage}
                  alt={item.book.title}
                  className="modal-book-cover"
                />
                <div className="modal-book-info">
                  <p className="modal-book-title">{item.book.title}</p>
                  <p className="modal-book-author">by {item.book.author}</p>
                  <span className="modal-book-category">{item.book.category}</span>
                </div>
                <div className="modal-book-meta">
                  <span className="modal-book-price">${item.price.toFixed(2)}</span>
                  {item.quantity > 1 && (
                    <span className="modal-book-qty">× {item.quantity}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <div className="modal-total">
            <span>Total Paid</span>
            <span className="modal-total-amount">${order.totalAmount.toFixed(2)}</span>
          </div>
          <div className="modal-delivery-note">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            Estimated delivery: <strong>{order.deliveryDate}</strong>
          </div>
          <button className="modal-continue-btn" onClick={onClose}>
            Continue your Shopping
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccessModal;
