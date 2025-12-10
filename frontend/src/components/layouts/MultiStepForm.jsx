import React, { useEffect } from 'react';
import { useMultiStepForm } from '../../features/useMultiStepForm';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import {
  CredentialsInfoStep,
  FitnessLevelStep,
  GoalsInfoStep,
  MeasurementsInfoStep,
  PersonalInfoStep,
} from '../public/Steps.jsx';
import ProgressSteps from '../public/ProgressSteps.jsx';
import Button from '../ui/Button.jsx';

function MultiStepForm() {
  const navigate = useNavigate();
  const {
    currentStep,
    formData,
    isFirstStep,
    isLastStep,
    isSubmitted,
    steps,
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
        submitForm(updatedData);
        resetForm();
        reset(); // Reset react-hook-form state
      } catch (e) {
        console.error('Submission failed: ', e);
      }
    } else {
      goToNextStep();
    }
  };

  return (
    <>
      <div className="min-h-[83.5vh] flex items-center justify-center bg-white p-4 pb-15 pt-28">
        <div className="bg-white p-4 flex flex-col gap-6 justify-center  border rounded-xl w-full max-w-2xl">
          <div className="mx-5">
            <ProgressSteps currentStep={currentStep} steps={steps} />
          </div>
          <div className="space-y-6">{currentForm[currentStep]}</div>
          <div className="flex justify-between items-center pt-4">
            <Button
              type="button"
              variant="primary"
              className="cursor-pointer bg-white border outline-none text-black border-black transform 
							transition-all duration-300 hover:scale-105 ease-in-out hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
              onClick={goToPerviousStep}
              disabled={isFirstStep}
            >
              <i className="fa-solid fa-chevron-left mr-3"></i>
              Previous
            </Button>
            <Button
              onClick={handleSubmit(onNext)}
              type="button"
              variant=""
              className="bg-black text-white cursor-pointer transform transition-all duration-300 hover:scale-105 ease-in-out"
            >
              {isLastStep ? 'Submit' : 'Next'}
              <i className="fa-solid fa-chevron-right ml-3"></i>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MultiStepForm;
