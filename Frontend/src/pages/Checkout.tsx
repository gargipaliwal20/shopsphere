import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import apiFetch from "../api/apiFetch";

const Checkout = () => {
  const navigate = useNavigate();

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
  e.preventDefault();

  if (cart.length === 0) {
    alert("Your cart is empty 🛒");
    navigate("/products");
    return;
  }

  const order = {
    items: cart.map((item) => ({
      productId: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: item.quantity,
    })),
    total,
    customer: formData,
    paymentMethod,
  };

  try {
    const response = await apiFetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error("Failed to place order");
    }

    await response.json();

    alert("Order placed successfully! 🎉");

    clearCart();

    navigate("/orders");
  } catch (error) {
    console.error("Place order error:", error);
    alert("Failed to place order. Please try again.");
  }
};

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <form onSubmit={handlePlaceOrder}>
        <h2>Delivery Information</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <textarea
          name="address"
          placeholder="Delivery Address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={handleChange}
          required
        />

        <h2>Payment Method</h2>

        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="COD">Cash on Delivery</option>
          <option value="UPI">UPI</option>
          <option value="CARD">Card</option>
        </select>

        <h2>Order Summary</h2>

        {cart.map((item) => (
          <div key={item.id}>
            <p>
              {item.name} × {item.quantity}
            </p>

            <p>
              ₹{item.price * item.quantity}
            </p>
          </div>
        ))}

        <h3>Total: ₹{total}</h3>

        <button type="submit">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;