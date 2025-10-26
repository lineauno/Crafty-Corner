import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../pagesComponents/Navbar";
import Footer from "../pagesComponents/Footer";
import { initialProducts } from "../../data/products";
import "../../styles/ProductList.css";

const ProductCard = ({ product, onAddToCart }) => {
    const navigate = useNavigate();

    const handleAddToCart = (e) => {
        e.stopPropagation();
        onAddToCart(product);
    };

    return (
        <div
        className="product-card"
        onClick={() => navigate(`/user/products/${product.id}`)}
        >
        <div
            className="product-img"
            style={{ backgroundImage: `url(${product.imageUrl})` }}
        ></div>

        <div className="product-info">
            <h3>{product.name}</h3>
            <p>
            {product.description.substring(0, 70)}
            {product.description.length > 70 ? "..." : ""}
            </p>

            <div className="price-cart">
            <span className="price">₱{product.price.toFixed(2)}</span>
            <button className="cart-btn" onClick={handleAddToCart}>
                Add to cart
            </button>
            </div>
        </div>
        </div>
    );
    };

    const ProductList = () => {
    const navigate = useNavigate();
    const [cartItemCount, setCartItemCount] = useState(0);

    // Load cart count from localStorage
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const count = cart.reduce((acc, item) => acc + item.quantity, 0);
        setCartItemCount(count);
    }, []);

    // Add product to cart
    const handleAddToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProductIndex = cart.findIndex((item) => item.id === product.id);

        if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
        } else {
        cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        const count = cart.reduce((acc, item) => acc + item.quantity, 0);
        setCartItemCount(count);
    };

    // Navigation handler for Navbar buttons
    const handleNavigate = (page) => {
        if (page === "home") navigate("/user");
        else if (page === "products") navigate("/user/products");
        else if (page === "cart") navigate("/user/cart");
    };

    // Logout handler
    const handleLogout = () => {
        localStorage.removeItem("user"); // Clear auth data
        localStorage.removeItem("cart"); // Clear cart
        navigate("/login"); // Redirect to login page
    };

    return (
        <>
        <Navbar
            navigate={handleNavigate}
            currentPage="products"
            cartItemCount={cartItemCount}
            onLogout={handleLogout}
        />

        <section className="products-page">
            <h2>Our Products</h2>
            <p>Discover quality supplies and creative essentials for every artist.</p>

            <div className="product-grid-page">
            {initialProducts.map((product) => (
                <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                />
            ))}
            </div>
        </section>

        <Footer />
        </>
    );
};

export default ProductList;
