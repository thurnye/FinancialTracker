import React from 'react';
import Spinner from '../ui/Spinner';

interface LoadingOverlayProps {
  text?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ text = 'Loading...' }) => {
  return (
    <div className="flex items-center justify-center py-20">
      <Spinner size="lg" text={text} />
    </div>
  );
};

export default LoadingOverlay;
