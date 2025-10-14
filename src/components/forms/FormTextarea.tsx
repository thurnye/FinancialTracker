import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import Textarea from '../ui/Textarea';

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  registration?: UseFormRegisterReturn;
  helperText?: string;
}

const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  error,
  registration,
  helperText,
  ...props
}) => {
  return (
    <Textarea
      label={label}
      error={error}
      helperText={helperText}
      {...registration}
      {...props}
    />
  );
};

export default FormTextarea;
