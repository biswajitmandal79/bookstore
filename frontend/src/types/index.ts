export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  coverImage: string;
  description: string;
  publishedYear: number;
  pages: number;
  featured: boolean;
}

export interface CartItem {
  bookId: string;
  quantity: number;
  book: Book;
}

export interface Writer {
  id: string;
  name: string;
  bio: string;
  booksCount: number;
  avatar: string;
  followers: string;
}

export interface OrderItem {
  book: Book;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  deliveryDate: string;
  status: string;
  items: OrderItem[];
  totalAmount: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
