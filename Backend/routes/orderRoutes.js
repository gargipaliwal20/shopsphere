const express = require("express");
const Order = require("../models/Orders");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create new order
router.post("/", authMiddleware, async (req, res) => {
    try {
        const order = await Order.create({
            ...req.body,
            userId: req.userId,
        });

        res.status(201).json(order);
    } catch (error) {
        console.error("Create order error:", error.message);

        res.status(500).json({
            message: "Failed to create order",
        });
    }
});

// Get all orders
router.get("/", authMiddleware, async (req, res) => {
    try {
        const orders = await Order.find({
            userId: req.userId,
        }).sort({ createdAt: -1 });

        res.json(orders);
    } catch (error) {
        console.error("Fetch orders error:", error.message);

        res.status(500).json({
            message: "Failed to fetch orders",
        });
    }
});

module.exports = router;