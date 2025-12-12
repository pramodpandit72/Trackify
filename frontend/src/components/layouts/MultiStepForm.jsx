import React, { useEffect } from 'react';
import { useMultiStepForm } from '../../features/useMultiStepForm';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';

import {
  CredentialsInfoStep,
  FitnessLevelStep,
  GoalsInfoStep,
  MeasurementsInfoStep,
  PersonalInfoStep,
} from '../public/Steps.jsx';
import ProgressSteps from '../public/ProgressSteps.jsx';

function MultiStepForm() {
  const navigate = useNavigate();
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
    formState: { errors, isSubmitting },
    handleSubmit,
    trigger,
    setValue,
    reset,
    watch,
    getValues,
    control,
  } = useForm({
    resolver: zodResolver(getCurrentStepSchema()),
    mode: 'onChange',
    defaultValues: formData,
  });

  const currentForm = [
    <PersonalInfoStep register={register} errors={errors} />,
    <GoalsInfoStep
      register={register}
      errors={errors}
      setValue={setValue}
      watch={watch}
      getValues={getValues}
      control={control}
    />,
    <MeasurementsInfoStep
      register={register}
      errors={errors}
      setValue={setValue}
      watch={watch}
      getValues={getValues}
    />,
    <FitnessLevelStep register={register} errors={errors} />,
    <CredentialsInfoStep register={register} errors={errors} />,
  ];

  const onNext = async data => {
    console.log('DATA SEEN BY RHF FOR THIS STEP:', data);
    // Manual Validation
    const isValid = await trigger();
    console.log('IS VALID?', isValid);
    if (!isValid) return; // stop if validation fails
    const updatedData = { ...formData, ...data };
    updateFormData(updatedData);
    if (isLastStep) {
      try {
        await submitForm(updatedData);
      } catch (e) {
        console.error('Submission failed: ', e);
      }
    } else {
      goToNextStep();
    }
  };

  return (
    <section className="min-h-screen flex">
      {/* Left Side - Image & Info */}
      <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#32284a]/90 via-[#775fab]/80 to-[#32284a]/90 z-10"></div>
        <img
          src="/images/login.jpg"
          alt="Fitness Journey"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-12">
          <div className="max-w-md text-center">
            <h2 className="text-4xl font-bold mb-6">Begin Your Transformation</h2>
            <p className="text-lg text-white/90 mb-8">
              Join thousands of users who have transformed their lives with personalized fitness plans and expert guidance.
            </p>
            
            <div className="space-y-4 text-left bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <i className="fa-solid fa-dumbbell"></i>
                </div>
                <div>
                  <h4 className="font-semibold">Personalized Workouts</h4>
                  <p className="text-sm text-white/80">Tailored to your fitness level</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <i className="fa-solid fa-user-check"></i>
                </div>
                <div>
                  <h4 className="font-semibold">Expert Trainers</h4>
                  <p className="text-sm text-white/80">Certified professionals</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <i className="fa-solid fa-chart-line"></i>
                </div>
                <div>
                  <h4 className="font-semibold">Track Progress</h4>
                  <p className="text-sm text-white/80">See your improvements</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-7/12 flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-white overflow-y-auto">
        <div className="w-full max-w-2xl py-8">
          {/* Logo & Header */}
          <div className="text-center mb-6">
            <Link to="/">
              <img src="/logo1.png" alt="Trackify" className="h-10 mx-auto mb-4" />
            </Link>
            <h1 className="text-2xl font-bold text-[#32284a] mb-1">Create Your Account</h1>
            <p className="text-gray-600 text-sm">Fill in your details to get started</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-6">
            <ProgressSteps currentStep={currentStep} steps={steps} />
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 border border-gray-100">
            {/* Success Message */}
            {isSubmitted && (
              <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="fa-solid fa-check text-green-500"></i>
                </div>
                <div>
                  <p className="text-green-800 font-semibold">Account created successfully!</p>
                  <p className="text-green-600 text-sm">Redirecting to home page...</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-center gap-3">
                <i className="fa-solid fa-circle-exclamation text-red-500"></i>
                <span className="text-red-700">{error}</span>
              </div>
            )}

            {/* Step Content */}
            <div className="min-h-[280px]">
              {currentForm[currentStep]}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-6 mt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={goToPerviousStep}
                disabled={isFirstStep || loading}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isFirstStep || loading
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-[1.02]'
                }`}
              >
                <i className="fa-solid fa-arrow-left"></i>
                Previous
              </button>

              <button
                onClick={handleSubmit(onNext)}
                type="button"
                disabled={loading}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#775fab] to-[#32284a] text-white font-semibold rounded-xl shadow-lg shadow-[#775fab]/30 hover:shadow-xl hover:shadow-[#775fab]/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i>
                    {isLastStep ? 'Creating...' : 'Please wait...'}
                  </>
                ) : (
                  <>
                    {isLastStep ? 'Create Account' : 'Continue'}
                    <i className={`fa-solid ${isLastStep ? 'fa-check' : 'fa-arrow-right'}`}></i>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-[#775fab] hover:text-[#32284a] transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-xs text-gray-400">
            By creating an account, you agree to our{' '}
            <Link to="/terms" className="text-[#775fab] hover:underline">Terms of Service</Link>
            {' '}and{' '}
            <Link to="/policy" className="text-[#775fab] hover:underline">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MultiStepForm;
