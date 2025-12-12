import React, { useState, useRef, useEffect } from "react";
import FormField from "../ui/FormField";

// Custom Form Dropdown Component for styled options
const FormDropdown = ({ 
  label, 
  icon, 
  value, 
  onChange,
  name,
  options, 
  placeholder = 'Select an option',
  placeholderIcon = '✨',
  error
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-semibold text-[#32284a] dark:text-gray-300 mb-2">
          {icon && <i className={`${icon} mr-2 text-[#775fab]`}></i>}
          {label}
        </label>
      )}
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full pl-4 pr-14 py-3 bg-gray-50 dark:bg-gray-800 border-2 rounded-xl text-left font-medium cursor-pointer transition-all duration-300 flex items-center gap-2
            ${isOpen 
              ? 'border-[#775fab] bg-white dark:bg-gray-800 shadow-lg shadow-[#775fab]/10' 
              : 'border-gray-200 dark:border-gray-600 hover:border-[#775fab]/50 hover:shadow-md hover:bg-white dark:hover:bg-[#252542]'
            }
            ${error ? 'border-red-400' : ''}`}
        >
          {selectedOption ? (
            <>
              <span className="text-lg">{selectedOption.icon}</span>
              <span className="text-gray-800 dark:text-gray-200">{selectedOption.label}</span>
            </>
          ) : (
            <>
              <span className="text-lg">{placeholderIcon}</span>
              <span className="text-gray-400">{placeholder}</span>
            </>
          )}
        </button>
        
        <div className={`absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#775fab] to-[#32284a] text-white w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 shadow-md pointer-events-none
          ${isOpen ? 'rotate-180 scale-110' : ''}`}
        >
          <i className="fa-solid fa-chevron-down text-xs"></i>
        </div>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-700 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-black/30 overflow-hidden">
            <div className="max-h-56 overflow-y-auto py-2">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`w-full px-4 py-3 flex items-center gap-3 transition-all duration-200 hover:bg-gradient-to-r hover:from-[#775fab]/10 hover:to-transparent
                    ${value === option.value ? 'bg-gradient-to-r from-[#775fab]/15 to-[#775fab]/5 border-l-4 border-[#775fab]' : ''}`}
                >
                  <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-sm transition-all duration-200
                    ${value === option.value 
                      ? 'bg-gradient-to-br from-[#775fab] to-[#32284a] text-white scale-105' 
                      : 'bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800'
                    }`}>
                    {option.icon}
                  </span>
                  <div className="flex-1 text-left">
                    <span className={`font-medium ${value === option.value ? 'text-[#775fab]' : 'text-gray-700 dark:text-gray-200'}`}>
                      {option.label}
                    </span>
                    {option.description && (
                      <p className="text-xs text-gray-400 mt-0.5">{option.description}</p>
                    )}
                  </div>
                  {value === option.value && (
                    <div className="w-6 h-6 rounded-full bg-[#775fab] flex items-center justify-center">
                      <i className="fa-solid fa-check text-white text-xs"></i>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {error && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
};

const PersonalInfoStep = ({ register, errors }) => {
	return (
		<div className="space-y-5">
			<div className="text-center mb-6">
				<div className="w-14 h-14 bg-gradient-to-r from-[#775fab]/10 to-[#32284a]/10 dark:from-[#775fab]/20 dark:to-[#32284a]/20 rounded-full flex items-center justify-center mx-auto mb-3">
					<i className="fa-solid fa-user text-[#775fab] text-xl"></i>
				</div>
				<h2 className="text-xl font-bold text-[#32284a] dark:text-white">Personal Information</h2>
				<p className="text-gray-500 dark:text-gray-400 text-sm">Let's start with your basic details</p>
			</div>
			
			<div className="grid grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-semibold text-[#32284a] dark:text-gray-300 mb-2">
						First Name
					</label>
					<div className="relative">
						<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
							<i className="fa-solid fa-user text-sm"></i>
						</span>
						<input
							{...register("firstName")}
							placeholder="John"
							className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#775fab] focus:bg-white dark:focus:bg-gray-800 transition-all duration-300"
						/>
					</div>
					{errors.firstName && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.firstName.message}</p>}
				</div>
				<div>
					<label className="block text-sm font-semibold text-[#32284a] dark:text-gray-300 mb-2">
						Last Name
					</label>
					<div className="relative">
						<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
							<i className="fa-solid fa-user text-sm"></i>
						</span>
						<input
							{...register("lastName")}
							placeholder="Doe"
							className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#775fab] focus:bg-white dark:focus:bg-gray-800 transition-all duration-300"
						/>
					</div>
					{errors.lastName && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.lastName.message}</p>}
				</div>
			</div>
			
			<div>
				<label className="block text-sm font-semibold text-[#32284a] dark:text-gray-300 mb-2">
					Email Address
				</label>
				<div className="relative">
					<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
						<i className="fa-solid fa-envelope text-sm"></i>
					</span>
					<input
						type="email"
						{...register("email")}
						placeholder="john.doe@example.com"
						className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#775fab] focus:bg-white dark:focus:bg-gray-800 transition-all duration-300"
					/>
				</div>
				{errors.email && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.email.message}</p>}
			</div>

			<div>
				<label className="block text-sm font-semibold text-[#32284a] dark:text-gray-300 mb-2">
					Phone Number
				</label>
				<div className="relative">
					<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
						<i className="fa-solid fa-phone text-sm"></i>
					</span>
					<input
						{...register("phone")}
						placeholder="1234567890"
						className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#775fab] focus:bg-white dark:focus:bg-gray-800 transition-all duration-300"
					/>
				</div>
				{errors.phone && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.phone.message}</p>}
			</div>
		</div>
	);
};

