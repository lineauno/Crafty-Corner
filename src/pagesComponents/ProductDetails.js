import React from "react";
//testing
export default function ProductDetails({ product, onBack }) {
  return (
    <div className="App">
      <div className="profile-card">
        <button
          onClick={onBack}
          style={{
            backgroundColor: "#4299e1",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "25px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          ← Back to Products
        </button>

        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            maxWidth: "400px",
            borderRadius: "12px",
            marginBottom: "20px",
          }}
        />

        <h1>{product.name}</h1>
        <p style={{ fontSize: "1.2em", color: "#2b6cb0" }}>
          ₱{product.price.toFixed(2)}
        </p>
        <hr />
        <p>{product.description}</p>
      </div>
    </div>
  );
}
