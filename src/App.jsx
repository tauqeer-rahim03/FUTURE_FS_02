import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
    const [searchTerm, setSearchTerm] = useState("");
    return (
        <CartProvider>
            <BrowserRouter>
                <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
                    <Header
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                    />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/cart" element={<CartPage />} />
                            <Route
                                path="/product/:productId"
                                element={<ProductDetailPage />}
                            />
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </BrowserRouter>
        </CartProvider>
    );
}
