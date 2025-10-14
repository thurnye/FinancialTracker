import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import Input from '../ui/Input';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  registration?: UseFormRegisterReturn;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  registration,
  helperText,
  leftIcon,
  rightIcon,
  ...props
}) => {
  return (
    <Input
      label={label}
      error={error}
      helperText={helperText}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      {...registration}
      {...props}
    />
  );
};

export default FormField;
