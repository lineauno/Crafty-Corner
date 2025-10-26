import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Cart.css";
import Navbar from "../pagesComponents/Navbar";
import Footer from "../pagesComponents/Footer";

export const Cart = ({ onLogout }) => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);

    // Load cart from localStorage
    const getCartFromStorage = () => {
        let storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        storedCart = storedCart.map(item => ({
            id: item.id ?? Date.now(),
            name: item.name || "Unnamed Product",
            price: Number(item.price) || 0,
            quantity: Number(item.quantity) > 0 ? Number(item.quantity) : 1,
            imageUrl: item.imageUrl || "https://placehold.co/80x80/cccccc/333333?text=No+Image"
        }));
        setCart(storedCart);
        return storedCart;
    };

    useEffect(() => {
        getCartFromStorage();
    }, []);

    const updateItem = (id, newQuantity) => {
        let updatedCart = [...cart];
        const itemIndex = updatedCart.findIndex(item => item.id === id);
        if (itemIndex > -1) {
            if (newQuantity <= 0) {
                updatedCart.splice(itemIndex, 1);
            } else {
                updatedCart[itemIndex].quantity = newQuantity;
            }
        }
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCart(updatedCart);
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const CartItem = ({ item }) => (
        <div className="cart-item-row">
            <div className="cart-item-details">
                <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="cart-item-thumbnail"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/64x64/cccccc/333333?text=Item"; }}
                />
                <div className="flex-grow">
                    <p className="font-semibold text-gray-900" title={item.name}>{item.name}</p>
                    <p className="text-gray-500 text-sm">₱{item.price.toFixed(2)}</p>
                </div>
            </div>

            <div className="cart-item-controls">
                <div className="qty-controls">
                    <button
                        onClick={() => updateItem(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                    >
                        −
                    </button>
                    <span className="text-gray-800">{item.quantity}</span>
                    <button
                        onClick={() => updateItem(item.id, item.quantity + 1)}
                    >
                        +
                    </button>
                </div>
                <p className="font-bold text-gray-800 w-20 text-right">
                    ₱{(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                    onClick={() => updateItem(item.id, 0)}
                    className="remove-item-btn"
                    aria-label="Remove Item"
                >
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </button>
            </div>
        </div>
    );

    const handleNavigate = (page) => {
        if (page === "home") navigate("/user");
        else if (page === "products") navigate("/user/products");
        else if (page === "checkout") navigate("/user/checkout", { state: { cart, total } });
    };

    return (
        <>
            <Navbar
                navigate={handleNavigate}
                currentPage="cart"
                cartItemCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
                onLogout={onLogout}
            />

            <div className="checkout-page-container">
                <h2 className="cart-title-brand">Your Shopping Cart</h2>

                {cart.length === 0 ? (
                    <div className="cart-empty">
                        <h2>Your Cart is Empty</h2>
                        <p>Looks like you haven’t added anything yet.</p>
                        <button className="btn" onClick={() => handleNavigate("products")}>
                            Shop Now
                        </button>
                    </div>

                ) : (
                    <div className="cart-items-box">
                        <div className="divide-y divide-gray-100">
                            {cart.map(item => <CartItem key={item.id} item={item} />)}
                        </div>

                        <div className="cart-actions-box">
                            <div className="text-xl font-bold text-gray-900">
                                Subtotal: <span className='text-[#e54b67]'>₱{total.toFixed(2)}</span>
                            </div>

                            <div className="cart-action-buttons">
                                <button
                                    onClick={() => handleNavigate('products')}
                                    className="continue-shopping-btn"
                                >
                                    Continue Shopping
                                </button>
                                <button
                                    onClick={() => handleNavigate('checkout')}
                                    className="primary-add-to-cart-btn"
                                    disabled={cart.length === 0}
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
};

export default Cart;
