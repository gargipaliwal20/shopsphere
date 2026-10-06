import { Link } from "react-router-dom";
import { useWishlistStore } from "../store/wishlistStore";

const Wishlist = () => {
  const wishlist = useWishlistStore((state) => state.wishlist);
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist
  );

  if (wishlist.length === 0) {
    return (
      <div className="empty-wishlist">
        <h1>Your Wishlist is Empty ❤️</h1>
        <p>Save products you love and find them here later.</p>

        <Link to="/products">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h1>My Wishlist ❤️</h1>
        <p>Your saved products</p>
      </div>

      <div className="wishlist-grid">
        {wishlist.map((item) => (
          <div className="wishlist-card" key={item.id}>
            <img src={item.image} alt={item.name} />

            <div className="wishlist-info">
              <h2>{item.name}</h2>

              <p>₹{item.price}</p>

              <Link to={`/products/${item.id}`}>
                View Product
              </Link>

              <button
                onClick={() =>
                  removeFromWishlist(item.id)
                }
              >
                Remove ❤️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;