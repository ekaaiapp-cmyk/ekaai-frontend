// Common form validation utilities and interfaces
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea' | 'checkbox' | 'radio';
  required?: boolean;
  options?: string[] | { value: string; label: string }[];
  placeholder?: string;
  validation?: (value: any) => string | undefined;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// Validation utility functions
export const validators = {
  required: (value: any): string | undefined => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return 'This field is required';
    }
    if (Array.isArray(value) && value.length === 0) {
      return 'Please select at least one option';
    }
    return undefined;
  },

  email: (value: string): string | undefined => {
    if (!value) return undefined;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? undefined : 'Please enter a valid email address';
  },

  phone: (value: string): string | undefined => {
    if (!value) return undefined;
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(value.replace(/[\s\-\(\)]/g, '')) ? undefined : 'Please enter a valid phone number';
  },

  minLength: (min: number) => (value: string): string | undefined => {
    if (!value) return undefined;
    return value.length >= min ? undefined : `Must be at least ${min} characters long`;
  },

  maxLength: (max: number) => (value: string): string | undefined => {
    if (!value) return undefined;
    return value.length <= max ? undefined : `Must be no more than ${max} characters long`;
  }
};

// Generic form validation function
export const validateForm = <T extends Record<string, any>>(
  data: T,
  fields: FormField[]
): FormValidationResult => {
  const errors: Record<string, string> = {};

  fields.forEach(field => {
    const value = data[field.name];
    
    // Check required fields
    if (field.required) {
      const requiredError = validators.required(value);
      if (requiredError) {
        errors[field.name] = requiredError;
        return;
      }
    }

    // Run custom validation
    if (field.validation && value) {
      const validationError = field.validation(value);
      if (validationError) {
        errors[field.name] = validationError;
      }
    }

    // Run type-specific validation
    if (value && field.type === 'email') {
      const emailError = validators.email(value);
      if (emailError) {
        errors[field.name] = emailError;
      }
    }

    if (value && field.type === 'tel') {
      const phoneError = validators.phone(value);
      if (phoneError) {
        errors[field.name] = phoneError;
      }
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Form field change handler utility
export const createChangeHandler = <T extends Record<string, any>>(
  setFormData: React.Dispatch<React.SetStateAction<T>>,
  setErrors?: React.Dispatch<React.SetStateAction<Record<string, string>>>
) => {
  return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => {
        const currentValue = prev[name];
        if (Array.isArray(currentValue)) {
          return {
            ...prev,
            [name]: checkbox.checked
              ? [...currentValue, value]
              : currentValue.filter((item: string) => item !== value)
          };
        } else {
          return {
            ...prev,
            [name]: checkbox.checked
          };
        }
      });
    } else if (type === 'radio') {
      setFormData(prev => ({
        ...prev,
        [name]: value === 'true' ? true : value === 'false' ? false : value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (setErrors) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
};