const GoalsInfoStep = ({ register, errors, watch, setValue }) => {
	// Primary goals for dropdown
	const primaryGoalOptions = [
		{ value: 'Weight Loss', label: 'Weight Loss', icon: '🏃', description: 'Burn calories & shed fat' },
		{ value: 'Muscle Gain', label: 'Muscle Gain', icon: '💪', description: 'Build lean muscle mass' },
		{ value: 'Strength Training', label: 'Strength Training', icon: '🏋️', description: 'Increase raw strength' },
		{ value: 'Flexibility', label: 'Flexibility', icon: '🧘', description: 'Enhance mobility & stretching' },
		{ value: 'Endurance', label: 'Endurance', icon: '🚴', description: 'Boost stamina & cardio' },
		{ value: 'General Fitness', label: 'General Fitness', icon: '⭐', description: 'Overall health improvement' }
	];

	// Secondary goals for checkboxes (different from dropdown)
	const secondaryGoals = [
		'Improve Posture',
		'Better Sleep',
		'Stress Relief',
		'Increase Energy',
		'Build Confidence',
		'Sports Performance',
		'Injury Recovery',
		'Healthy Lifestyle'
	];

	const mainGoalValue = watch ? watch('mainGoal') : '';

	return (
		<div className="space-y-5">
			<div className="text-center mb-6">
				<div className="w-14 h-14 bg-gradient-to-r from-[#775fab]/10 to-[#32284a]/10 dark:from-[#775fab]/20 dark:to-[#32284a]/20 rounded-full flex items-center justify-center mx-auto mb-3">
					<i className="fa-solid fa-bullseye text-[#775fab] text-xl"></i>
				</div>
				<h2 className="text-xl font-bold text-[#32284a] dark:text-white">Fitness Goals</h2>
				<p className="text-gray-500 dark:text-gray-400 text-sm">What do you want to achieve?</p>
			</div>
			
			<FormDropdown
				label="Primary Goal"
				icon="fa-solid fa-star"
				value={mainGoalValue}
				onChange={(val) => setValue && setValue('mainGoal', val)}
				placeholder="Select your main goal"
				placeholderIcon="🎯"
				options={primaryGoalOptions}
				error={errors.mainGoal?.message}
			/>
			<input type="hidden" {...register("mainGoal")} />

			<div>
				<label className="block text-sm font-semibold text-[#32284a] dark:text-white mb-3">Additional Goals (Optional)</label>
				<div className="grid grid-cols-2 gap-3">
					{secondaryGoals.map(goal => (
						<label key={goal} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl cursor-pointer hover:border-[#775fab]/50 hover:bg-[#775fab]/5 dark:hover:bg-[#775fab]/20 transition-all duration-300 has-[:checked]:border-[#775fab] has-[:checked]:bg-[#775fab]/10 dark:has-[:checked]:bg-[#775fab]/20">
							<input 
								type="checkbox" 
								value={goal}
								{...register("goals")}
								className="w-4 h-4 rounded accent-[#775fab]"
							/>
							<span className="text-sm text-gray-700 dark:text-gray-300">{goal}</span>
						</label>
					))}
				</div>
			</div>
		</div>
	);
};

const MeasurementsInfoStep = ({ register, errors, watch, setValue }) => {
	const genderOptions = [
		{ value: 'Male', label: 'Male', icon: '👨', description: '' },
		{ value: 'Female', label: 'Female', icon: '👩', description: '' },
		{ value: 'Other', label: 'Other', icon: '🧑', description: '' },
		{ value: 'Prefer not to say', label: 'Prefer not to say', icon: '🔒', description: '' }
	];

	const genderValue = watch ? watch('gender') : '';

	return (
		<div className="space-y-5">
			<div className="text-center mb-6">
				<div className="w-14 h-14 bg-gradient-to-r from-[#775fab]/10 to-[#32284a]/10 dark:from-[#775fab]/20 dark:to-[#32284a]/20 rounded-full flex items-center justify-center mx-auto mb-3">
					<i className="fa-solid fa-ruler text-[#775fab] text-xl"></i>
				</div>
				<h2 className="text-xl font-bold text-[#32284a] dark:text-white">Body Measurements</h2>
				<p className="text-gray-500 dark:text-gray-400 text-sm">Help us personalize your fitness plan</p>
			</div>
			
			<div className="grid grid-cols-3 gap-4">
				<div>
					<label className="block text-sm font-semibold text-[#32284a] dark:text-white mb-2">Age</label>
					<div className="relative">
						<input
							type="number"
							{...register("age", { valueAsNumber: true })}
							placeholder="25"
							className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#775fab] focus:bg-white dark:focus:bg-gray-900 transition-all duration-300 text-center"
						/>
						<span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">yrs</span>
					</div>
					{errors.age && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.age.message}</p>}
				</div>
				<div>
					<label className="block text-sm font-semibold text-[#32284a] dark:text-white mb-2">Height</label>
					<div className="relative">
						<input
							type="number"
							{...register("height", { valueAsNumber: true })}
							placeholder="175"
							className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#775fab] focus:bg-white dark:focus:bg-gray-900 transition-all duration-300 text-center"
						/>
						<span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">cm</span>
					</div>
					{errors.height && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.height.message}</p>}
				</div>
				<div>
					<label className="block text-sm font-semibold text-[#32284a] dark:text-white mb-2">Weight</label>
					<div className="relative">
						<input
							type="number"
							{...register("weight", { valueAsNumber: true })}
							placeholder="70"
							className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#775fab] focus:bg-white dark:focus:bg-gray-900 transition-all duration-300 text-center"
						/>
						<span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">kg</span>
					</div>
					{errors.weight && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.weight.message}</p>}
				</div>
			</div>

			<FormDropdown
				label="Gender"
				icon="fa-solid fa-venus-mars"
				value={genderValue}
				onChange={(val) => setValue && setValue('gender', val)}
				placeholder="Select gender"
				placeholderIcon="👤"
				options={genderOptions}
				error={errors.gender?.message}
			/>
			<input type="hidden" {...register("gender")} />
		</div>
	);
};

