import React from 'react';

interface BackButtonProps {
  className?: string;
  children?: React.ReactNode;
  onBack?: () => void;
  router?: any; // Optional router for testing/Storybook
}

const BackButton: React.FC<BackButtonProps> = ({ 
  className = "text-blue-600 hover:text-blue-500 mb-4 flex items-center",
  children = "← Back",
  onBack,
  router
}) => {
  const handleClick = () => {
    if (onBack) {
      onBack();
    } else if (router) {
      router.back();
    } else {
      // Fallback for Storybook or other environments
      console.log('Back button clicked (no router available)');
    }
  };

  return (
    <button
      onClick={handleClick}
      className={className}
    >
      {children}
    </button>
  );
};

export default BackButton; 