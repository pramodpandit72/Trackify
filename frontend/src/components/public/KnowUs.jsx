import React from 'react';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';

function KnowUs() {
  return (
		<>
			<div className="w-full h-fit bg-white grid grid-cols-2 overflow-hidden">
				<div className="w-full h-full py-10 my-5.5 bg-white px-30">
					<div className="flex flex-col items-center">
						<img
							src="/logo1.png"
							alt="logo"
							width={300}
							className="object-fill"
						/>
						<h1 className="bg-[#ddd7ea] w-fit p-1 text-xs mt-2 rounded">
							Loved by 52000+ clients!
						</h1>
					</div>

					<div className="mt-20">
						<h1 className="text-2xl py-3">
							1-on-1 Virtual Personal Training
						</h1>
						<p className="text-m text-gray-500 pt-2 pb-10">
							Get support, accountability, and curated plans from
							an expert personal trainer.
						</p>
						<Button
							variant=""
							className="w-full hover:bg-[#271d3b] bg-[#402f61] text-white"
						>
							<Link to="/signup" className="w-full h-full block">
								Get Started
							</Link>
						</Button>
					</div>
				</div>
				<div className="relative">
					<div className="w-80 bg-linear-to-r from-white via-transparent to-transparent h-full z-1 absolute top-0 left-0"></div>
					<img
						src="/images/knowus.jpg"
						alt="people"
						className="h-full bg-center object-center object-fill"
					/>
				</div>
			</div>
		</>
  );
}

export default KnowUs;