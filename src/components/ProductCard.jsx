import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import StarRating from "./StarRating";

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col">
            <Link to={`/product/${product.id}`}>
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-56 object-cover"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                            "https://placehold.co/400x400/cccccc/ffffff?text=Image+Error";
                    }}
                />
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 ">
                        {product.title}
                    </h3>
                </div>
            </Link>
            <div className="p-4 pt-0 mt-auto">
                <div className="flex items-center my-2">
                    <StarRating rating={product.rating} />
                    <span className="text-xs text-gray-500 ml-2">
                        ({product.rating.toFixed(2)})
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                    </span>
                    <button
                        onClick={() => addToCart(product)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors duration-300"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
