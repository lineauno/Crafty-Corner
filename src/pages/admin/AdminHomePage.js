import React, { useState, useEffect } from "react";
import "../../styles/AdminHomePage.css";
import { initialProducts } from "../../data/products";

export default function AdminHomePage({ onLogout }) {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        id: null,
        name: "",
        price: "",
        imageUrl: "",
        description: "",
    });
    const [isEditing, setIsEditing] = useState(false);

    //  Load products from localStorage or fallback to initialProducts
    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem("products"));
        if (storedProducts && storedProducts.length > 0) {
            setProducts(storedProducts);
        } else {
            setProducts(initialProducts);
            localStorage.setItem("products", JSON.stringify(initialProducts));
        }
    }, []);

    //  Save products to localStorage whenever changed
    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(products));
    }, [products]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddOrUpdate = (e) => {
        e.preventDefault();

        if (!form.name || !form.price || !form.imageUrl) {
            alert("Please fill in all required fields!");
            return;
        }

        if (isEditing) {
            //  Update product
            setProducts((prev) =>
                prev.map((p) =>
                    p.id === form.id ? { ...form, price: Number(form.price) } : p
                )
            );
            setIsEditing(false);
        } else {
            //  Add new product
            const newProduct = {
                ...form,
                id: Date.now(),
                price: Number(form.price),
            };
            setProducts((prev) => [...prev, newProduct]);
        }

        // Reset form
        setForm({ id: null, name: "", price: "", imageUrl: "", description: "" });
    };

    const handleEdit = (product) => {
        setForm({ ...product });
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            setProducts((prev) => prev.filter((p) => p.id !== id));
        }
    };

    return (
        <>
            {/* Header */}
            <header className="admin-header">
                <h1 className="brand">Crafty Corner – Admin</h1>
                <button onClick={onLogout} className="logout-btn">
                    Logout
                </button>
            </header>

            <main className="admin-main-grid">
                {/* Left - Add/Edit Form */}
                <section className="admin-card form-card">
                    <h2>{isEditing ? "Edit Product" : "Add Product"}</h2>
                    <form onSubmit={handleAddOrUpdate}>
                        <label>Product Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />

                        <label>Price</label>
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            required
                        />

                        <label>Image URL</label>
                        <input
                            type="text"
                            name="imageUrl"
                            value={form.imageUrl}
                            onChange={handleChange}
                            required
                        />

                        <label>Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                        />

                        <div className="form-btns">
                            <button
                                type="submit"
                                className={isEditing ? "update-btn" : "add-btn"}
                            >
                                {isEditing ? "Update Product" : "Add Product"}
                            </button>
                        </div>
                    </form>
                </section>

                {/* Right - Product Grid */}
                <section className="admin-card product-grid-section">
                    <h2>Existing Products</h2>
                    {products.length === 0 ? (
                        <p className="no-products">No products available.</p>
                    ) : (
                        <div className="product-grid">
                            {products.map((product) => (
                                <div key={product.id} className="product-card">
                                    <div
                                        className="product-card-img"
                                        style={{
                                            backgroundImage: `url(${product.imageUrl})`,
                                        }}
                                    ></div>
                                    <div className="product-card-info">
                                        <h4>{product.name}</h4>
                                        <p className="product-desc">
                                            {product.description
                                                ? product.description.substring(0, 60) + "..."
                                                : "No description"}
                                        </p>
                                        <p className="product-price">
                                            ₱{product.price.toFixed(2)}
                                        </p>
                                        <div className="action-btns">
                                            <button
                                                className="edit-btn"
                                                onClick={() => handleEdit(product)}
                                            >
                                                ✏️ Edit
                                            </button>
                                            <button
                                                className="delete-btn"
                                                onClick={() => handleDelete(product.id)}
                                            >
                                                🗑️ Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </>
    );
}
