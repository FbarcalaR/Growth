import React from 'react';
import { Routine } from '../../../api/features/routines/types/routines';
import Button from '../../atoms/Button/Button';

interface RoutineHeaderProps {
  routine: Routine;
  showEditForm: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
  onToggleEdit: () => void;
  onDelete: () => void;
}

const RoutineHeader: React.FC<RoutineHeaderProps> = ({
  routine,
  showEditForm,
  updateLoading,
  deleteLoading,
  onToggleEdit,
  onDelete,
}) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{routine.name}</h1>
          <p className="text-gray-800">
            Started {new Date(routine.startDate).toLocaleDateString()} • {routine.totalDays} days active
          </p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="secondary"
            onClick={onToggleEdit}
            disabled={updateLoading || deleteLoading}
          >
            {showEditForm ? 'Cancel' : 'Edit'}
          </Button>
          <Button
            variant="secondary"
            onClick={onDelete}
            disabled={updateLoading || deleteLoading}
            className="text-red-600 hover:text-red-700"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoutineHeader; 