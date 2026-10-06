import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import apiFetch from "../api/apiFetch";

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiFetch("http://localhost:5000/api/orders");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();

        setOrders(data);
      } catch (error) {
        console.error("Fetch orders error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="empty-orders">
        <h1>Loading Orders...</h1>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="empty-orders">
        <h1>No Orders Yet 📦</h1>

        <p>You haven't placed any orders yet.</p>

        <Link to="/products">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h1>My Orders</h1>
        <p>Track and manage your recent orders</p>
      </div>

      <div className="orders-list">
        {orders.map((order) => (
          <div className="order-card" key={order.id}>

            <div className="order-header">
              <div>
                <h2>Order #{order._id.slice(-6)}</h2>
                <p>{new Date(order.createdAt).toLocaleString()}</p>
              </div>

              <span className="order-status">
                Order Placed
              </span>
            </div>

            <div className="order-products">
              {order.items.map((item) => (
                <div className="order-product" key={item.productId}>
                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div>
                    <h3>{item.name}</h3>

                    <p>
                      ₹{item.price} × {item.quantity}
                    </p>

                    <strong>
                      ₹{item.price * item.quantity}
                    </strong>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-details">
              <div>
                <h3>Delivery Address</h3>

                <p>{order.customer.name}</p>
                <p>{order.customer.address}</p>
                <p>
                  {order.customer.city} -{" "}
                  {order.customer.pincode}
                </p>
                <p>{order.customer.phone}</p>
              </div>

              <div>
                <h3>Payment</h3>

                <p>{order.paymentMethod}</p>

                <h2>Total: ₹{order.total}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;