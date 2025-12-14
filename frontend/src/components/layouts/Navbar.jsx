import React, { useState, useEffect } from "react";

import Button from "../ui/Button";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import navLogo from "../../assets/nav_logo.png";
import { useTheme } from "../../context/ThemeContext";

function NavBar() {
	const [isHovered, setIsHovered] = useState(false);
	const [user, setUser] = useState(null);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const { darkMode, toggleTheme } = useTheme();

	// Handle scroll effect
	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, [location]);

	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		setUser(null);
		setIsDropdownOpen(false);
		navigate('/login');
	};

	const handleProfileClick = () => {
		const userObj = JSON.parse(localStorage.getItem('user'));
		if (userObj.role === 'admin') {
			navigate('/admin/dashboard');
		} else {
			navigate('/dashboard');
		}
		setIsDropdownOpen(false);
	};

	const isHome = location.pathname === "/";

	return (
		<>
			<header
				className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
					scrolled 
						? "py-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg shadow-gray-200/50 dark:shadow-black/20" 
						: isHome 
							? "py-4 bg-gradient-to-r from-[#32284a]/90 via-[#443049]/85 to-[#32284a]/90 backdrop-blur-md" 
							: "py-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md"
				}`}
			>
				<div className="max-w-7xl mx-auto px-6 lg:px-8">
					<div className="flex justify-between items-center">
						{/* Logo */}
						<NavLink to="/" className="flex items-center gap-3 group">
							<div className={`relative p-1 rounded-full transition-all duration-300 ${
								scrolled || !isHome 
									? "bg-gradient-to-br from-[#775fab] to-[#32284a]" 
									: "bg-white/20"
							}`}>
								<img
									src={navLogo}
									alt="Trackify Logo"
									className="h-11 w-11 object-cover rounded-full transition-transform duration-300 group-hover:scale-110"
								/>
							</div>
							<span className={`text-2xl font-bold transition-all duration-300 ${
								scrolled || !isHome 
									? "bg-gradient-to-r from-[#775fab] via-[#9b7fd1] to-[#443049] bg-clip-text text-transparent dark:from-[#a78bda] dark:via-[#c4b5fd] dark:to-[#9b7fd1]" 
									: "text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.25)]"
							}`} style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.02em' }}>
								Trackify
							</span>
						</NavLink>

						{/* Desktop Navigation */}
						<nav className="hidden lg:flex items-center gap-1">
							{/* Home */}
							<NavLink
								to="/"
								className={({ isActive }) =>
									`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
										isActive
											? "bg-[#775fab] text-white shadow-md shadow-[#775fab]/30"
											: scrolled || !isHome
												? "text-[#443049] dark:text-gray-200 hover:bg-[#775fab]/10 hover:text-[#775fab] dark:hover:text-[#a78bda]"
												: "text-white/90 hover:bg-white/10 hover:text-white"
									}`
								}
							>
								Home
							</NavLink>

							{/* What is Trackify Dropdown */}
							<div
								className="relative"
								onMouseEnter={() => setIsHovered(true)}
								onMouseLeave={() => setIsHovered(false)}
							>
								<button
									className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1 ${
										scrolled || !isHome
											? "text-[#443049] dark:text-gray-200 hover:bg-[#775fab]/10 hover:text-[#775fab] dark:hover:text-[#a78bda]"
											: "text-white/90 hover:bg-white/10 hover:text-white"
									}`}
								>
									Discover
									<i className={`fa-solid fa-chevron-down text-xs transition-transform duration-300 ${isHovered ? 'rotate-180' : ''}`}></i>
								</button>

								{/* Dropdown Menu */}
								<div
									className={`absolute top-full left-0 mt-2 w-56 transition-all duration-300 ${
										isHovered ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
									}`}
								>
									<div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden p-2">
										<NavLink
											to="/about"
											className={({ isActive }) =>
												`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
													isActive
														? "bg-[#775fab] text-white"
														: "text-[#443049] hover:bg-[#775fab]/10"
												}`
											}
										>
											<div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-[#775fab]/10`}>
												<i className="fa-solid fa-info-circle text-[#775fab]"></i>
											</div>
											<div>
												<span className="font-medium">About Us</span>
												<p className="text-xs text-gray-400">Learn our story</p>
											</div>
										</NavLink>
										<NavLink
											to="/contact"
											className={({ isActive }) =>
												`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
													isActive
														? "bg-[#775fab] text-white"
														: "text-[#443049] hover:bg-[#775fab]/10"
												}`
											}
										>
											<div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-[#775fab]/10`}>
												<i className="fa-solid fa-envelope text-[#775fab]"></i>
											</div>
											<div>
												<span className="font-medium">Contact</span>
												<p className="text-xs text-gray-400">Get in touch</p>
											</div>
										</NavLink>
										<NavLink
											to="/faq"
											className={({ isActive }) =>
												`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
													isActive
														? "bg-[#775fab] text-white"
														: "text-[#443049] hover:bg-[#775fab]/10"
												}`
											}
										>
											<div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-[#775fab]/10`}>
												<i className="fa-solid fa-question-circle text-[#775fab]"></i>
											</div>
											<div>
												<span className="font-medium">FAQ</span>
												<p className="text-xs text-gray-400">Common questions</p>
											</div>
										</NavLink>
									</div>
								</div>
							</div>

							{/* Other Nav Items */}
							<NavLink
								to="/trainers"
								className={({ isActive }) =>
									`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
										isActive
											? "bg-[#775fab] text-white shadow-md shadow-[#775fab]/30"
											: scrolled || !isHome
												? "text-[#443049] dark:text-gray-200 hover:bg-[#775fab]/10 hover:text-[#775fab] dark:hover:text-[#a78bda]"
												: "text-white/90 hover:bg-white/10 hover:text-white"
									}`
								}
							>
								Trainers
							</NavLink>

							<NavLink
								to="/exercise"
								className={({ isActive }) =>
									`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
										isActive
											? "bg-[#775fab] text-white shadow-md shadow-[#775fab]/30"
											: scrolled || !isHome
												? "text-[#443049] dark:text-gray-200 hover:bg-[#775fab]/10 hover:text-[#775fab] dark:hover:text-[#a78bda]"
												: "text-white/90 hover:bg-white/10 hover:text-white"
									}`
								}
							>
								Exercises
							</NavLink>

							<NavLink
								to="/reviews"
								className={({ isActive }) =>
									`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
										isActive
											? "bg-[#775fab] text-white shadow-md shadow-[#775fab]/30"
											: scrolled || !isHome
												? "text-[#443049] dark:text-gray-200 hover:bg-[#775fab]/10 hover:text-[#775fab] dark:hover:text-[#a78bda]"
												: "text-white/90 hover:bg-white/10 hover:text-white"
									}`
								}
							>
								Reviews
							</NavLink>

							<NavLink
								to="/jobs"
								className={({ isActive }) =>
									`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
										isActive
											? "bg-[#775fab] text-white shadow-md shadow-[#775fab]/30"
											: scrolled || !isHome
												? "text-[#443049] dark:text-gray-200 hover:bg-[#775fab]/10 hover:text-[#775fab] dark:hover:text-[#a78bda]"
												: "text-white/90 hover:bg-white/10 hover:text-white"
									}`
								}
							>
								Jobs
							</NavLink>
						</nav>

						{/* Right Side - Theme Toggle & Auth */}
						<div className="flex items-center gap-3">
							{/* Theme Toggle Button */}
							<button
								onClick={toggleTheme}
								className={`p-2.5 rounded-xl transition-all duration-300 ${
									scrolled || !isHome
										? "bg-gray-100 dark:bg-gray-800 text-[#443049] dark:text-gray-300 hover:bg-[#775fab]/20 dark:hover:bg-[#775fab]/30"
										: "bg-white/10 text-white hover:bg-white/20"
								}`}
								aria-label="Toggle theme"
							>
								{darkMode ? (
									<i className="fa-regular fa-sun text-lg"></i>
								) : (
									<i className="fa-solid fa-moon text-lg"></i>
								)}
							</button>

							{user ? (
								<div className="relative">
									<button
										onClick={() => setIsDropdownOpen(!isDropdownOpen)}
										className="flex items-center gap-3 pl-2 pr-4 py-2 rounded-full bg-gradient-to-r from-[#775fab]/10 to-[#32284a]/10 hover:from-[#775fab]/20 hover:to-[#32284a]/20 transition-all duration-300"
									>
										<div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#775fab] to-[#32284a] flex items-center justify-center text-white text-sm font-bold">
											{user.firstName?.charAt(0) || 'U'}
										</div>
										<span className={`text-sm font-medium ${scrolled || !isHome ? "text-[#32284a]" : "text-white"}`}>
											{user.firstName || 'User'}
										</span>
										<i className={`fa-solid fa-chevron-down text-xs transition-transform duration-300 ${
											scrolled || !isHome ? "text-[#443049]" : "text-white/70"
										} ${isDropdownOpen ? 'rotate-180' : ''}`}></i>
									</button>
									
									{/* User Dropdown */}
									<div className={`absolute right-0 mt-2 w-56 transition-all duration-300 ${
										isDropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
									}`}>
										<div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden p-2">
											<div className="px-4 py-3 border-b border-gray-100">
												<p className="text-sm font-semibold text-[#32284a]">{user.firstName} {user.lastName}</p>
												<p className="text-xs text-gray-400">{user.email}</p>
											</div>
											<button
												onClick={handleProfileClick}
												className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#443049] hover:bg-[#775fab]/10 transition-all duration-200"
											>
												<div className="w-8 h-8 rounded-lg bg-[#775fab]/10 flex items-center justify-center">
													<i className="fa-solid fa-user text-[#775fab]"></i>
												</div>
												<span className="font-medium">My Dashboard</span>
											</button>
											<button
												onClick={handleLogout}
												className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all duration-200"
											>
												<div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
													<i className="fa-solid fa-sign-out-alt text-red-500"></i>
												</div>
												<span className="font-medium">Logout</span>
											</button>
										</div>
									</div>
								</div>
							) : (
								<Link
									to="/login"
									className="relative group px-6 py-2.5 rounded-full font-medium text-sm overflow-hidden transition-all duration-300"
								>
									<span className="absolute inset-0 bg-gradient-to-r from-[#775fab] to-[#32284a] transition-transform duration-300 group-hover:scale-105"></span>
									<span className="absolute inset-0 bg-gradient-to-r from-[#8b6fc0] to-[#443359] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
									<span className="relative text-white flex items-center gap-2">
										Get Started
										<i className="fa-solid fa-arrow-right text-xs transition-transform duration-300 group-hover:translate-x-1"></i>
									</span>
								</Link>
							)}

							{/* Mobile Menu Button */}
							<button
								onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
								className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${
									scrolled || !isHome ? "text-[#32284a] hover:bg-gray-100" : "text-white hover:bg-white/10"
								}`}
							>
								<i className={`fa-solid ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
							</button>
						</div>
					</div>
				</div>

				{/* Mobile Menu */}
				<div className={`lg:hidden transition-all duration-300 overflow-hidden ${
					mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
				}`}>
					<div className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-6 py-4 space-y-2">
						<NavLink to="/" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-[#443049] dark:text-gray-200 hover:bg-[#775fab]/10 font-medium">Home</NavLink>
						<NavLink to="/about" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-[#443049] dark:text-gray-200 hover:bg-[#775fab]/10 font-medium">About</NavLink>
						<NavLink to="/contact" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-[#443049] dark:text-gray-200 hover:bg-[#775fab]/10 font-medium">Contact</NavLink>
						<NavLink to="/trainers" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-[#443049] dark:text-gray-200 hover:bg-[#775fab]/10 font-medium">Trainers</NavLink>
						<NavLink to="/exercise" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-[#443049] dark:text-gray-200 hover:bg-[#775fab]/10 font-medium">Exercises</NavLink>
						<NavLink to="/reviews" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-[#443049] dark:text-gray-200 hover:bg-[#775fab]/10 font-medium">Reviews</NavLink>
						<NavLink to="/jobs" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-[#443049] dark:text-gray-200 hover:bg-[#775fab]/10 font-medium">Jobs</NavLink>
					</div>
				</div>
			</header>
			
			{/* Spacer for fixed navbar */}
			<div className={`${scrolled ? "h-16" : "h-20"} transition-all duration-500`}></div>
		</>
	);
}

export default NavBar;
