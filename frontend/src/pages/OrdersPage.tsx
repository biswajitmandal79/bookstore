import React from 'react';
import { Order } from '../types';
import './OrdersPage.css';

interface OrdersPageProps {
  orders: Order[];
  loading: boolean;
}

const OrdersPage: React.FC<OrdersPageProps> = ({ orders, loading }) => {
  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner" />
        <p>Loading orders…</p>
      </div>
    );
  }

  return (
    <section className="page-section">
      <div className="page-section-inner">
        <div className="page-header">
          <h2 className="page-heading">My Orders</h2>
          <p className="page-subheading">{orders.length} order{orders.length !== 1 ? 's' : ''} placed</p>
        </div>

        {orders.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📦</span>
            <p>No orders yet</p>
            <span>When you purchase books, they'll appear here.</span>
          </div>
        ) : (
          <ul className="order-list">
            {orders.map((order) => (
              <li key={order.id} className="order-card">
                <div className="order-card-header">
                  <div>
                    <span className="order-id">{order.id}</span>
                    <span className="order-date">{order.date}</span>
                  </div>
                  <div className="order-header-right">
                    <span className={`order-status order-status--${order.status.toLowerCase().replace(/\s/g,'-')}`}>
                      {order.status}
                    </span>
                    <span className="order-total">${order.totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                <ul className="order-items">
                  {order.items.map((item, i) => (
                    <li key={i} className="order-item">
                      <img src={item.book.coverImage} alt={item.book.title} className="order-item-img" />
                      <div className="order-item-info">
                        <p className="order-item-title">{item.book.title}</p>
                        <p className="order-item-author">by {item.book.author}</p>
                        <span className="order-item-category">{item.book.category}</span>
                      </div>
                      <div className="order-item-price">
                        <span>${item.price.toFixed(2)}</span>
                        {item.quantity > 1 && <span className="order-item-qty">× {item.quantity}</span>}
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="order-card-footer">
                  <div className="order-delivery-info">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="3" width="15" height="13" rx="1" /><path d="M16 8h4l3 5v3h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                    <span>Estimated delivery: <strong>{order.deliveryDate}</strong></span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default OrdersPage;
