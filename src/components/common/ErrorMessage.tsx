import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className = '' }) => {
  return (
    <div className={`flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg ${className}`}>
      <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
      <p className="text-sm text-red-800">{message}</p>
    </div>
  );
};

export default ErrorMessage;
