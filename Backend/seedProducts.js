require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [
  {
    name: "Wireless Headphones",
    price: 2499,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    description:
      "Premium wireless headphones with comfortable design and clear sound quality.",
  },
  {
    name: "Smart Watch",
    price: 3999,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    description:
      "Smart watch with fitness tracking, notifications and modern design.",
  },
  {
    name: "Running Shoes",
    price: 2999,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    description:
      "Comfortable running shoes designed for everyday workouts and running.",
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
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected ✅");

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Products inserted successfully ✅");

    process.exit();
  } catch (error) {
    console.error("Error ❌", error.message);
    process.exit(1);
  }
};

seedProducts();