import React from 'react';

interface ErrorStateProps {
  message?: string;
  className?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ 
  message = "An error occurred",
  className = "text-center text-red-600"
}) => {
  return (
    <div className={className}>
      {message}
    </div>
  );
};

export default ErrorState; 