import React, { useState, useEffect } from "react";
import ProductDetails from "./ProductDetails";
import productsData from "../../data/products.json"; // make sure this file exists in src/data/

export default function ProductList() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  return (
    <div className="App">
      {!selectedProduct ? (
        <div className="profile-card">
          <h1>Stationery Products</h1>
          <p>Discover our selection of notebooks, pens, and office essentials.</p>
          <hr />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="profile-card"
                style={{
                  width: "260px",
                  padding: "20px",
                  cursor: "pointer",
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    marginBottom: "10px",
                  }}
                />
                <h3>{product.name}</h3>
                <p>₱{product.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <ProductDetails
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
