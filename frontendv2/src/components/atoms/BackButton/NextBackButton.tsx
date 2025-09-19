import React from 'react';
import { useRouter } from 'next/navigation';
import BackButton from './BackButton';

interface NextBackButtonProps {
  className?: string;
  children?: React.ReactNode;
  onBack?: () => void;
}

const NextBackButton: React.FC<NextBackButtonProps> = (props) => {
  const router = useRouter();
  
  return <BackButton {...props} router={router} />;
};

export default NextBackButton; 