import { Link, useLocation } from "react-router-dom";

function Footer() {
    const location = useLocation();
    const isHomePage = location.pathname === "/";
    const hiddenPages = ["/login", "/signup", "/knowus", "/admin/login"];
    const shouldHide = hiddenPages.includes(location.pathname);

    if (shouldHide) return null;

    return (
        <footer className={`${isHomePage ? "bg-[#32284a]" : "bg-gradient-to-br from-[#32284a] to-[#1a1528]"}`}>
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="inline-block mb-6">
                            <img
                                src="/logo.png"
                                alt="Trackify"
                                className="h-12 w-auto"
                            />
                        </Link>
                        <p className="text-gray-300 text-sm leading-relaxed mb-6">
                            Transform your fitness journey with personalized training from certified experts. Your goals, our guidance.
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-3">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-300 hover:bg-[#775fab] hover:text-white transition-all duration-300"
                            >
                                <i className="fa-brands fa-facebook-f"></i>
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-300 hover:bg-[#775fab] hover:text-white transition-all duration-300"
                            >
                                <i className="fa-brands fa-linkedin-in"></i>
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-300 hover:bg-[#775fab] hover:text-white transition-all duration-300"
                            >
                                <i className="fa-brands fa-instagram"></i>
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-300 hover:bg-[#775fab] hover:text-white transition-all duration-300"
                            >
                                <i className="fa-brands fa-x-twitter"></i>
                            </a>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-300 hover:bg-[#775fab] hover:text-white transition-all duration-300"
                            >
                                <i className="fa-brands fa-youtube"></i>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6 relative">
                            Quick Links
                            <span className="absolute -bottom-2 left-0 w-10 h-0.5 bg-[#775fab]"></span>
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/about" className="text-gray-300 hover:text-[#775fab] transition-colors duration-300 flex items-center gap-2 group">
                                    <i className="fa-solid fa-chevron-right text-xs text-[#775fab] opacity-0 group-hover:opacity-100 transition-opacity"></i>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/trainers" className="text-gray-300 hover:text-[#775fab] transition-colors duration-300 flex items-center gap-2 group">
                                    <i className="fa-solid fa-chevron-right text-xs text-[#775fab] opacity-0 group-hover:opacity-100 transition-opacity"></i>
                                    Our Trainers
                                </Link>
                            </li>
                            <li>
                                <Link to="/exercise" className="text-gray-300 hover:text-[#775fab] transition-colors duration-300 flex items-center gap-2 group">
                                    <i className="fa-solid fa-chevron-right text-xs text-[#775fab] opacity-0 group-hover:opacity-100 transition-opacity"></i>
                                    Exercise Library
                                </Link>
                            </li>
                            <li>
                                <Link to="/reviews" className="text-gray-300 hover:text-[#775fab] transition-colors duration-300 flex items-center gap-2 group">
                                    <i className="fa-solid fa-chevron-right text-xs text-[#775fab] opacity-0 group-hover:opacity-100 transition-opacity"></i>
                                    Reviews
                                </Link>
                            </li>
                            <li>
                                <Link to="/jobs" className="text-gray-300 hover:text-[#775fab] transition-colors duration-300 flex items-center gap-2 group">
                                    <i className="fa-solid fa-chevron-right text-xs text-[#775fab] opacity-0 group-hover:opacity-100 transition-opacity"></i>
                                    Careers
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6 relative">
                            Support
                            <span className="absolute -bottom-2 left-0 w-10 h-0.5 bg-[#775fab]"></span>
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/faq" className="text-gray-300 hover:text-[#775fab] transition-colors duration-300 flex items-center gap-2 group">
                                    <i className="fa-solid fa-chevron-right text-xs text-[#775fab] opacity-0 group-hover:opacity-100 transition-opacity"></i>
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-300 hover:text-[#775fab] transition-colors duration-300 flex items-center gap-2 group">
                                    <i className="fa-solid fa-chevron-right text-xs text-[#775fab] opacity-0 group-hover:opacity-100 transition-opacity"></i>
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/policy" className="text-gray-300 hover:text-[#775fab] transition-colors duration-300 flex items-center gap-2 group">
                                    <i className="fa-solid fa-chevron-right text-xs text-[#775fab] opacity-0 group-hover:opacity-100 transition-opacity"></i>
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="text-gray-300 hover:text-[#775fab] transition-colors duration-300 flex items-center gap-2 group">
                                    <i className="fa-solid fa-chevron-right text-xs text-[#775fab] opacity-0 group-hover:opacity-100 transition-opacity"></i>
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link to="/login" className="text-gray-300 hover:text-[#775fab] transition-colors duration-300 flex items-center gap-2 group">
                                    <i className="fa-solid fa-chevron-right text-xs text-[#775fab] opacity-0 group-hover:opacity-100 transition-opacity"></i>
                                    My Account
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6 relative">
                            Get In Touch
                            <span className="absolute -bottom-2 left-0 w-10 h-0.5 bg-[#775fab]"></span>
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <i className="fa-solid fa-location-dot text-[#775fab]"></i>
                                </div>
                                <span className="text-gray-300 text-sm">
                                    123 Fitness Street,<br />
                                    New York, NY 10001
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <i className="fa-solid fa-envelope text-[#775fab]"></i>
                                </div>
                                <a href="mailto:support@trackify.com" className="text-gray-300 text-sm hover:text-[#775fab] transition-colors">
                                    support@trackify.com
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <i className="fa-solid fa-phone text-[#775fab]"></i>
                                </div>
                                <a href="tel:+1234567890" className="text-gray-300 text-sm hover:text-[#775fab] transition-colors">
                                    +1 (234) 567-890
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} Trackify. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <Link to="/policy" className="text-gray-400 text-sm hover:text-[#775fab] transition-colors">
                                Privacy
                            </Link>
                            <Link to="/terms" className="text-gray-400 text-sm hover:text-[#775fab] transition-colors">
                                Terms
                            </Link>
                            <Link to="/contact" className="text-gray-400 text-sm hover:text-[#775fab] transition-colors">
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
