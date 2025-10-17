import React, { useEffect, useState } from "react";
import "./style.css";
import Navbar from "./navbarComponents/Navbar";
import Footer from "./pagesComponents/Footer";

    function Cart() {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    const loadCart = () => {
        let storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        storedCart = storedCart.map((item) => ({
        name: item.name || "Unnamed Product",
        price: Number(item.price) || 0,
        quantity: Number(item.quantity) > 0 ? Number(item.quantity) : 1,
        id: item.id ?? Date.now(),
        }));

        localStorage.setItem("cart", JSON.stringify(storedCart));
        setCart(storedCart);
    };

    const calculateTotal = (cartData) => {
        const newTotal = cartData.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
        );
        setTotal(newTotal);
    };

    const updateCartCount = (cartData) => {
        const count = cartData.reduce((acc, item) => acc + item.quantity, 0);
        const cartLinks = document.querySelectorAll(".cart-link");
        cartLinks.forEach((link) => {
        link.textContent = `Cart (${count})`;
        });
    };

    const increaseQuantity = (index) => {
        const updatedCart = [...cart];
        updatedCart[index].quantity++;
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCart(updatedCart);
    };


    const decreaseQuantity = (index) => {
        const updatedCart = [...cart];
        if (updatedCart[index].quantity > 1) {
        updatedCart[index].quantity--;
        } else {
        updatedCart.splice(index, 1);
        }
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCart(updatedCart);
    };

    const removeItem = (index) => {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCart(updatedCart);
    };


    useEffect(() => {
        loadCart();
    }, []);

    useEffect(() => {
        calculateTotal(cart);
        updateCartCount(cart);
    }, [cart]);

    return (
        <>
        <Navbar />

        {cart.length === 0 ? (
            <main className="cart-empty">
            <h2>Your Cart is Empty</h2>
            <p>Looks like you haven’t added anything yet.</p>
            <a href="/products" className="btn">
                Shop Now
            </a>
            </main>
        ) : (
            <main className="cart-container">
            <h2>Your Shopping Cart</h2>
            <p>Review your items and proceed to checkout.</p>

            <table className="cart-table">
                <thead>
                <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {cart.map((item, index) => (
                    <tr key={index}>
                    <td className="item">
                        <div className="item-box"></div>
                        <span>{item.name}</span>
                    </td>
                    <td className="quantity">
                        <button onClick={() => decreaseQuantity(index)}>−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => increaseQuantity(index)}>+</button>
                    </td>
                    <td>₱{item.price}</td>
                    <td className="subtotal">₱{item.price * item.quantity}</td>
                    <td>
                        <span
                        className="remove"
                        onClick={() => removeItem(index)}
                        >
                        X
                        </span>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="total-section">
                <span>Total:</span>
                <strong>₱{total}</strong>
            </div>

            <div className="cart-buttons">
                <a href="/products" className="btn-light">
                Continue Shopping
                </a>
                <a href="/checkout" className="btn-green">
                Checkout
                </a>
            </div>
            </main>
        )}

        <Footer />
        </>
    );
    }

export default Cart;
