import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
    Navigate,
    } from "react-router-dom";

    import Login from "./pages/Login";
    import AdminHome from "./pages/admin/AdminHomePage";
    import UserHomePage from "./pages/user/UserHomePage";
    import Checkout from "./pages/user/Checkout";
    import Cart from "./pages/user/Cart";
    import ProductList from "./pages/user/ProductList";
    import ProductDetails from "./pages/user/ProductDetails";

    function AppContent() {
    const navigate = useNavigate();
    const [role, setRole] = useState(null);

    // ✅ Add cart state
    const [cart, setCart] = useState([]);

    const handleNavigate = (page) => {
        if (page === "home") navigate("/user");
        else if (page === "products") navigate("/user/products");
        else if (page === "cart") navigate("/user/cart");
    };

    const handleLogin = (userRole) => {
        setRole(userRole);
        if (userRole === "admin") navigate("/admin");
        else if (userRole === "user") navigate("/user");
    };

    const handleLogout = () => {
        setRole(null);
        navigate("/login");
    };

    const handleAddToCart = (product) => {
        setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === product.id);
        if (existingItem) {
            return prevCart.map((item) =>
            item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
        } else {
            return [...prevCart, { ...product, quantity: 1 }];
        }
        });
    };

    return (
        <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* User routes */}
        <Route path="/user" element={<UserHomePage onLogout={handleLogout} />} />
        <Route path="/user/products" element={<ProductList />} />
        <Route path="/user/products/:id" element={<ProductDetails onAddToCart={handleAddToCart} />} />
        <Route path="/user/cart" element={<Cart cart={cart} setCart={setCart} onLogout={handleLogout} />} />
        <Route path="/user/checkout" element={<Checkout />} />

        {/* Admin route */}
        <Route path="/admin" element={<AdminHome onLogout={handleLogout} />} />

        {/* Fallback */}
        <Route path="*" element={<Login onLogin={handleLogin} />} />
        </Routes>
    );
    }

    function App() {
    return (
        <Router>
        <AppContent />
        </Router>
    );
}

export default App;
