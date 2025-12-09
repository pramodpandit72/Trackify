import { useState } from "react";
import axios from "axios";
import {
	credentialsInfoSchema,
	goalsInfoSchema,
	measurementsInfoSchema,
	personalInfoSchema,
	fitnessLevelSchema,
} from "../validation/data";

const stepSchemas = [
	personalInfoSchema,
	goalsInfoSchema,
	measurementsInfoSchema,
	fitnessLevelSchema,
	credentialsInfoSchema,
];

export const steps = [
	{
		id: "personal",
		name: "Personal",
		icon: <i className="fa-solid fa-signature"></i>,
	},
	{
		id: "goals",
		name: "Goals",
		icon: <i className="fa-solid fa-bullseye"></i>,
	},
	{
		id: "measurements",
		name: "Measurements",
		icon: <i className="fa-solid fa-weight-scale"></i>,
	},
	{
		id: "fitness",
		name: "Fitness Level",
		icon: <i className="fa-solid fa-dumbbell"></i>,
	},
	{
		id: "credentials",
		name: "Credentials",
		icon: <i className="fa-regular fa-user"></i>,
	},
];

const initialFormData = {
	firstName: "",
	lastName: "",
	email: "",
	phone: "",
	goals: [],
	mainGoal: "",
	height: 0,
	weight: 0,
	age: 0,
	gender: "",
	fitnessLevel: "",
	username: "",
	password: "",
};

export function useMultiStepForm() {
	const [currentStep, setCurrentStep] = useState(0);
	const [formData, setFormData] = useState(initialFormData);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const isFirstStep = currentStep === 0;
	const isLastStep = currentStep === steps.length - 1;

	const getCurrentStepSchema = () => stepSchemas[currentStep];

	const goToNextStep = () => {
		if (!isLastStep) setCurrentStep((prev) => prev + 1);
	};

	const goToPerviousStep = () => {
		if (!isFirstStep) setCurrentStep((prev) => prev - 1);
	};

	const updateFormData = (newData) => {
		setFormData((prev) => ({ ...prev, ...newData }));
	};

	const submitForm = async (data) => {
		setError('');
		setLoading(true);

		try {
			const response = await axios.post('/api/auth/signup', {
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				phone: data.phone,
				password: data.password,
				goals: data.goals,
				mainGoal: data.mainGoal,
				age: data.age,
				height: data.height,
				weight: data.weight,
				fitnessLevel: data.fitnessLevel
			});

			console.log("SignUp Successful", response.data);
			
			// Store token in localStorage
			localStorage.setItem('token', response.data.token);
			localStorage.setItem('user', JSON.stringify(response.data.user));
			
			setIsSubmitted(true);
			
			// Redirect to home page after successful signup
			setTimeout(() => {
				window.location.href = '/';
			}, 2000);
		} catch (err) {
			console.error('Signup error:', err);
			setError(err.response?.data?.errors?.[0]?.message || err.response?.data?.message || 'Signup failed. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	const resetForm = () => {
		setFormData(initialFormData);
		setCurrentStep(0);
		setIsSubmitted(false);
		setError('');
	};

	return {
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
	};
}
