import React, { useState, useEffect, useMemo } from "react";
import ProductCard from "../components/ProductCard";

const HomePage = ({ searchTerm }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setLoading(true);
                const [productsResponse, categoriesResponse] =
                    await Promise.all([
                        fetch("https://dummyjson.com/products?limit=100"),
                        fetch("https://dummyjson.com/products/categories"),
                    ]);
                if (!productsResponse.ok)
                    throw new Error(
                        `HTTP error! status: ${productsResponse.status}`
                    );
                if (!categoriesResponse.ok)
                    throw new Error(
                        `HTTP error! status: ${categoriesResponse.status}`
                    );
                const productsData = await productsResponse.json();
                const categoriesData = await categoriesResponse.json();
                setProducts(productsData.products);
                setCategories(categoriesData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchInitialData();
    }, []);

    const filteredProducts = useMemo(() => {
        return products
            .filter((product) => {
                if (selectedCategory) {
                    return product.category === selectedCategory;
                }
                return true;
            })
            .filter((product) => {
                if (!searchTerm || searchTerm.trim() === "") {
                    return true;
                }
                return (
                    product.title &&
                    product.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                );
            });
    }, [products, selectedCategory, searchTerm]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading Products...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-red-500">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold text-gray-800">
                    Our Products
                </h1>
                <div>
                    <label htmlFor="category-filter" className="sr-only">
                        Filter by Category
                    </label>
                    <select
                        id="category-filter"
                        className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        value={selectedCategory || ""}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {categories.map((category) => (
                            <option
                                key={category.slug}
                                value={category.slug}
                                className="capitalize"
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
