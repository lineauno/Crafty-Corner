import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../pagesComponents/Navbar";
import Footer from "../pagesComponents/Footer";
import { initialProducts } from "../../data/products";
import "../../styles/UserHomePage.css";

function UserHomePage({ onLogout }) {
    const navigate = useNavigate();
    const [cartItemCount, setCartItemCount] = useState(0);

    // Load cart count from localStorage
    useEffect(() => {
        const updateCartCount = () => {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            const count = cart.reduce((acc, item) => acc + item.quantity, 0);
            setCartItemCount(count);
        };

        updateCartCount();

        // Optional: listen to storage events if cart is updated in another tab
        window.addEventListener("storage", updateCartCount);
        return () => window.removeEventListener("storage", updateCartCount);
    }, []);

    const handleNavigate = (page) => {
        if (page === "home") navigate("/user");
        else if (page === "products") navigate("/user/products");
        else if (page === "cart") navigate("/user/cart");
    };

    const featuredProducts = initialProducts.slice(0, 4);

    return (
        <>
            <Navbar
                navigate={handleNavigate}
                currentPage="home"
                cartItemCount={cartItemCount}
                onLogout={onLogout}
            />

            {/* Hero Section */}
            <section className="hero">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-tight mb-4">
                        Unleash Your Inner Craftsperson
                    </h1>
                    <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
                        High-quality art supplies and kits to inspire your next creation. Find everything <br />
                        you need for painting, drawing, and crafting, all in one place.
                    </p>
                    <button
                        className="shop-btn"
                        onClick={() => navigate("/user/products")}
                    >
                        Shop Now
                    </button>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="products">
                <h2>Featured Products</h2>
                <div className="product-grid">
                    {featuredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="product-card"
                            onClick={() => navigate(`/user/products/${product.id}`)}
                        >
                            <img
                                className="product-img"
                                src={product.imageUrl}
                                alt={product.name}
                            />
                            <span className="new-badge">New</span>
                            <p className="product-name">{product.name}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Info Section */}
            <section className="info">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Quality and Craftsmanship</h2>
                    <p className="text-gray-700 max-w-2xl font-bold mx-auto">
                        We source only the finest materials, ensuring every product helps you create masterpieces with ease and joy.
                    </p>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default UserHomePage;
