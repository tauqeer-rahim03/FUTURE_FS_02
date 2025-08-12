import React from "react";
import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
    const { addToCart, removeFromCart, decreaseQuantity } = useCart();
    return (
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center w-2/5">
                <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-16 w-16 object-cover rounded-md mr-4"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                            "https://placehold.co/100x100/cccccc/ffffff?text=Img";
                    }}
                />
                <div>
                    <h3 className="font-semibold text-gray-800">
                        {item.title}
                    </h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
            </div>
            <div className="flex items-center justify-center space-x-3 w-1/5">
                <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="text-gray-500 bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-300"
                >
                    -
                </button>
                <span className="font-semibold">{item.quantity}</span>
                <button
                    onClick={() => addToCart(item)}
                    className="text-gray-500 bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-300"
                >
                    +
                </button>
            </div>
            <p className="font-semibold text-gray-800 w-1/5 text-right">
                ${(item.price * item.quantity).toFixed(2)}
            </p>
            <div className="w-1/5 flex justify-end">
                <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        ></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default CartItem;
