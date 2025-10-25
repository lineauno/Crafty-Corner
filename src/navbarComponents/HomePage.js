import React from "react";
import "./style.css"; //if may error pa edit po ne2
import Navbar from "./navbarComponents/Navbar";
//import Footer from "./pagesComponents/Footer"; tanggal lang yung commment para makita footer pag merge na ty po

function HomePage() {
    return (
        <>
        {/* Navbar */}
        <Navbar />

        {/* Hero Section */}
        <section className="hero">
            <h1>Lorem Ipsum Dolor Sit Amet</h1>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
            <button className="shop-btn">Shop Now</button>
        </section>

        {/* Products Section */}
        <section className="products">
            <h2>Lorem Ipsum Products</h2>
            <div className="product-grid">
            <div className="product"></div>
            <div className="product"></div>
            <div className="product"></div>
            <div className="product"></div>
            </div>
        </section>

        {/* Info Section */}
        <section className="info">
            <h2>Lorem Ipsum Consectetur</h2>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris.
            adadwad
            </p>
        </section>

        {/* Footer */}
        <Footer />
        </>
    );
    }

export default HomePage;
