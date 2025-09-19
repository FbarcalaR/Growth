import React from 'react';

interface LoaderProps {
  message?: string;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ 
  message,
  className = "flex justify-center items-center"
}) => (
  <div className={className}>
    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mr-3" />
    {message && <span className="text-gray-800">{message}</span>}
  </div>
);

export default Loader; 