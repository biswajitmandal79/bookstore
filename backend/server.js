const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// In-memory mock database
let books = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    category: "Fiction & Fantasy",
    price: 18.99,
    originalPrice: 24.99,
    rating: 4.8,
    reviewsCount: 1240,
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600",
    description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
    publishedYear: 2020,
    pages: 304,
    featured: true
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self-Development",
    price: 21.50,
    originalPrice: 27.00,
    rating: 4.9,
    reviewsCount: 3500,
    coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600",
    description: "An easy and proven way to build good habits and break bad ones. Transform your daily routines and achieve extraordinary results.",
    publishedYear: 2018,
    pages: 320,
    featured: true
  },
  {
    id: "3",
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    category: "Technology & Programming",
    price: 34.99,
    originalPrice: 45.00,
    rating: 4.7,
    reviewsCount: 890,
    coverImage: "https://images.unsplash.com/photo-1532012164546-f432f2e3edd9?auto=format&fit=crop&q=80&w=600",
    description: "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees.",
    publishedYear: 2008,
    pages: 464,
    featured: false
  },
  {
    id: "4",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    category: "Technology & Programming",
    price: 39.95,
    originalPrice: 49.99,
    rating: 4.9,
    reviewsCount: 1540,
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600",
    description: "The big ideas behind reliable, scalable, and maintainable systems. Key principles and architectures for modern software.",
    publishedYear: 2017,
    pages: 616,
    featured: true
  },
  {
    id: "5",
    title: "A Court of Thorns and Roses",
    author: "Sarah J. Maas",
    category: "Fiction & Fantasy",
    price: 16.50,
    originalPrice: 22.00,
    rating: 4.6,
    reviewsCount: 2310,
    coverImage: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=600",
    description: "A thrilling, seductive blend of fairy tale retelling and passionate romance in a vivid world of high fae.",
    publishedYear: 2015,
    pages: 432,
    featured: false
  },
  {
    id: "6",
    title: "Deep Work: Rules for Focused Success",
    author: "Cal Newport",
    category: "Self-Development",
    price: 19.20,
    originalPrice: 25.00,
    rating: 4.7,
    reviewsCount: 1100,
    coverImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600",
    description: "Deep work is the ability to focus without distraction on a cognitively demanding task. Master the ultimate superpower.",
    publishedYear: 2016,
    pages: 304,
    featured: false
  },
  {
    id: "7",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Business & Finance",
    price: 17.80,
    originalPrice: 23.50,
    rating: 4.8,
    reviewsCount: 2750,
    coverImage: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=600",
    description: "Doing well with money isn't necessarily about what you know. It's about how you behave. 19 short stories on wealth and greed.",
    publishedYear: 2020,
    pages: 256,
    featured: true
  },
  {
    id: "8",
    title: "Dune",
    author: "Frank Herbert",
    category: "Sci-Fi & Space",
    price: 22.00,
    originalPrice: 28.00,
    rating: 4.8,
    reviewsCount: 4200,
    coverImage: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=600",
    description: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world.",
    publishedYear: 1965,
    pages: 688,
    featured: true
  }
];

let writers = [
  {
    id: "w1",
    name: "Matt Haig",
    bio: "English novelist and journalist whose work has been translated into over 50 languages.",
    booksCount: 12,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
    followers: "125K"
  },
  {
    id: "w2",
    name: "James Clear",
    bio: "Author, speaker, and writer focused on habits, decision making, and continuous improvement.",
    booksCount: 3,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    followers: "450K"
  },
  {
    id: "w3",
    name: "Martin Kleppmann",
    bio: "Associate Professor in computer science and distributed systems researcher at University of Cambridge.",
    booksCount: 4,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
    followers: "89K"
  },
  {
    id: "w4",
    name: "Morgan Housel",
    bio: "Partner at The Collaborative Fund and former columnist at The Wall Street Journal and The Motley Fool.",
    booksCount: 2,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300",
    followers: "310K"
  }
];

let cart = [
  {
    bookId: "1",
    quantity: 1,
    book: books[0]
  },
  {
    bookId: "2",
    quantity: 1,
    book: books[1]
  }
];

let wishlist = ["1", "4", "7"];

let orders = [
  {
    id: "ORD-94821",
    date: new Date(Date.now() - 24 * 3600 * 1000 * 3).toISOString().split('T')[0],
    deliveryDate: new Date(Date.now() + 24 * 3600 * 1000 * 2).toISOString().split('T')[0],
    status: "In Transit",
    items: [
      {
        book: books[0],
        quantity: 1,
        price: 18.99
      },
      {
        book: books[1],
        quantity: 1,
        price: 21.50
      }
    ],
    totalAmount: 40.49
  }
];

