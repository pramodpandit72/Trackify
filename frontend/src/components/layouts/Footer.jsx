import { useLocation } from "react-router-dom";


function Footer() {

    const location = useLocation();

    const addStyling =
		location.pathname === "/"
			? "hover:font-medium hover:text-[#b6c7e4]"
			: "text-[#362a50] hover:font-medium hover:text-[#775fab]";
  return (
		<>
			<footer
				className={`${
					location.pathname === "/"
						? "text-white bg-[#32284a]"
						: "bg-white text-[#362a50]" } p-16
                ${location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/knowus"? "hidden":""}`}
			>
				<section className="grid grid-cols-3 font-light px-14">
					<div className="flex justify-evenly flex-col">
						<div className="">
							<a href="/">
								<img
									src={location.pathname === "/" ? "logo.png": "/logo1.png"}
									alt="LOGO"
									className="w-full h-20"
								/>
							</a>
						</div>
						<div className="flex justify-evenly p-3 mt-4">
							<a
								href="https://www.linkedin.com/in/-abhilash-reddy/"
								target="_blank"
							>
								<i className="fa-brands fa-facebook text-4xl hover:text-blue-500"></i>
							</a>
							<a
								href="https://www.linkedin.com/in/-abhilash-reddy/"
								target="_blank"
							>
								<i className="fa-brands fa-linkedin text-4xl hover:text-blue-500/55"></i>
							</a>
							<a
								href="https://www.linkedin.com/in/-abhilash-reddy/"
								target="_blank"
							>
								<i className="fa-brands fa-instagram text-4xl hover:text-pink-500"></i>
							</a>
							<a
								href="https://www.linkedin.com/in/-abhilash-reddy/"
								target="_blank"
							>
								<i className="fa-brands fa-square-reddit text-4xl hover:text-orange-500"></i>
							</a>
							<a
								href="https://www.linkedin.com/in/-abhilash-reddy/"
								target="_blank"
							>
								<i className="fa-brands fa-youtube text-4xl hover:text-red-600"></i>
							</a>
						</div>
						<div className="flex justify-center items-end h-full">
							© Trackify {new Date().getFullYear()}
						</div>
					</div>
					<div>
						<h3 className="font-bold text-xl">Company</h3>
						<ul>
							<li>
								<a
									href="/about"
									className={addStyling}
								>
									Trackify
								</a>
							</li>
							<li>
								<a
									href="/about"
									className={addStyling}
								>
									About
								</a>
							</li>
							<li>
								<a
									href="/blog"
									className={addStyling}
								>
									Blog
								</a>
							</li>
							<li>
								<a
									href="/podcast"
									className={addStyling}
								>
									PodCast
								</a>
							</li>
							<li>
								<a
									href="/journeys"
									className={addStyling}
								>
									Journeys
								</a>
							</li>
							<li>
								<a
									href="/reviews"
									className={addStyling}
								>
									Reviews
								</a>
							</li>
							<li>
								<a
									href="/news"
									className={addStyling}
								>
									In the News
								</a>
							</li>
							<li>
								<a
									href="/jobs"
									className={addStyling}
								>
									Jobs
								</a>
							</li>
							<li>
								<a
									href="/location"
									className={addStyling}
								>
									Locations
								</a>
							</li>
							<li>
								<a
									href="/gifts"
									className={addStyling}
								>
									Gift Cards/Apparel
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="font-bold text-xl">Resources</h3>
						<ul>
							<li>
								<a
									href="faq"
									className={addStyling}
								>
									FAQ
								</a>
							</li>
							<li>
								<a
									href="/help"
									className={addStyling}
								>
									Help Center
								</a>
							</li>
							<li>
								<a
									href="/contact"
									className={addStyling}
								>
									Contact
								</a>
							</li>
							<li>
								<a
									href="exercise"
									className={addStyling}
								>
									Exercise Library
								</a>
							</li>
							<li>
								<a
									href="/partner"
									className={addStyling}
								>
									Patnerships
								</a>
							</li>
							<li>
								<a
									href="/ambassador"
									className={addStyling}
								>
									Ambassadors
								</a>
							</li>
							<li>
								<a
									href="/policy"
									className={addStyling}
								>
									Privacy Policy
								</a>
							</li>
							<li>
								<a
									href="/terms"
									className={addStyling}
								>
									Terms & Conditions
								</a>
							</li>
							<li>
								<a
									href="/login"
									className={addStyling}
								>
									Manage Account
								</a>
							</li>
						</ul>
					</div>
				</section>
			</footer>
		</>
  );
}

export default Footer