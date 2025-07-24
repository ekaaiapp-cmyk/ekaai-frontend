import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  disabled,
  className = '',
  children,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-primary-accent text-primary-bg hover:bg-yellow-500 focus:ring-primary-accent/20 transform hover:scale-105 disabled:transform-none',
    secondary: 'bg-gray-700 text-primary-text hover:bg-gray-600 focus:ring-gray-500/20',
    outline: 'border-2 border-primary-accent text-primary-accent hover:bg-primary-accent hover:text-primary-bg focus:ring-primary-accent/20 transform hover:scale-105 disabled:transform-none',
    ghost: 'text-primary-text hover:text-primary-accent hover:bg-gray-800 focus:ring-gray-500/20'
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? 'w-full' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  fullWidth = true,
  className = '',
  ...props
}) => {
  const inputClasses = [
    'px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-primary-text placeholder-gray-400',
    'focus:outline-none focus:border-primary-accent focus:ring-2 focus:ring-primary-accent/20',
    error ? 'border-red-500 focus:border-red-500' : '',
    fullWidth ? 'w-full' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="block text-sm font-medium text-primary-text mb-2">
          {label}
        </label>
      )}
      <input className={inputClasses} {...props} />
      {error && (
        <p className="text-red-400 text-sm mt-1">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-gray-400 text-sm mt-1">{helperText}</p>
      )}
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  options: Array<{ value: string; label: string }> | string[] | ReadonlyArray<{ value: string; label: string }> | ReadonlyArray<string>;
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  helperText,
  fullWidth = true,
  options,
  className = '',
  ...props
}) => {
  const selectClasses = [
    'px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-primary-text',
    'focus:outline-none focus:border-primary-accent focus:ring-2 focus:ring-primary-accent/20',
    error ? 'border-red-500 focus:border-red-500' : '',
    fullWidth ? 'w-full' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="block text-sm font-medium text-primary-text mb-2">
          {label}
        </label>
      )}
      <select className={selectClasses} {...props}>
        {options.map((option, index) => {
          const value = typeof option === 'string' ? option : option.value;
          const label = typeof option === 'string' ? option : option.label;
          return (
            <option key={index} value={value} className="bg-gray-900">
              {label}
            </option>
          );
        })}
      </select>
      {error && (
        <p className="text-red-400 text-sm mt-1">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-gray-400 text-sm mt-1">{helperText}</p>
      )}
    </div>
  );
};

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  fullWidth = true,
  className = '',
  ...props
}) => {
  const textareaClasses = [
    'px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-primary-text placeholder-gray-400',
    'focus:outline-none focus:border-primary-accent focus:ring-2 focus:ring-primary-accent/20',
    error ? 'border-red-500 focus:border-red-500' : '',
    fullWidth ? 'w-full' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="block text-sm font-medium text-primary-text mb-2">
          {label}
        </label>
      )}
      <textarea className={textareaClasses} {...props} />
      {error && (
        <p className="text-red-400 text-sm mt-1">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-gray-400 text-sm mt-1">{helperText}</p>
      )}
    </div>
  );
};

interface CheckboxGroupProps {
  label?: string;
  options: string[] | Array<{ value: string; label: string }> | ReadonlyArray<string> | ReadonlyArray<{ value: string; label: string }>;
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
  columns?: 1 | 2 | 3;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  options,
  value,
  onChange,
  error,
  columns = 2
}) => {
  const handleChange = (optionValue: string, checked: boolean) => {
    if (checked) {
      onChange([...value, optionValue]);
    } else {
      onChange(value.filter(v => v !== optionValue));
    }
  };

  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3'
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-primary-text mb-2">
          {label}
        </label>
      )}
      <div className={`grid ${gridClasses[columns]} md:grid-cols-${columns} gap-2`}>
        {options.map((option, index) => {
          const optionValue = typeof option === 'string' ? option : option.value;
          const optionLabel = typeof option === 'string' ? option : option.label;
          
          return (
            <label key={index} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={value.includes(optionValue)}
                onChange={(e) => handleChange(optionValue, e.target.checked)}
                className="w-4 h-4 text-primary-accent bg-gray-900 border-gray-600 rounded focus:ring-primary-accent/20"
              />
              <span className="text-sm text-primary-text">{optionLabel}</span>
            </label>
          );
        })}
      </div>
      {error && (
        <p className="text-red-400 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

interface RadioGroupProps {
  label?: string;
  options: string[] | Array<{ value: string; label: string }> | ReadonlyArray<string> | ReadonlyArray<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  direction?: 'horizontal' | 'vertical';
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  options,
  value,
  onChange,
  error,
  direction = 'horizontal'
}) => {
  const containerClasses = direction === 'horizontal' ? 'flex space-x-4' : 'space-y-2';

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-primary-text mb-2">
          {label}
        </label>
      )}
      <div className={containerClasses}>
        {options.map((option, index) => {
          const optionValue = typeof option === 'string' ? option : option.value;
          const optionLabel = typeof option === 'string' ? option : option.label;
          
          return (
            <label key={index} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                value={optionValue}
                checked={value === optionValue}
                onChange={(e) => onChange(e.target.value)}
                className="w-4 h-4 text-primary-accent bg-gray-900 border-gray-600 focus:ring-primary-accent/20"
              />
              <span className="text-sm text-primary-text">{optionLabel}</span>
            </label>
          );
        })}
      </div>
      {error && (
        <p className="text-red-400 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};
