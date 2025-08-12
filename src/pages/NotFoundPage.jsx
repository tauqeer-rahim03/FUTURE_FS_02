import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
            <h1 className="text-4xl font-bold text-red-500 mb-4">
                404 - Not Found
            </h1>
            <p className="text-gray-600 mb-6">
                The page you are looking for does not exist.
            </p>
            <Link
                to="/"
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
            >
                Go to Homepage
            </Link>
        </div>
    );
};
export default NotFoundPage;
