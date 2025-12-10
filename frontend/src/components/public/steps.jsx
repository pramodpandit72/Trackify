import React from "react";
import FormField from "../ui/FormField";

const PersonalInfoStep = ({ register, errors }) => {
	return (
		<>
			<div className="space-y-4">
				<h1 className="text-center text-2xl">Personal Information</h1>
				<div className="grid grid-cols-2 gap-4">
					<FormField
						id={"firstName"}
						label={"First Name: "}
						errors={errors}
						{...register("firstName")}
						placeholder="Enter your first name"
					/>
					<FormField
						id={"lastName"}
						label={"Last Name: "}
						errors={errors}
						{...register("lastName")}
						placeholder="Enter your last name"
					/>
				</div>
				<FormField 
					id="email"
					label={"Email: "}
					errors={errors}
					{...register("email")}
					placeholder="Enter your email"
				/>

				<FormField 
					id={"phone"}
					placeholder="Enter your phone number (eg: 1234567890)"
					label={"Phone Number: "}
					errors={errors}
					{...register("phone")}
				/>
			</div>
		</>
	);
};

const GoalsInfoStep = ({ register, errors }) => {
	const goals = [
		'Weight Loss',
		'Muscle Gain',
		'Strength Training',
		'Flexibility',
		'Endurance',
		'General Fitness'
	];

	return (
		<div className="space-y-4">
			<h1 className="text-center text-2xl">Fitness Goals</h1>
			<div className="space-y-3">
				<label className="block font-medium text-sm">What's your primary goal?</label>
				<select 
					{...register("mainGoal")}
					className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#775fab]"
				>
					<option value="">Select a goal</option>
					{goals.map(goal => (
						<option key={goal} value={goal}>{goal}</option>
					))}
				</select>
				{errors.mainGoal && <p className="text-red-500 text-sm">{errors.mainGoal.message}</p>}
			</div>

			<div className="space-y-3">
				<label className="block font-medium text-sm">Any other goals? (Select multiple)</label>
				<div className="grid grid-cols-2 gap-3">
					{goals.map(goal => (
						<label key={goal} className="flex items-center gap-2 cursor-pointer">
							<input 
								type="checkbox" 
								value={goal}
								{...register("goals")}
								className="w-4 h-4 rounded accent-[#775fab]"
							/>
							<span className="text-sm">{goal}</span>
						</label>
					))}
				</div>
			</div>
		</div>
	);
};

const MeasurementsInfoStep = ({ register, errors }) => {
	return (
		<div className="space-y-4">
			<h1 className="text-center text-2xl">Body Measurements</h1>
			
			<div className="grid grid-cols-3 gap-4">
				<FormField
					id={"age"}
					label={"Age: "}
					type="number"
					errors={errors}
					{...register("age", { valueAsNumber: true })}
					placeholder="Enter your age"
				/>
				<FormField
					id={"height"}
					label={"Height (cm): "}
					type="number"
					errors={errors}
					{...register("height", { valueAsNumber: true })}
					placeholder="e.g., 180"
				/>
				<FormField
					id={"weight"}
					label={"Weight (kg): "}
					type="number"
					errors={errors}
					{...register("weight", { valueAsNumber: true })}
					placeholder="e.g., 75"
				/>
			</div>

			<div className="space-y-3">
				<label className="block font-medium text-sm">Gender</label>
				<select 
					{...register("gender")}
					className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#775fab]"
				>
					<option value="">Select gender</option>
					<option value="Male">Male</option>
					<option value="Female">Female</option>
					<option value="Other">Other</option>
					<option value="Prefer not to say">Prefer not to say</option>
				</select>
				{errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
			</div>
		</div>
	);
};

const FitnessLevelStep = ({ register, errors }) => {
	return (
		<div className="space-y-4">
			<h1 className="text-center text-2xl">Fitness Level</h1>
			
			<div className="space-y-3">
				<label className="block font-medium text-sm">What's your current fitness level?</label>
				<select 
					{...register("fitnessLevel")}
					className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#775fab]"
				>
					<option value="">Select your fitness level</option>
					<option value="beginner">Beginner</option>
					<option value="intermediate">Intermediate</option>
					<option value="advanced">Advanced</option>
				</select>
				{errors.fitnessLevel && <p className="text-red-500 text-sm">{errors.fitnessLevel.message}</p>}
			</div>
		</div>
	);
};

const CredentialsInfoStep = ({ register, errors }) => {
	return (
		<div className="space-y-4">
			<h1 className="text-center text-2xl">Create Your Account</h1>
			
			<FormField
				id={"username"}
				label={"Username: "}
				errors={errors}
				{...register("username")}
				placeholder="Choose a username"
			/>

			<FormField
				id={"password"}
				label={"Password: "}
				type="password"
				errors={errors}
				{...register("password")}
				placeholder="Enter a strong password"
			/>

			<div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
				<p className="font-medium mb-2">Password must contain:</p>
				<ul className="space-y-1 list-disc list-inside">
					<li>At least 8 characters</li>
					<li>One uppercase letter</li>
					<li>One number</li>
					<li>One special character</li>
				</ul>
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
