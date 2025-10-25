import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const location = useLocation();

    return (
        <header className="navbar">
        <h1 className="brand">Crafty Corner</h1>
        <nav>
            <ul>
            <li>
                <Link
                to="/"
                className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                >
                Home
                </Link>
            </li>
            <li>
                <Link
                to="/products"
                className={`nav-link ${
                    location.pathname === "/products" ? "active" : ""
                }`}
                >
                Products
                </Link>
            </li>
            <li>
                <Link
                to="/cart"
                className={`nav-link ${
                    location.pathname === "/cart" ? "active" : ""
                }`}
                >
                Cart
                </Link>
            </li>
            </ul>
        </nav>
        </header>
    );
    }

export default Navbar;
