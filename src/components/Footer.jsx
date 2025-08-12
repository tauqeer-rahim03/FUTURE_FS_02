const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8 mt-auto">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p>
                    &copy; {new Date().getFullYear()} ShopSphere. All Rights
                    Reserved.
                </p>
                <p className="text-sm text-gray-400 mt-2">
                    Created with React & Tailwind CSS
                </p>
            </div>
        </footer>
    );
};

export default Footer;
