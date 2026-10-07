require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [
  // ==================== ELECTRONICS ====================
  {
    name: "Wireless Headphones",
    price: 2499,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    description:
      "Premium wireless headphones with comfortable design, deep bass and clear sound quality.",
  },
  {
    name: "Smart Watch",
    price: 3999,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    description:
      "Smart watch with fitness tracking, notifications, heart-rate monitoring and a modern design.",
  },
  {
    name: "Bluetooth Speaker",
    price: 1799,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    description:
      "Portable Bluetooth speaker with powerful audio, compact design and long battery life.",
  },
  {
    name: "Wireless Keyboard",
    price: 1499,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
    description:
      "Slim wireless keyboard designed for comfortable typing at home or in the office.",
  },
  {
    name: "Wireless Mouse",
    price: 899,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db",
    description:
      "Ergonomic wireless mouse with precise tracking and comfortable grip.",
  },
  {
    name: "Laptop Backpack",
    price: 2299,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    description:
      "Spacious laptop backpack with dedicated compartments for laptops, accessories and daily essentials.",
  },

  // ==================== FASHION ====================
  {
    name: "Running Shoes",
    price: 2999,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    description:
      "Comfortable running shoes designed for everyday workouts, walking and running.",
  },
  {
    name: "Leather Backpack",
    price: 1999,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    description:
      "Stylish and durable backpack suitable for work, travel and everyday use.",
  },
  {
    name: "Classic Denim Jacket",
    price: 2499,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923",
    description:
      "Classic denim jacket with a versatile design that works well for casual outfits.",
  },
  {
    name: "Casual Cotton T-Shirt",
    price: 799,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    description:
      "Soft cotton T-shirt designed for comfortable everyday wear.",
  },
  {
    name: "Classic Sunglasses",
    price: 1299,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
    description:
      "Stylish sunglasses with a classic frame suitable for everyday outdoor use.",
  },
  {
    name: "Casual Sneakers",
    price: 2799,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772",
    description:
      "Comfortable casual sneakers with a clean design for everyday styling.",
  },

  // ==================== HOME & KITCHEN ====================
  {
    name: "Ceramic Coffee Mug",
    price: 499,
    category: "Home & Kitchen",
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a",
    description:
      "Minimal ceramic coffee mug perfect for tea, coffee and everyday use.",
  },
  {
    name: "Modern Table Lamp",
    price: 1499,
    category: "Home & Kitchen",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
    description:
      "Modern table lamp that adds warm and comfortable lighting to your workspace or bedroom.",
  },
  {
    name: "Non-Stick Cookware Set",
    price: 3499,
    category: "Home & Kitchen",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f",
    description:
      "Durable non-stick cookware set designed for convenient everyday cooking.",
  },
  {
    name: "Cotton Cushion Set",
    price: 999,
    category: "Home & Kitchen",
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2",
    description:
      "Soft cotton cushion covers with a modern design for living rooms and bedrooms.",
  },
  {
    name: "Wooden Wall Shelf",
    price: 1299,
    category: "Home & Kitchen",
    image:
      "https://images.unsplash.com/photo-1594620302200-9a762244a156",
    description:
      "Minimal wooden wall shelf for displaying books, plants and home accessories.",
  },

  // ==================== BEAUTY ====================
  {
    name: "Face Moisturizer",
    price: 699,
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8",
    description:
      "Lightweight daily moisturizer designed to keep skin hydrated and fresh.",
  },
  {
    name: "Perfume",
    price: 1899,
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601",
    description:
      "Elegant fragrance with a fresh and long-lasting scent suitable for everyday occasions.",
  },
  {
    name: "Makeup Brush Set",
    price: 999,
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
    description:
      "Professional-style makeup brush set with soft bristles for smooth application.",
  },
  {
    name: "Skincare Essentials Kit",
    price: 1599,
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b",
    description:
      "Complete skincare kit with everyday essentials for a simple beauty routine.",
  },

  // ==================== SPORTS ====================
  {
    name: "Yoga Mat",
    price: 899,
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1592432678016-e910b452f9a2",
    description:
      "Non-slip yoga mat with comfortable cushioning for yoga, stretching and workouts.",
  },
  {
    name: "Fitness Dumbbells",
    price: 1499,
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61",
    description:
      "Compact dumbbell set suitable for strength training and home workouts.",
  },
  {
    name: "Sports Water Bottle",
    price: 599,
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
    description:
      "Reusable sports water bottle designed for gym sessions, running and outdoor activities.",
  },
  {
    name: "Football",
    price: 999,
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55",
    description:
      "Durable football suitable for recreational games, practice sessions and outdoor play.",
  },
  {
    name: "Gym Gloves",
    price: 699,
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e",
    description:
      "Comfortable workout gloves providing grip and support during strength training.",
  },

  // ==================== ACCESSORIES ====================
  {
    name: "Classic Wrist Watch",
    price: 2199,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d",
    description:
      "Classic wrist watch with a clean dial and timeless design for everyday wear.",
  },
  {
    name: "Leather Wallet",
    price: 899,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93",
    description:
      "Compact leather wallet with multiple card slots and a practical everyday design.",
  },
  {
    name: "Minimal Bracelet",
    price: 599,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d",
    description:
      "Minimal bracelet designed to complement both casual and formal outfits.",
  },
  {
    name: "Travel Organizer",
    price: 799,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1553531384-cc64ac80f931",
    description:
      "Compact travel organizer for keeping cables, chargers and small accessories together.",
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected ✅");

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log(`${products.length} products inserted successfully ✅`);

    process.exit();
  } catch (error) {
    console.error("Error ❌", error.message);
    process.exit(1);
  }
};

seedProducts();