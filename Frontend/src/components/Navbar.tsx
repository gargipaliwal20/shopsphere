import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";

function Navbar() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    const cart = useCartStore((state) => state.cart);
    const wishlist = useWishlistStore(
        (state) => state.wishlist
    );

    const wishlistCount = wishlist.length;

    const cartCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                ShopSphere 🛒
            </Link>

            <div className="nav-links">
                <Link to="/products">
                    Products
                </Link>

                <Link to="/wishlist" className="wishlist-link">
                    Wishlist ❤️

                    {wishlistCount > 0 && (
                        <span className="wishlist-count">
                            {wishlistCount}
                        </span>
                    )}
                </Link>

                {token && (
                    <Link to="/orders" className="orders-link">
                        My Orders
                    </Link>
                )}

                <Link to="/cart" className="cart-link">
                    Cart 🛒
                    {cartCount > 0 && (
                        <span className="cart-count">
                            {cartCount}
                        </span>
                    )}
                </Link>

                {token ? (
                    <div className="user-section">
                        <span>Hi, {user?.name}</span>

                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;