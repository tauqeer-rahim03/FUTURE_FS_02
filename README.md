# ShopSphere: A Modern E-commerce React Application

ShopSphere is a feature-rich, single-page e-commerce website built with React and styled with Tailwind CSS. It provides a complete shopping experience, from browsing and filtering products to a simulated checkout process, all powered by the DummyJSON API for mock product data.

## Live Demo

A live demo of the project is available here: your-live-demo-link.com

## Features

-   Product Catalog: Displays a grid of products fetched from a live API.

-   Dynamic Search & Filtering: Instantly search for products by name or filter them by category.

-   Product Detail Pages: Click on any product to view a dedicated page with more images, details, and an option to add a specific quantity to the cart.

-   Shopping Cart: A fully functional cart to add, remove, and adjust the quantity of items.

-   Advanced Cart & Delivery: The cart page includes dynamic delivery date options with tiered pricing.

-   Checkout Simulation: A multi-step checkout process with a modern UI, including a stepper, a shipping/payment form, and an order confirmation page.

-   Responsive Design: The entire application is fully responsive and works seamlessly on desktops, tablets, and mobile devices.

## Technologies Used

-   React: A JavaScript library for building user interfaces.

-   React Router DOM: For handling client-side routing and navigation between pages.

-   Tailwind CSS: A utility-first CSS framework for rapid UI development.

-   DummyJSON: Used as a source for mock product and category data.

## Project Structure

The project is organized with a clear and scalable folder structure:

src/
├── components/ # Reusable UI components (Header, ProductCard, etc.)
├── context/ # React Context for global state (CartContext)
├── pages/ # Top-level page components (HomePage, CartPage, etc.)
├── App.js # Main application component with routing setup
└── index.js # The entry point of the application

## Contributing

This project was created for a specific task and as a demonstration of skills. Therefore, contributions, forks, and pull requests are not being accepted at this time.

## API Data Source

This project uses the [DummyJSON](https://dummyjson.com/products) API to simulate a real-world e-commerce backend, providing product and category data.
