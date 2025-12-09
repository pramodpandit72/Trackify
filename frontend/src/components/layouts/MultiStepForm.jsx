import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMultiStepForm } from "../../features/useMultiStepForm";
import ProgressSteps from "../public/ProgressSteps";
import {
	CredentialsInfoStep,
	GoalsInfoStep,
	MeasurementsInfoStep,
	PersonalInfoStep,
	FitnessLevelStep,
} from "../public/steps";
import Button from "../ui/Button";

function MultiStepForm() {
	const {
		currentStep,
		formData,
		isFirstStep,
		isLastStep,
		isSubmitted,
		steps,
		error,
		loading,
		getCurrentStepSchema,
		goToNextStep,
		goToPerviousStep,
		updateFormData,
		submitForm,
		resetForm,
	} = useMultiStepForm();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		trigger,
		setValue,
		reset,
	} = useForm({
		resolver: zodResolver(getCurrentStepSchema()),
		mode: "onChange",
		defaultValues: formData,
	});

	const currentForm = [
		<PersonalInfoStep register={register} errors={errors} />,
		<GoalsInfoStep register={register} errors={errors} />,
		<MeasurementsInfoStep register={register} errors={errors} />,
		<FitnessLevelStep register={register} errors={errors} />,
		<CredentialsInfoStep register={register} errors={errors} />,
	];

	useEffect(() => {
		reset(formData);

	}, [currentStep, formData, reset]);

	const onNext = async (data) => {
		console.log("DATA SEEN BY RHF FOR THIS STEP:", data);
		// Manual Validation
		const isValid = await trigger();
		console.log("IS VALID?", isValid);
		if (!isValid) return; // stop if validation fails
		const updatedData = { ...formData, ...data };
		updateFormData(updatedData);
		if (isLastStep) {
			try {
				submitForm(updatedData);
			} catch (e) {
				console.error("Submission failed: ", e);
			}
		} else {
			goToNextStep();
		}
	};

	if (isSubmitted) {
		return (
			<div className="min-h-[83.5vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-white p-4">
				<div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-12 border border-gray-100 text-center">
					<div className="text-6xl mb-6">✅</div>
					<h1 className="text-3xl font-bold text-[#1a1a1a] mb-3">Welcome to Trackify!</h1>
					<p className="text-gray-600 mb-8">
						Your account has been created successfully. Get ready to transform your fitness journey with a personalized trainer.
					</p>
					<div className="space-y-3 bg-blue-50 rounded-xl p-4 mb-8">
						<p className="text-sm text-blue-900">
							<span className="font-semibold">Next Steps:</span>
						</p>
						<ul className="text-sm text-blue-800 space-y-1 text-left">
							<li>✓ Complete your fitness assessment</li>
							<li>✓ Get matched with your perfect trainer</li>
							<li>✓ Choose a plan that fits your goals</li>
						</ul>
					</div>
					<button
						onClick={resetForm}
						className="w-full bg-[#775fab] text-white py-3 rounded-xl font-semibold hover:bg-[#5d3d89] transition-all"
					>
						Start a New Signup
					</button>
				</div>
			</div>
		);
	}

	return (
		<>
			<div className="min-h-[83.5vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-white p-4">
				<div className="bg-white p-8 flex flex-col gap-8 justify-center border border-gray-200 rounded-2xl w-full max-w-2xl shadow-lg">
					<div>
						<ProgressSteps
							currentStep={currentStep}
							steps={steps}
						/>
					</div>

					{error && (
						<div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
							{error}
						</div>
					)}

					<div className="space-y-6">{currentForm[currentStep]}</div>
					<div className="flex justify-between items-center pt-6 border-t border-gray-200">
						<Button
							type="button"
							variant="primary"
							className="cursor-pointer bg-white border border-gray-300 outline-none text-gray-700 font-medium transform 
							transition-all duration-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
							onClick={goToPerviousStep}
							disabled={isFirstStep || loading}
						>
							<i className="fa-solid fa-chevron-left mr-2"></i>
							Previous
						</Button>
						<div className="text-sm text-gray-500">
							Step {currentStep + 1} of {steps.length}
						</div>
						<Button
							onClick={handleSubmit(onNext)}
							type="button"
							className="bg-[#775fab] text-white cursor-pointer font-medium transition-all duration-300 hover:bg-[#5d3d89] disabled:opacity-60"
							disabled={isSubmitting || loading}
						>
							{loading ? (
								<>
									<i className="fa-solid fa-spinner fa-spin mr-2"></i>
									Processing...
								</>
							) : isLastStep ? (
								<>
									<i className="fa-solid fa-check mr-2"></i>
									Complete
								</>
							) : (
								<>
									<i className="fa-solid fa-chevron-right ml-2"></i>
									Next
								</>
							)}
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}

export default MultiStepForm;
