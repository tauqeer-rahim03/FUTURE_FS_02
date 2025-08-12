import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";

const CartPage = () => {
    const { cart, clearCart } = useCart();
    const [deliveryOption, setDeliveryOption] = useState("standard");
    const [checkoutStep, setCheckoutStep] = useState("cart");

    const deliveryDates = useMemo(() => {
        const options = { weekday: "long", month: "short", day: "numeric" };
        const today = new Date();
        return {
            express: new Date(
                new Date().setDate(today.getDate() + 1)
            ).toLocaleDateString("en-US", options),
            priority: new Date(
                new Date().setDate(today.getDate() + 2)
            ).toLocaleDateString("en-US", options),
            standard: new Date(
                new Date().setDate(today.getDate() + 3)
            ).toLocaleDateString("en-US", options),
        };
    }, []);

    const DELIVERY_CHARGES = { express: 5.0, priority: 2.5, standard: 0 };
    const cartSubtotal = useMemo(
        () =>
            cart.reduce((total, item) => total + item.price * item.quantity, 0),
        [cart]
    );
    const deliveryCharge = DELIVERY_CHARGES[deliveryOption];
    const grandTotal = useMemo(
        () => cartSubtotal + deliveryCharge,
        [cartSubtotal, deliveryCharge]
    );

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        setCheckoutStep("confirmation");
        clearCart();
    };

    const CheckoutStepper = ({ currentStep }) => {
        const steps = ["Cart", "Checkout", "Confirmation"];
        return (
            <div className="flex items-center justify-center mb-8">
                {steps.map((step, index) => (
                    <React.Fragment key={step}>
                        <div className="flex flex-col items-center">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    index <= steps.indexOf(currentStep)
                                        ? "bg-indigo-600 text-white"
                                        : "bg-gray-200 text-gray-600"
                                }`}
                            >
                                {index < steps.indexOf(currentStep)
                                    ? "✓"
                                    : index + 1}
                            </div>
                            <p
                                className={`mt-2 text-sm ${
                                    index <= steps.indexOf(currentStep)
                                        ? "text-indigo-600 font-semibold"
                                        : "text-gray-500"
                                }`}
                            >
                                {step}
                            </p>
                        </div>
                        {index < steps.length - 1 && (
                            <div
                                className={`flex-auto border-t-2 mx-4 ${
                                    index < steps.indexOf(currentStep)
                                        ? "border-indigo-600"
                                        : "border-gray-200"
                                }`}
                            ></div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        );
    };

    if (cart.length === 0 && checkoutStep !== "confirmation") {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Your Cart is Empty
                </h1>
                <p className="text-gray-600 mb-6">
                    Looks like you haven't added anything to your cart yet.
                </p>
                <Link
                    to="/"
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                >
                    Continue Shopping
                </Link>
            </div>
        );
    }

    if (checkoutStep === "confirmation") {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
                <CheckoutStepper currentStep="Confirmation" />
                <svg
                    className="w-16 h-16 mx-auto text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                </svg>
                <h1 className="text-3xl font-bold text-gray-800 mt-4 mb-2">
                    Order Confirmed!
                </h1>
                <p className="text-gray-600 mb-6">
                    Thank you for your purchase. Your order is on its way.
                </p>
                <Link
                    to="/"
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                >
                    Continue Shopping
                </Link>
            </div>
        );
    }

    if (checkoutStep === "checkout") {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <CheckoutStepper currentStep="Checkout" />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <form className="lg:col-span-2" onSubmit={handlePlaceOrder}>
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <h2 className="text-xl font-semibold mb-4">
                                Shipping Information
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Postal Code
                                    </label>
                                    <input
                                        type="text"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold mb-4">
                                Payment Details
                            </h2>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Card Number
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg
                                            className="w-5 h-5 text-gray-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path>
                                            <path
                                                fillRule="evenodd"
                                                d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm3 0a1 1 0 011-1h1a1 1 0 110 2H8a1 1 0 01-1-1z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="0000 0000 0000 0000"
                                        className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Expiry Date
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="MM / YY"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        CVC
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="123"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 flex justify-between items-center">
                            <button
                                onClick={() => setCheckoutStep("cart")}
                                className="text-indigo-600 hover:text-indigo-800"
                            >
                                ← Back to Cart
                            </button>
                            <button
                                type="submit"
                                className="w-full sm:w-auto bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors duration-300"
                            >
                                Place Order
                            </button>
                        </div>
                    </form>
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold mb-4">
                                Order Summary
                            </h2>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Subtotal
                                    </span>
                                    <span>${cartSubtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Delivery
                                    </span>
                                    <span>${deliveryCharge.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                                    <span>Total</span>
                                    <span>${grandTotal.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <CheckoutStepper currentStep="Cart" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-md">
                        {cart.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>
                    <button
                        onClick={clearCart}
                        className="text-sm text-red-500 hover:underline mt-4"
                    >
                        Clear Cart
                    </button>
                </div>
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Order Summary
                        </h2>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal</span>
                                <span>${cartSubtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Delivery</span>
                                <span>${deliveryCharge.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                                <span>Total</span>
                                <span>${grandTotal.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-3">
                                Delivery Options
                            </h3>
                            <div className="space-y-3">
                                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:border-indigo-500">
                                    <input
                                        type="radio"
                                        name="delivery"
                                        className="h-4 w-4 text-indigo-600"
                                        value="express"
                                        checked={deliveryOption === "express"}
                                        onChange={(e) =>
                                            setDeliveryOption(e.target.value)
                                        }
                                    />
                                    <span className="ml-3 flex-grow">
                                        <span className="block font-semibold">
                                            Express Delivery
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {deliveryDates.express}
                                        </span>
                                    </span>
                                    <span className="font-semibold">
                                        ${DELIVERY_CHARGES.express.toFixed(2)}
                                    </span>
                                </label>
                                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:border-indigo-500">
                                    <input
                                        type="radio"
                                        name="delivery"
                                        className="h-4 w-4 text-indigo-600"
                                        value="priority"
                                        checked={deliveryOption === "priority"}
                                        onChange={(e) =>
                                            setDeliveryOption(e.target.value)
                                        }
                                    />
                                    <span className="ml-3 flex-grow">
                                        <span className="block font-semibold">
                                            Priority Delivery
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {deliveryDates.priority}
                                        </span>
                                    </span>
                                    <span className="font-semibold">
                                        ${DELIVERY_CHARGES.priority.toFixed(2)}
                                    </span>
                                </label>
                                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:border-indigo-500">
                                    <input
                                        type="radio"
                                        name="delivery"
                                        className="h-4 w-4 text-indigo-600"
                                        value="standard"
                                        checked={deliveryOption === "standard"}
                                        onChange={(e) =>
                                            setDeliveryOption(e.target.value)
                                        }
                                    />
                                    <span className="ml-3 flex-grow">
                                        <span className="block font-semibold">
                                            Standard Delivery
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {deliveryDates.standard}
                                        </span>
                                    </span>
                                    <span className="font-semibold">FREE</span>
                                </label>
                            </div>
                        </div>
                        <button
                            onClick={() => setCheckoutStep("checkout")}
                            className="mt-6 w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-300"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
