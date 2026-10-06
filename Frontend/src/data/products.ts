export interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export const products: Product[] = [
  {
    _id: "1",
    name: "Wireless Headphones",
    price: 2499,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    description:
      "Premium wireless headphones with comfortable design and clear sound quality.",
  },
  {
    _id: "2",
    name: "Smart Watch",
    price: 3999,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    description:
      "Smart watch with fitness tracking, notifications and modern design.",
  },
  {
    _id: "3",
    name: "Running Shoes",
    price: 2999,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    description:
      "Comfortable running shoes designed for everyday workouts and running.",
  },
  {
    _id: "4",
    name: "Leather Backpack",
    price: 1999,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    description:
      "Stylish and durable backpack suitable for work, travel and everyday use.",
  },
];