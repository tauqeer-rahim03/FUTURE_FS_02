import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import StarRating from "../components/StarRating";

const ProductDetailPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://dummyjson.com/products/${productId}`
                );
                if (!response.ok) throw new Error("Product not found");
                const data = await response.json();
                setProduct(data);
                setSelectedImage(data.thumbnail);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    // FIX: Add loading and error handling before trying to render
    if (loading)
        return (
            <div className="text-center p-10">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading Product...</p>
            </div>
        );
    if (error)
        return (
            <div className="text-center p-10 text-red-500">Error: {error}</div>
        );
    if (!product)
        return (
            <div className="text-center p-10 text-gray-500">
                Product not found.
            </div>
        );

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link
                to="/"
                className="mb-6 text-indigo-600 hover:text-indigo-800 flex items-center"
            >
                <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                    ></path>
                </svg>
                Back to Products
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                <div>
                    <img
                        src={selectedImage}
                        alt={product.title}
                        className="w-full h-auto object-cover rounded-lg shadow-lg"
                    />
                    <div className="flex space-x-2 mt-4 overflow-x-auto">
                        {product.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`${product.title} thumbnail ${index + 1}`}
                                className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${
                                    selectedImage === img
                                        ? "border-indigo-500"
                                        : "border-transparent"
                                }`}
                                onClick={() => setSelectedImage(img)}
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        {product.title}
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Brand: {product.brand}
                    </p>
                    <div className="flex items-center my-4">
                        <StarRating rating={product.rating} />
                        <span className="text-gray-600 ml-2">
                            ({product.rating.toFixed(2)} rating)
                        </span>
                    </div>
                    <p className="text-gray-700 my-4">{product.description}</p>
                    <p className="text-3xl font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-green-600 mt-2">
                        {product.stock > 0
                            ? `${product.stock} in stock`
                            : "Out of stock"}
                    </p>
                    <div className="mt-6 flex items-center">
                        <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                                onClick={() =>
                                    setQuantity((q) => Math.max(1, q - 1))
                                }
                                className="px-3 py-2 text-gray-600"
                            >
                                -
                            </button>
                            <span className="px-4 py-2">{quantity}</span>
                            <button
                                onClick={() => setQuantity((q) => q + 1)}
                                className="px-3 py-2 text-gray-600"
                            >
                                +
                            </button>
                        </div>
                        <button
                            onClick={() => addToCart(product, quantity)}
                            className="ml-4 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
