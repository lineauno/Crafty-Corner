import React from "react";
import "./style.css";
import Navbar from "./navbarComponents/Navbar";
import Footer from "./pagesComponents/Footer";

    function Checkout() {
    const handleSubmit = (e) => {
        e.preventDefault();

        localStorage.removeItem("cart");


        const cartLinks = document.querySelectorAll(".cart-link");
        cartLinks.forEach((link) => (link.textContent = "Cart (0)"));

        alert("✅ Order placed successfully! Thank you for shopping with Crafty Corner.");

        window.location.href = "/";
    };

    return (
        <>
        <Navbar />

        <main className="checkout-page">
            <h2>Checkout</h2>
            <p>Please fill in your details to complete your order.</p>

            <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Enter your name" required />
            </div>

            <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Enter your email" required />
            </div>

            <div className="form-group">
                <label>Shipping Address</label>
                <textarea placeholder="Enter your full address" required></textarea>
            </div>

            <div className="form-group">
                <label>Payment Method</label>
                <select required>
                <option value="">Select payment option</option>
                <option value="cod">Cash on Delivery</option>
                <option value="gcash">GCash</option>
                <option value="card">Credit / Debit Card</option>
                </select>
            </div>

            <button type="submit" className="btn-green">
                Place Order
            </button>
            </form>
        </main>

        <Footer />
        </>
    );
    }

export default Checkout;