const FitnessLevelStep = ({ register, errors }) => {
	const fitnessLevels = [
		{
			value: 'beginner',
			label: 'Beginner',
			description: 'New to fitness or returning after a long break',
			icon: 'fa-seedling'
		},
		{
			value: 'intermediate',
			label: 'Intermediate',
			description: 'Regular exercise for 6+ months',
			icon: 'fa-fire'
		},
		{
			value: 'advanced',
			label: 'Advanced',
			description: 'Consistent training for 2+ years',
			icon: 'fa-bolt'
		}
	];

	return (
		<div className="space-y-5">
			<div className="text-center mb-6">
				<div className="w-14 h-14 bg-gradient-to-r from-[#775fab]/10 to-[#32284a]/10 dark:from-[#775fab]/20 dark:to-[#32284a]/20 rounded-full flex items-center justify-center mx-auto mb-3">
					<i className="fa-solid fa-dumbbell text-[#775fab] text-xl"></i>
				</div>
				<h2 className="text-xl font-bold text-[#32284a] dark:text-white">Fitness Level</h2>
				<p className="text-gray-500 dark:text-gray-400 text-sm">Where are you in your fitness journey?</p>
			</div>
			
			<div className="space-y-3">
				{fitnessLevels.map(level => (
					<label 
						key={level.value} 
						className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl cursor-pointer hover:border-[#775fab]/50 hover:bg-[#775fab]/5 dark:hover:bg-[#775fab]/20 transition-all duration-300 has-[:checked]:border-[#775fab] has-[:checked]:bg-[#775fab]/10 dark:has-[:checked]:bg-[#775fab]/20"
					>
						<input 
							type="radio" 
							value={level.value}
							{...register("fitnessLevel")}
							className="w-5 h-5 accent-[#775fab]"
						/>
						<div className="w-12 h-12 bg-white dark:bg-gray-900 rounded-xl flex items-center justify-center shadow-sm">
							<i className={`fa-solid ${level.icon} text-[#775fab] text-lg`}></i>
						</div>
						<div className="flex-1">
							<h4 className="font-semibold text-[#32284a] dark:text-white">{level.label}</h4>
							<p className="text-sm text-gray-500 dark:text-gray-400">{level.description}</p>
						</div>
					</label>
				))}
			</div>
			{errors.fitnessLevel && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.fitnessLevel.message}</p>}
		</div>
	);
};

