import React, { useState } from 'react';
import Button from '../../atoms/Button/Button';
import Input from '../../atoms/Input/Input';

interface TaskFormProps {
  onSubmit: (data: { 
    name: string; 
    notes?: string; 
    routineId: number;
    taskSchedule: {
      fromTime: string;
      toTime: string;
    };
  }) => void;
  routineId: number;
  loading?: boolean;
  error?: string;
  initialData?: {
    name: string;
    notes?: string;
    taskSchedule?: {
      fromTime: string;
      toTime: string;
    };
  };
  mode?: 'create' | 'edit';
}

const TaskForm: React.FC<TaskFormProps> = ({ 
  onSubmit, 
  routineId,
  loading, 
  error, 
  initialData,
  mode = 'create' 
}) => {
  const [name, setName] = useState(initialData?.name || '');
  const [notes, setNotes] = useState(initialData?.notes || '');
  
  // Set default times to current time and 30 minutes later
  const now = new Date();
  const defaultFromTime = now.toTimeString().slice(0, 5); // HH:MM format
  const defaultToTime = new Date(now.getTime() + 30 * 60 * 1000).toTimeString().slice(0, 5); // 30 minutes later
  
  const [fromTime, setFromTime] = useState(initialData?.taskSchedule?.fromTime || defaultFromTime);
  const [toTime, setToTime] = useState(initialData?.taskSchedule?.toTime || defaultToTime);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ensure we have valid times
    const taskSchedule = {
      fromTime: fromTime || defaultFromTime,
      toTime: toTime || defaultToTime,
    };

    onSubmit({ 
      name, 
      notes: notes || undefined,
      routineId,
      taskSchedule
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {mode === 'create' ? 'Add New Task' : 'Edit Task'}
        </h3>
      </div>

      <Input
        label="Task Name"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        placeholder="e.g., Morning Exercise, Read 20 pages"
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Start Time
          </label>
          <input
            type="time"
            value={fromTime}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFromTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            End Time
          </label>
          <input
            type="time"
            value={toTime}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setToTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800 mb-2">
          Notes (Optional)
        </label>
        <textarea
          value={notes}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
          placeholder="Add any additional details about this task..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 text-gray-900"
          rows={3}
        />
      </div>

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
          {loading ? 'Saving...' : mode === 'create' ? 'Add Task' : 'Update Task'}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm; 