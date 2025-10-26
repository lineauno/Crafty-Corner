import React from "react";
import Navbar from "../pagesComponents/Navbar";

export default function AdminHomePage({ onLogout }) {
    const navigate = (page) => {
        console.log("Navigating to:", page);
        // Add your navigation logic here (or use useNavigate)
    };

    return (
        <>
        <Navbar
            navigate={navigate}
            currentPage="home"
            cartItemCount={0}   // optional: admin may not need this
            onLogout={onLogout} // ✅ properly passed down
        />

        <div className="admin-dashboard">
            <h2>Welcome to Admin Dashboard</h2>
            {/* Add admin-specific content here */}
        </div>
        </>
    );
}
