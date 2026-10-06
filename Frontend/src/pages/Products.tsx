import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../data/products";
import apiFetch from "../api/apiFetch";

function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiFetch(
          "http://localhost:5000/api/products"
        );

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <h2>Loading products...</h2>;
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "price-low") {
      return a.price - b.price;
    }

    if (sort === "price-high") {
      return b.price - a.price;
    }

    if (sort === "name") {
      return a.name.localeCompare(b.name);
    }

    return 0;
  });

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>All Products</h1>
        <p>Find the perfect products for you</p>
      </div>

      {/* Search and Filter */}
      <div className="products-filters">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
        </select>
      </div>

      {/* Sort */}
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="default">Sort By</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="name">Name: A-Z</option>
      </select>

      {/* Products */}
      <div className="products-grid">
        {sortedProducts.map((product) => (
          <div className="product-card" key={product._id}>
            <img
              src={product.image}
              alt={product.name}
            />

            <div className="product-info">
              <span>{product.category}</span>

              <h2>{product.name}</h2>

              <p>₹{product.price}</p>

              <Link to={`/products/${product._id}`}>
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-products">
          <h2>No products found 😔</h2>
          <p>Try a different search or category.</p>
        </div>
      )}
    </div>
  );
}

export default Products;