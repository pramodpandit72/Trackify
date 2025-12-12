import React from "react";

function ProgressSteps({ currentStep, steps }) {
	return (
		<div className="w-full">
			{/* Progress Bar */}
			<div className="relative mb-2">
				<div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 rounded-full"></div>
				<div 
					className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-[#775fab] to-[#32284a] -translate-y-1/2 rounded-full transition-all duration-500 ease-out"
					style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
				></div>
				
				<div className="relative flex justify-between">
					{steps.map((step, index) => {
						const isCompleted = index < currentStep;
						const isCurrent = index === currentStep;

						return (
							<div key={step.id} className="flex flex-col items-center">
								<div
									className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold transition-all duration-300 ${
										isCompleted
											? "bg-gradient-to-r from-[#775fab] to-[#32284a] text-white shadow-lg shadow-[#775fab]/30"
											: isCurrent
											? "bg-gradient-to-r from-[#775fab] to-[#32284a] text-white shadow-lg shadow-[#775fab]/30 ring-4 ring-[#775fab]/20"
											: "bg-gray-100 text-gray-400 border-2 border-gray-200"
									}`}
								>
									{isCompleted ? (
										<i className="fa-solid fa-check text-sm"></i>
									) : (
										<span className="text-sm">{step.icon}</span>
									)}
								</div>
								<span className={`text-xs mt-2 font-medium transition-colors duration-300 ${
									isCurrent ? "text-[#775fab]" : isCompleted ? "text-[#32284a]" : "text-gray-400"
								}`}>
									{step.name}
								</span>
							</div>
						);
					})}
				</div>
			</div>
			
			{/* Step Counter */}
			<div className="text-center mt-4">
				<span className="text-sm text-gray-500">
					Step <span className="font-semibold text-[#775fab]">{currentStep + 1}</span> of {steps.length}
				</span>
			</div>
		</div>
	);
}

export default ProgressSteps;