const CredentialsInfoStep = ({ register, errors }) => {
	return (
		<div className="space-y-5">
			<div className="text-center mb-6">
				<div className="w-14 h-14 bg-gradient-to-r from-[#775fab]/10 to-[#32284a]/10 dark:from-[#775fab]/20 dark:to-[#32284a]/20 rounded-full flex items-center justify-center mx-auto mb-3">
					<i className="fa-solid fa-lock text-[#775fab] text-xl"></i>
				</div>
				<h2 className="text-xl font-bold text-[#32284a] dark:text-white">Secure Your Account</h2>
				<p className="text-gray-500 dark:text-gray-400 text-sm">Create a password to protect your account</p>
			</div>
			
			<div>
				<label className="block text-sm font-semibold text-[#32284a] dark:text-white mb-2">Password</label>
				<div className="relative">
					<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
						<i className="fa-solid fa-key text-sm"></i>
					</span>
					<input
						type="password"
						{...register("password")}
						placeholder="Create a secure password"
						className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#775fab] focus:bg-white dark:focus:bg-gray-900 transition-all duration-300"
					/>
				</div>
				{errors.password && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.password.message}</p>}
			</div>

			<div className="bg-gradient-to-r from-[#775fab]/5 to-[#32284a]/5 dark:from-[#775fab]/10 dark:to-[#32284a]/10 border border-[#775fab]/20 dark:border-[#775fab]/30 rounded-xl p-4">
				<div className="flex items-start gap-3">
					<div className="w-8 h-8 bg-[#775fab]/10 dark:bg-[#775fab]/20 rounded-lg flex items-center justify-center flex-shrink-0">
						<i className="fa-solid fa-shield-halved text-[#775fab] text-sm"></i>
					</div>
					<div>
						<p className="font-semibold text-[#32284a] dark:text-white text-sm mb-2">Password Requirements</p>
						<ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
							<li className="flex items-center gap-2">
								<i className="fa-solid fa-check text-green-500 text-xs"></i>
								At least 6 characters
							</li>
							<li className="flex items-center gap-2">
								<i className="fa-solid fa-check text-green-500 text-xs"></i>
								Maximum 50 characters
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export {
	PersonalInfoStep,
	GoalsInfoStep,
	MeasurementsInfoStep,
	FitnessLevelStep,
	CredentialsInfoStep,
};








// // src/components/public/steps.jsx
// import React, { useEffect, useState } from 'react';
// import FormField from '../ui/FormField';
// import NumberField from '../ui/NumberField.jsx';
// import { GOALS, getGoalById } from '../../lib/utils/goals.jsx';
// import Button from '../ui/Button';
// import { useWatch } from 'react-hook-form';

// const PersonalInfoStep = ({ register, errors }) => {
//   return (
//     <div className="space-y-4">
//       <h1 className="text-center text-2xl">Personal Information</h1>

//       <div className="grid grid-cols-2 gap-4">
//         <FormField
//           id="firstName"
//           label="First Name:"
//           register={register}
//           errors={errors}
//           placeholder="Enter your first name"
//         />
//         <FormField
//           id="lastName"
//           label="Last Name:"
//           register={register}
//           errors={errors}
//           placeholder="Enter your last name"
//         />
//       </div>

//       <FormField
//         id="email"
//         label="Email:"
//         register={register}
//         errors={errors}
//         placeholder="Enter your email"
//       />

//       <FormField
//         id="phone"
//         label="Phone Number:"
//         type="number"
//         register={register}
//         errors={errors}
//         placeholder="Enter your phone number (eg: 1234567890)"
//       />
//     </div>
//   );
// };

// const GoalsInfoStep = ({
//   register,
//   errors,
//   setValue,
//   control,
//   getValues,
//   watch,
// }) => {
//   const [isMultipleGoals, setIsMultipleGoals] = useState(false);
//   const [mainGoal, setMainGoal] = useState('');

//   const handleMainGoal = id => {
//     setValue('mainGoal', id);
//     setMainGoal(id);
//     console.log('Main goal(update): ', getValues('mainGoal'));
//   };

//   const selectedGoals = useWatch({
//     control: control,
//     name: 'goals',
//     defaultValues: [],
//   });
//   // console.log('Selected Goals: ', selectedGoals);
//   useEffect(() => {
//     if (mainGoal === '') setMainGoal(getValues('mainGoal'));

//     if (selectedGoals.length > 1) setIsMultipleGoals(true);
//     else setIsMultipleGoals(false);
//   }, [selectedGoals, mainGoal]);

//   const toggleGoal = id => {
//     // console.log('Inside toggle');
//     const currentSelectGoals = getValues('goals');

//     const isSelected = currentSelectGoals.includes(id);

//     const newGoals = isSelected
//       ? currentSelectGoals.filter(goal => goal !== id)
//       : [...currentSelectGoals, id];

//     if (selectedGoals.length === 0) {
//       setValue('mainGoal', newGoals[0], { shouldValidate: true });
//     }
//     console.log(getValues('mainGoal'));
//     console.log('New Goals: ', newGoals);
//     setValue('goals', newGoals, { shouldValidate: true });
//   };
//   return (
//     <div className="space-y-4 px-4">
//       <h1 className="text-center text-2xl pb-4">Current goals</h1>

//       <div>
//         <h2 className="text-xl">What are your current fitness goals?</h2>
//         <p className="font-light ml-px text-gray-600">
//           Choose all that matter to you. Your trainer will consider everything
//           you choose when building your training plan.
//         </p>
//       </div>
//       {errors?.['goals'] && (
//         <p className="text-sm ml-1 text-red-600">{errors['goals']?.message}</p>
//       )}
//       <div className="flex flex-wrap w-full justify-center gap-4 pb-10">
//         {GOALS.map(goal => {
//           // console.log('Selected Goals:', selectedGoals);
//           const isSelected = selectedGoals.includes(goal.id);
//           // console.log('isSelected: ', isSelected);
//           return (
//             <Button
//               type="button"
//               key={goal.id}
//               onClick={() => toggleGoal(goal.id)}
//               className={`w-46 cursor-pointer rounded text-left transition-colors duration-300 outline-none border ${isSelected ? 'border bg-purple-100 border-purple-400' : 'bg-gray-100 hover:bg-gray-200 border-none'}`}
//             >
//               <div className="flex flex-col gap-2">
//                 <span className="inline-block bg-linear-to-r from-purple-400 via-blue-400 to-yellow-400 bg-clip-text text-transparent">
//                   {goal.icon}
//                 </span>
//                 <span className="font-light">{goal.label}</span>
//               </div>
//             </Button>
//           );
//         })}
//       </div>
//       {/* mainGoal Select */}

//       {errors?.['mainGoal'] && (
//         <p className="text-sm ml-1 text-red-600">
//           {errors['mainGoal']?.message}
//         </p>
//       )}
//       {isMultipleGoals && (
//         <>
//           <div className="">
//             <h1 className="text-xl">
//               Which goal matters most to you right now?
//             </h1>
//             <p className="font-light ml-px text-gray-600">
//               Choosing one helps us match you with the best trainer for your
//               needs. You'll still work toward your other goals along the way.
//             </p>
//           </div>
//           <div className="flex gap-4 flex-col">
//             {selectedGoals.map(id => {
//               const goal = getGoalById(id);
//               return goal.map(value => {
//                 const isMainGoalSelected = mainGoal === id;
//                 return (
//                   <Button
//                     key={value.id}
//                     onClick={() => handleMainGoal(id)}
//                     className={`w-full cursor-pointer rounded text-left transition-colors duration-300 outline-none border ${isMainGoalSelected ? 'border bg-purple-100 border-purple-400' : 'bg-gray-100 hover:bg-gray-200 border-none'} `}
//                   >
//                     <div className="flex gap-2">
//                       <span className="w-6 inline-block bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
//                         {value.icon}
//                       </span>
//                       <span className="font-light">{value.label}</span>
//                     </div>
//                   </Button>
//                 );
//               });
//             })}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// const MeasurementsInfoStep = ({ register, errors, setValue, getValues }) => {
//   const [gender, setGender] = useState('');
//   const handleGender = gen => {
//     setGender(gen);
//     setValue('gender', gen, { shouldValidate: true });
//   };

//   useEffect(() => {
//     if (gender === '') getValues('gender');
//   }, [gender]);

//   return (
//     <>
//       <div className="space-y-6 px-4">
//         <h1 className="text-center mb-6 text-2xl">Measurements</h1>
//         <div>
//           <h2 className="text-xl">
//             What is your height, weight, age and gender?
//           </h2>
//           <p className="font-light">
//             Your trainer will use this information to personalize your plan.
//           </p>

//           <div className="flex flex-col justify-center mt-6">
//             <NumberField
//               id={'height'}
//               label={'Height (cm)'}
//               register={register}
//               errors={errors}
//               className="bg-gray-100 border border-transparent hover:border-black"
//             />
//             <NumberField
//               id={'weight'}
//               label={'Weight (kg)'}
//               register={register}
//               errors={errors}
//               className="bg-gray-100 border border-transparent hover:border-black"
//             />
//             <NumberField
//               id={'age'}
//               label={'Age'}
//               register={register}
//               errors={errors}
//               className="bg-gray-100 border border-transparent hover:border-black"
//             />
//           </div>
//           <div className="mt-4">
//             <h2 className="text-xl my-6">How do you identify yourself?</h2>
//             {errors?.['gender'] && (
//               <p className="mb-2 text-sm ml-1 text-red-600">
//                 {errors['gender']?.message}
//               </p>
//             )}
//             <div className="flex flex-col gap-2">
//               <Button
//                 className={`w-full text-left outline-none cursor-pointer border ${gender === 'male' ? 'bg-purple-100 border-purple-400' : 'bg-gray-100 hover:bg-gray-200 border-none'}`}
//                 onClick={() => handleGender('male')}
//               >
//                 <span className="w-10 inline-block">
//                   <i className="fa-solid fa-mars"></i>
//                 </span>
//                 Man
//               </Button>
//               <Button
//                 className={`w-full text-left cursor-pointer border ${gender === 'female' ? 'bg-purple-100 border-purple-400' : 'bg-gray-100 hover:bg-gray-200 border-none'}`}
//                 onClick={() => handleGender('female')}
//               >
//                 <span className="w-10 inline-block">
//                   <i className="fa-solid fa-venus"></i>
//                 </span>
//                 Woman
//               </Button>
//               <Button
//                 className={`w-full text-left cursor-pointer border ${gender === 'other' ? 'bg-purple-100 border-purple-400' : 'bg-gray-100 hover:bg-gray-200 border-none'}`}
//                 onClick={() => handleGender('other')}
//               >
//                 <span className="w-10 inline-block">
//                   <i className="fa-solid fa-venus-mars"></i>
//                 </span>
//                 Others
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// const CredentialsInfoStep = ({ register, errors }) => {
//   const [isSecret, setIsSecret] = useState(true);
//   return (
//     <>
//       <div>
//         <h1 className="text-center text-2xl">User Credentials</h1>

//         <FormField
//           id={'username'}
//           label={'Username: '}
//           register={register}
//           errors={errors}
//           placeholder={'Enter username'}
//         />

//         <div className="relative overflow-hidden">
//           <FormField
//             className="w-full"
//             id={'password'}
//             label={'Password'}
//             type={isSecret?'password':'text'}
//             register={register}
//             errors={errors}
//             placeholder={'Enter password. eg:abcd@1234'}
//           />
//           <div className='absolute top-11 w-10 h-10 flex justify-center items-center text-xl right-2 cursor-pointer'>
//             {isSecret ? (
//               <i
//                 className="fa-regular fa-eye-slash"
//                 onClick={() => setIsSecret(prev => !prev)}
//               ></i>
//             ) : (
//               <i
//                 className="fa-regular fa-eye"
//                 onClick={() => setIsSecret(prev => !prev)}
//               ></i>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export {
//   PersonalInfoStep,
//   GoalsInfoStep,
//   MeasurementsInfoStep,
//   CredentialsInfoStep,
// };
