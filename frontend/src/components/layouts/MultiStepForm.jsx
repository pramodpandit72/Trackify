import React, { useEffect } from 'react';
import { useMultiStepForm } from '../../features/useMultiStepForm';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import footer_logo from "../../assets/footer_logo.png";

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
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white dark:from-black dark:to-gray-900 p-6">
      <div className="w-full max-w-2xl py-8">
        {/* Logo & Header */}
        <div className="text-center mb-6">
          <Link to="/">
            <img src={footer_logo} alt="Trackify" className="mx-auto h-12 w-12 rounded-full object-cover" />
          </Link>
          <h1 className="text-2xl font-bold text-[#32284a] dark:text-white mb-1">Create Your Account</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Fill in your details to get started</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-6">
          <ProgressSteps currentStep={currentStep} steps={steps} />
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-black/30 p-8 border border-gray-100 dark:border-gray-700">
          {/* Success Message */}
          {isSubmitted && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-r-lg flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-check text-green-500"></i>
              </div>
              <div>
                <p className="text-green-800 dark:text-green-400 font-semibold">Account created successfully!</p>
                <p className="text-green-600 dark:text-green-500 text-sm">Redirecting to home page...</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-lg flex items-center gap-3">
              <i className="fa-solid fa-circle-exclamation text-red-500"></i>
              <span className="text-red-700 dark:text-red-400">{error}</span>
            </div>
          )}

          {/* Step Content */}
          <div className="min-h-[280px]">
            {currentForm[currentStep]}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-6 mt-6 border-t border-gray-100 dark:border-gray-700">
            <button
              type="button"
              onClick={goToPerviousStep}
              disabled={isFirstStep || loading}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isFirstStep || loading
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-[1.02]'
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
            <p className="text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-[#775fab] hover:text-[#32284a] dark:hover:text-purple-300 transition-colors"
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
    </section>
  );
}

export default MultiStepForm;
