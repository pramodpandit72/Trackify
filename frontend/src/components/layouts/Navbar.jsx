import React, { useState, useEffect } from "react";

import Button from "../ui/Button";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

function NavBar() {
	// 2. Create state to track visibility
	const [isHovered, setIsHovered] = useState(false);
	const [user, setUser] = useState(null);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		// Check if user is logged in
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

	return (
		<>
			<section
				className={`${
					location.pathname === "/"
						? "bg-[#32284a]/80 text-white"
						: "bg-white/80 text-[#443049]"
				} backdrop-blur-md flex justify-between items-center px-15 h-25 z-50 fixed top-0 left-0 w-full`}
			>
				<div className="cursor-pointer">
					<NavLink to="/">
						<img
							src={
								location.pathname === "/"
									? "/logo.png"
									: "/logo1.png"
							}
							alt="LOGO"
							width={200}
							height={200}
							className={`${location.pathname === "/" ? "" : ""}`}
						/>
					</NavLink>
				</div>
				<div className="flex justify-center items-center gap-8 text-[1rem] font-medium">
					<nav>
						<ul
							className={`flex flex-row gap-7 justify-center items-center ${
								location.pathname === "/" ? "" : ""
							}`}
						>
							<li>
								<NavLink
									to="/"
									className={({ isActive }) =>
										`${isActive ? "" : ""} ${
											location.pathname === "/"
												? "hover:text-[#dedaee]"
												: "hover:text-[#775fab] text-[#443361]"
										}`
									}
								>
									Home
								</NavLink>
							</li>
							<li
								className={`${
									isHovered
										? location.pathname === "/"
											? "relative bg-[#32284a] px-2"
											: "relative bg-white px-2"
										: "px-2"
								}`}
								onMouseEnter={() => setIsHovered(true)}
								onMouseLeave={() => setIsHovered(false)}
							>
								<p
									className={`cursor-pointer ${
										location.pathname === "/"
											? ""
											: "text-[#443361]"
									}`}
								>
									What is Trackify?
									<i className="fa-solid fa-angle-down"></i>
								</p>

								{/* 4. Use the state to decide the class */}
								<ul
									className={`${
										isHovered
											? location.pathname === "/"
												? "block absolute bg-[#32284a] rounded px-8 py-4 top-full left-0 border border-[#150d26]"
												: "block absolute bg-white rounded px-8 py-4 top-full left-0 border border-[#150d26]"
											: "hidden"
									} ${
										location.pathname === "/"
											? ""
											: "text-[#443361]"
									}`}
								>
									<li className="mb-1">
										<NavLink
											to="/about"
											className={({ isActive }) =>
												`block w-full py-1 ${
													isActive
														? "text-[#775fab]"
														: "text-[#443361]"
												} ${
													location.pathname === "/"
														? "text-white hover:text-[#dedaee]"
														: "hover:text-[#775fab]"
												}`
											}
										>
											About
										</NavLink>
									</li>
									<hr className="border-[#150d26]" />
									<li className={`mb-1`}>
										<NavLink
											to="/contact"
											className={({ isActive }) =>
												`block w-full py-1 ${
													isActive
														? "text-[#775fab]"
														: "text-[#443361]"
												} ${
													location.pathname === "/"
														? "text-white hover:text-[#dedaee]"
														: "hover:text-[#775fab]"
												}`
											}
										>
											Contact
										</NavLink>
									</li>
									<hr className="border-[#150d26]" />
									<li>
										<NavLink
											to="/faq"
											className={({ isActive }) =>
												`block w-full py-1 ${
													isActive
														? "text-[#775fab]"
														: "text-[#443361]"
												} ${
													location.pathname === "/"
														? "text-white hover:text-[#dedaee]"
														: "hover:text-[#775fab]"
												}`
											}
										>
											FAQ (optional)
										</NavLink>
									</li>
								</ul>
							</li>
							<li>
								<NavLink
									to="/trainers"
									className={({ isActive }) =>
										`${
											isActive
												? "text-[#775fab]"
												: "text-[#443361]"
										} ${
											location.pathname === "/"
												? "text-white hover:text-[#dedaee]"
												: "hover:text-[#775fab]"
										}`
									}
								>
									Trainers
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/exercise"
									className={({ isActive }) =>
										`${
											isActive
												? "text-[#775fab]"
												: "text-[#443361]"
										} ${
											location.pathname === "/"
												? "text-white hover:text-[#dedaee]"
												: "hover:text-[#775fab]"
										}`
									}
								>
									Exercise Library
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/reviews"
									className={({ isActive }) =>
										`${
											isActive
												? "text-[#775fab]"
												: "text-[#443361]"
										} ${
											location.pathname === "/"
												? "text-white hover:text-[#dedaee]"
												: "hover:text-[#775fab]"
										}`
									}
								>
									Reviews
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/jobs"
									className={({ isActive }) =>
										`${
											isActive
												? "text-[#775fab]"
												: "text-[#443361]"
										} ${
											location.pathname === "/"
												? "text-white hover:text-[#dedaee]"
												: "hover:text-[#775fab]"
										}`
									}
								>
									Jobs
								</NavLink>
							</li>
						</ul>
					</nav>
					{user ? (
						<div className="relative">
							<button
								onClick={() => setIsDropdownOpen(!isDropdownOpen)}
								className={`bg-[#c3d7ff] text-[1rem] py-2 px-4 text-[#32284a] transition-all duration-300 hover:scale-105 ease-in-out cursor-pointer rounded-[25px] font-medium flex items-center gap-2`}
							>
								<i className="fa-solid fa-user-circle"></i>
								{user.firstName || 'User'}
								<i className={`fa-solid fa-chevron-down transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}></i>
							</button>
							{isDropdownOpen && (
								<div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
									<button
										onClick={handleProfileClick}
										className="w-full text-left px-4 py-3 hover:bg-gray-100 text-[#443361] font-medium flex items-center gap-2"
									>
										<i className="fa-solid fa-user"></i>
										My Profile
									</button>
									<button
										onClick={handleLogout}
										className="w-full text-left px-4 py-3 hover:bg-gray-100 text-red-600 font-medium flex items-center gap-2 border-t border-gray-200"
									>
										<i className="fa-solid fa-sign-out-alt"></i>
										Logout
									</button>
								</div>
							)}
						</div>
					) : (
						<Button
							className={`bg-[#c3d7ff] text-[1rem] text-center py-2 px-4 text-[#32284a] transition-all duration-300 hover:scale-115 ease-in-out cursor-pointer rounded-[25px]`}
						>
							<Link to="/login">
								{location.pathname === "/"
									? "Get Started"
									: "Get My Plan"}
							</Link>
						</Button>
					)}
				</div>
			</section>
		</>
	);
}

export default NavBar;
