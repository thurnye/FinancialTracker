import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import Select from '../ui/Select';

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  registration?: UseFormRegisterReturn;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
}

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  error,
  registration,
  helperText,
  options,
  placeholder,
  ...props
}) => {
  return (
    <Select
      label={label}
      error={error}
      helperText={helperText}
      options={options}
      placeholder={placeholder}
      {...registration}
      {...props}
    />
  );
};

export default FormSelect;
