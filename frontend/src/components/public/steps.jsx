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
