import React from 'react';
import { Card } from '../../atoms';

interface RoutineCardProps {
  name: string;
  description?: string;
  onClick?: () => void;
}

const RoutineCard: React.FC<RoutineCardProps> = ({ name, description, onClick }) => (
  <div onClick={onClick} className="cursor-pointer hover:shadow-lg transition-shadow">
    <Card>
      <h3 className="text-lg font-bold mb-1">{name}</h3>
      {description && <p className="text-gray-700 text-sm">{description}</p>}
    </Card>
  </div>
);

export default RoutineCard; 