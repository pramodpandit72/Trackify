import React from "react";

function ProgressSteps({ currentStep, steps }) {
	return (
		<>
			<div className="flex justify-between items-center mt-2">
				{steps.map((step, index) => {
					const icon = step.icon;
					const isCompleted = index < currentStep;
					const isCurrent = index === currentStep;

					return (
						<div key={step.id} className="flex items-center flex-1">
							<div className="flex flex-col items-center">
								<div
									className={`w-15 text-3xl h-15 rounded-full flex items-center justify-center transition-colors ${
										isCompleted
											? "bg-black text-white"
											: isCurrent
											? "bg-black text-white"
											: "bg-gray-200 text-black"
									}`}
								>
									{isCompleted ? (
										<i className="fa-solid fa-check"></i>
									) : (
										icon
									)}
								</div>
								<span className="text-sm mt-2 font-light block">
									{step.name}
								</span>
							</div>
							{index < steps.length - 1 && (
								<div
									className={`flex-1 h-1 mb-3 rounded mx-2 transition-colors ${
										isCompleted ? "bg-black" : "bg-gray-200"
									}`}
								/>
							)}
						</div>
					);
				})}
			</div>
		</>
	);
}

export default ProgressSteps;
