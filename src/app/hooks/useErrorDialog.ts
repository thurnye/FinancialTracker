import { useState } from 'react';

interface UseErrorDialogReturn {
  showErrorDialog: boolean;
  errorMessage: string;
  errorDetails: string;
  showError: (message: string, error?: any) => void;
  hideError: () => void;
}

export function useErrorDialog(): UseErrorDialogReturn {
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorDetails, setErrorDetails] = useState('');

  const showError = (message: string, error?: any) => {
    setErrorMessage(message);
    setErrorDetails(error?.message || JSON.stringify(error, null, 2));
    setShowErrorDialog(true);
  };

  const hideError = () => {
    setShowErrorDialog(false);
    setErrorMessage('');
    setErrorDetails('');
  };

  return {
    showErrorDialog,
    errorMessage,
    errorDetails,
    showError,
    hideError,
  };
}
