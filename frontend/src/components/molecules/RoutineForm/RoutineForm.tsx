import React, { useState } from 'react';
import Button from '../../atoms/Button/Button';
import Input from '../../atoms/Input/Input';

interface RoutineFormProps {
  onSubmit: (data: { name: string; startDate: string }) => void;
  loading?: boolean;
  error?: string;
  initialData?: {
    name: string;
    startDate: string;
  };
  mode?: 'create' | 'edit';
}

const RoutineForm: React.FC<RoutineFormProps> = ({ 
  onSubmit, 
  loading, 
  error, 
  initialData,
  mode = 'create' 
}) => {
  const [name, setName] = useState(initialData?.name || '');
  const [startDate, setStartDate] = useState(initialData?.startDate || new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, startDate });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {mode === 'create' ? 'Create New Routine' : 'Edit Routine'}
        </h2>
      </div>

      <Input
        label="Routine Name"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        placeholder="e.g., Morning Routine, Evening Routine"
        required
      />

      <Input
        label="Start Date"
        type="date"
        value={startDate}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)}
        required
      />

      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
          {error}
        </div>
      )}

      <div className="flex space-x-4">
        <Button 
          type="submit" 
          variant="primary" 
          disabled={loading}
          className="flex-1"
        >
          {loading ? 'Saving...' : mode === 'create' ? 'Create Routine' : 'Update Routine'}
        </Button>
      </div>
    </form>
  );
};

export default RoutineForm; 