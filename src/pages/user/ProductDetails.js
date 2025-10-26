import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../pagesComponents/Navbar";
import Footer from "../pagesComponents/Footer";
import { initialProducts } from "../../data/products";
import "../../styles/ProductDetails.css";

const ProductDetails = ({ onLogout }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const [cartItemCount, setCartItemCount] = useState(
        JSON.parse(localStorage.getItem("cart"))?.reduce((acc, item) => acc + item.quantity, 0) || 0
    );

    const product = initialProducts.find((p) => p.id.toString() === id);

    if (!product) {
        return (
            <div className="details-container">
                <h2 className="not-found">Product not found.</h2>
                <button
                    onClick={() => navigate("/user/products")}
                    className="secondary-btn"
                >
                    Go Back to Products
                </button>
            </div>
        );
    }

    const handleAddToCart = () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingIndex = cart.findIndex((item) => item.id === product.id);

        if (existingIndex !== -1) {
            cart[existingIndex].quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        setCartItemCount(cart.reduce((acc, item) => acc + item.quantity, 0));

        // Show toast notification
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    };

    const handleNavigate = (page) => {
        if (page === "home") navigate("/user");
        else if (page === "products") navigate("/user/products");
        else if (page === "cart") navigate("/user/cart");
    };

    return (
        <>
            {/* Navbar */}
            <Navbar
                navigate={handleNavigate}
                currentPage="products"
                cartItemCount={cartItemCount}
                onLogout={onLogout}
            />

            <div className="details-container">
                <button onClick={() => navigate("/user/products")} className="back-link">
                    ← Back to Products
                </button>

                <div className="details-grid">
                    <div className="details-image-box">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="details-product-img"
                            onError={(e) =>
                                (e.target.src =
                                    "https://placehold.co/600x450/cccccc/333333?text=No+Image")
                            }
                        />
                    </div>

                    <div className="details-info">
                        <h1 className="details-title">{product.name}</h1>
                        <p className="price">₱{product.price.toFixed(2)}</p>
                        <p className="details-description">{product.description}</p>

                        <div className="details-button-group">
                            <button className="primary-add-to-cart-btn" onClick={handleAddToCart}>
                                Add to Cart
                            </button>
                            <button
                                className="secondary-btn"
                                onClick={() => navigate("/user/cart")}
                            >
                                View Cart
                            </button>
                        </div>
                    </div>
                </div>

                {showToast && (
                    <div className="toast">
                        <strong>{product.name}</strong> added to cart!
                    </div>
                )}
            </div>

            {/* Footer */}
            <Footer />
        </>
    );
};

export default ProductDetails;
