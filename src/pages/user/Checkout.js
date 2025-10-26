import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Checkout.css";
import Navbar from "../pagesComponents/Navbar";
import Footer from "../pagesComponents/Footer";

const Checkout = ({ onLogout }) => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        postalCode: "",
        payment: "",
    });

    // Load cart from localStorage
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart.map(item => ({
            id: item.id ?? Date.now(),
            name: item.name || "Unnamed Product",
            price: Number(item.price) || 0,
            quantity: Number(item.quantity) > 0 ? Number(item.quantity) : 1,
        })));
    }, []);

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 5.0 : 0.0;
    const taxRate = 0.05;
    const tax = subtotal * taxRate;
    const finalTotal = subtotal + shipping + tax;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.address || !form.city || !form.postalCode || !form.payment) {
            alert("Please fill in all fields!");
            return;
        }

        if (cart.length === 0) {
            alert("Your cart is empty!");
            navigate("/user/products");
            return;
        }

        setIsProcessing(true);

        // Simulate API delay
        setTimeout(() => {
            localStorage.removeItem("cart");
            setCart([]);
            setIsProcessing(false);
            setShowToast(true);

            // Hide toast and redirect
            setTimeout(() => {
                setShowToast(false);
                navigate("/user");
            }, 3000);
        }, 2000);
    };

    const handleNavigate = (page) => {
        if (page === "home") navigate("/user");
        else if (page === "products") navigate("/user/products");
        else if (page === "cart") navigate("/user/cart");
    };

    return (
        <>
            <Navbar
                navigate={handleNavigate}
                currentPage="checkout"
                cartItemCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
                onLogout={onLogout}
            />

            <div className="checkout-page-container">
                <h2 className="text-4xl font-bold mb-8 text-center" style={{ color: "#ff8aa0" }}>
                    Secure Checkout
                </h2>

                {cart.length === 0 ? (
                    <div className="empty-cart-card" style={{ backgroundColor: "#fff" }}>
                        <h3>Your cart is empty!</h3>
                        <button
                            className="empty-cart-link"
                            onClick={() => handleNavigate("products")}
                        >
                            Shop Now
                        </button>
                    </div>
                ) : (
                    <div className="checkout-grid">
                        <form onSubmit={handlePlaceOrder} className="checkout-form-box">
                            <h3 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem", borderBottom: "2px solid #ffc4d0", paddingBottom: "0.5rem" }}>
                                Shipping & Payment
                            </h3>

                            <div className="form-field-wrapper">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    className="checkout-input"
                                />
                            </div>
                            <div className="form-field-wrapper">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className="checkout-input"
                                />
                            </div>
                            <div className="form-field-wrapper">
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Address Line 1"
                                    value={form.address}
                                    onChange={handleChange}
                                    required
                                    className="checkout-input"
                                />
                            </div>
                            <div className="form-field-wrapper">
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={form.city}
                                    onChange={handleChange}
                                    required
                                    className="checkout-input"
                                />
                            </div>
                            <div className="form-field-wrapper">
                                <input
                                    type="text"
                                    name="postalCode"
                                    placeholder="Postal Code"
                                    value={form.postalCode}
                                    onChange={handleChange}
                                    required
                                    className="checkout-input"
                                />
                            </div>

                            <div className="form-field-wrapper">
                                <select
                                    name="payment"
                                    value={form.payment}
                                    onChange={handleChange}
                                    required
                                    className="checkout-input"
                                >
                                    <option value="">Select Payment Option</option>
                                    <option value="cod">Cash on Delivery</option>
                                    <option value="gcash">GCash</option>
                                    <option value="card">Credit / Debit Card</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={cart.length === 0 || isProcessing}
                                className="primary-checkout-btn"
                            >
                                {isProcessing ? "Processing Order..." : `Place Order – ₱${finalTotal.toFixed(2)}`}
                            </button>
                        </form>

                        <div className="order-summary-box">
                            <h3 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem" }}>
                                Order Summary
                            </h3>
                            <div style={{ marginBottom: "1rem" }}>
                                {cart.map((item) => (
                                    <div key={item.id} className="summary-line-item">
                                        <span>{item.name} x {item.quantity}</span>
                                        <span>₱{(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="summary-line-item summary-total" style={{ fontWeight: "700", fontSize: "1.1rem" }}>
                                <span>Total:</span>
                                <span>₱{finalTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Toast Notification */}
                {showToast && <div className="toast">Order placed successfully!</div>}
            </div>

            <Footer />
        </>
    );
};

export default Checkout;