// Helper to compute delivery date formatted
function getEstimatedDeliveryDate(daysFromNow = 3) {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + daysFromNow);
  const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
  return targetDate.toLocaleDateString('en-US', options);
}

// Routes
// 1. Get Books (with search, category filter)
app.get('/api/books', (req, res) => {
  const { category, search, featured } = req.query;
  let result = [...books];

  if (category && category !== 'All') {
    result = result.filter(b => b.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const s = search.toLowerCase();
    result = result.filter(b => 
      b.title.toLowerCase().includes(s) || 
      b.author.toLowerCase().includes(s) ||
      b.category.toLowerCase().includes(s)
    );
  }

  if (featured === 'true') {
    result = result.filter(b => b.featured);
  }

  res.json({
    success: true,
    data: result
  });
});

// 2. Get single book
app.get('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === req.params.id);
  if (!book) {
    return res.status(404).json({ success: false, message: 'Book not found' });
  }
  res.json({ success: true, data: book });
});

// 3. Get Writers
app.get('/api/writers', (req, res) => {
  res.json({ success: true, data: writers });
});

// 4. Cart routes
app.get('/api/cart', (req, res) => {
  res.json({ success: true, data: cart });
});

app.post('/api/cart', (req, res) => {
  const { bookId, quantity = 1 } = req.body;
  const book = books.find(b => b.id === bookId);
  if (!book) {
    return res.status(404).json({ success: false, message: 'Book not found' });
  }

  const existingIndex = cart.findIndex(item => item.bookId === bookId);
  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      bookId,
      quantity,
      book
    });
  }
  res.json({ success: true, data: cart, message: 'Book added to cart' });
});

app.put('/api/cart/:bookId', (req, res) => {
  const { bookId } = req.params;
  const { quantity } = req.body;

  const itemIndex = cart.findIndex(item => item.bookId === bookId);
  if (itemIndex === -1) {
    return res.status(404).json({ success: false, message: 'Item not in cart' });
  }

  if (quantity <= 0) {
    cart = cart.filter(item => item.bookId !== bookId);
  } else {
    cart[itemIndex].quantity = quantity;
  }
  res.json({ success: true, data: cart });
});

app.delete('/api/cart/:bookId', (req, res) => {
  const { bookId } = req.params;
  cart = cart.filter(item => item.bookId !== bookId);
  res.json({ success: true, data: cart, message: 'Item removed from cart' });
});

app.delete('/api/cart', (req, res) => {
  cart = [];
  res.json({ success: true, data: cart, message: 'Cart cleared' });
});

// 5. Wishlist routes
app.get('/api/wishlist', (req, res) => {
  const wishlistBooks = books.filter(b => wishlist.includes(b.id));
  res.json({ success: true, data: wishlistBooks, ids: wishlist });
});

app.post('/api/wishlist/:bookId', (req, res) => {
  const { bookId } = req.params;
  if (!wishlist.includes(bookId)) {
    wishlist.push(bookId);
  }
  const wishlistBooks = books.filter(b => wishlist.includes(b.id));
  res.json({ success: true, data: wishlistBooks, ids: wishlist, message: 'Added to wishlist' });
});

app.delete('/api/wishlist/:bookId', (req, res) => {
  const { bookId } = req.params;
  wishlist = wishlist.filter(id => id !== bookId);
  const wishlistBooks = books.filter(b => wishlist.includes(b.id));
  res.json({ success: true, data: wishlistBooks, ids: wishlist, message: 'Removed from wishlist' });
});

// 6. Orders and Checkout
app.get('/api/orders', (req, res) => {
  res.json({ success: true, data: orders });
});

app.post('/api/checkout', (req, res) => {
  const { items, customDeliveryDays } = req.body;
  const checkoutItems = items && items.length > 0 ? items : cart;

  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ success: false, message: 'No items to purchase' });
  }

  const deliveryDays = customDeliveryDays || 3;
  const estimatedDelivery = getEstimatedDeliveryDate(deliveryDays);
  
  const totalAmount = checkoutItems.reduce((sum, item) => {
    return sum + (item.book.price * item.quantity);
  }, 0);

  const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

  const newOrder = {
    id: orderId,
    date: new Date().toISOString().split('T')[0],
    deliveryDate: estimatedDelivery,
    status: "Confirmed",
    items: checkoutItems.map(item => ({
      book: item.book,
      quantity: item.quantity,
      price: item.book.price
    })),
    totalAmount: Number(totalAmount.toFixed(2))
  };

  orders.unshift(newOrder);

  // Clear current cart upon successful checkout
  cart = [];

  res.json({
    success: true,
    message: "Purchase completed successfully!",
    order: newOrder
  });
});

app.listen(PORT, () => {
  console.log(`Book Worm Backend Server running on http://localhost:${PORT}`);
});
