import { useState } from 'react';
import { validateForm, createChangeHandler } from '../utils/formValidation';
import type { FormField, FormValidationResult } from '../utils/formValidation';

interface UseFormOptions<T> {
  initialData: T;
  fields: FormField[];
  onSubmit: (data: T) => Promise<void> | void;
}

interface UseFormReturn<T> {
  formData: T;
  errors: Record<string, string>;
  isSubmitting: boolean;
  isValid: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  validateForm: () => FormValidationResult;
  resetForm: () => void;
}

export const useForm = <T extends Record<string, any>>({
  initialData,
  fields,
  onSubmit
}: UseFormOptions<T>): UseFormReturn<T> => {
  const [formData, setFormData] = useState<T>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = createChangeHandler(setFormData, setErrors);

  const validateFormData = (): FormValidationResult => {
    return validateForm(formData, fields);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateFormData();
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
      // Handle error appropriately
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(initialData);
    setErrors({});
    setIsSubmitting(false);
  };

  return {
    formData,
    errors,
    isSubmitting,
    isValid: Object.keys(errors).length === 0,
    handleChange,
    handleSubmit,
    setFormData,
    setErrors,
    validateForm: validateFormData,
    resetForm
  };
};
