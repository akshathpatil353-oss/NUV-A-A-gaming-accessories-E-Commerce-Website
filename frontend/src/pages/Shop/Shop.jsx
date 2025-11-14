import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/product/allproducts");
      setAllProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Extract unique categories from products
  const categories = ["All", ...new Set(allProducts.map((p) => p.category))];

  // Filter products
  const filteredProducts =
    selectedCategory === "All"
      ? allProducts
      : allProducts.filter((p) => p.category === selectedCategory);

  return (
    <div className="shop-container" style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>Shop Products</h2>

      {/* Category Filter */}
      <div style={{ marginBottom: "20px" }}>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            fontSize: "16px",
          }}
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            onClick={() => navigate(`/product/${product._id}`)}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            {/* Product Image */}
            <img
              src={product.images[0]} // FIXED — direct URL
              alt={product.productName}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />

            {/* Product Info */}
            <h3 style={{ marginTop: "10px" }}>{product.productName}</h3>
            <p style={{ color: "#555" }}>₹ {product.price}</p>
            <p style={{ fontSize: "14px", color: "#888" }}>
              Category: {product.category}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
