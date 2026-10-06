import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";
import type { Product } from "../data/products";
import apiFetch from "../api/apiFetch";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const addToCart = useCartStore((state) => state.addToCart);

  const addToWishlist = useWishlistStore(
    (state) => state.addToWishlist
  );

  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist
  );

  const wishlist = useWishlistStore(
    (state) => state.wishlist
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiFetch(
          `http://localhost:5000/api/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();

        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <h1>Loading product...</h1>;
  }

  if (!product) {
    return <h1>Product not found</h1>;
  }

  const isWishlisted = wishlist.some(
    (item) => item.id === product._id
  );

  const handleAddToCart = () => {
  addToCart({
    id: product._id,
    name: product.name,
    price: product.price,
    image: product.image,
    quantity: 1,
  });
};

  return (
    <div className="product-details">
      <div className="product-details-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-details-info">
        <span>{product.category}</span>

        <h1>{product.name}</h1>

        <h2>₹{product.price}</h2>

        <p>{product.description}</p>

        <button onClick={handleAddToCart}>
          Add to Cart 🛒
        </button>

        <button
          className="wishlist-button"
          onClick={() => {
            if (isWishlisted) {
              removeFromWishlist(product._id);
            } else {
              addToWishlist({
                id: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
              });
            }
          }}
        >
          {isWishlisted
            ? "❤️ Remove from Wishlist"
            : "♡ Add to Wishlist"}
        </button>

        <Link to="/products">
          ← Back to Products
        </Link>
      </div>
    </div>
  );
}

export default ProductDetails;