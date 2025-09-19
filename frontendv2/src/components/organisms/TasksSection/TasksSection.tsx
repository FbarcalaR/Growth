import React, { useState } from 'react';
import Card from '../../atoms/Card/Card';
import Button from '../../atoms/Button/Button';
import TaskList from '../TaskList/TaskList';
import { TaskForm } from '../../molecules';
import { RoutineTask } from '../../../api/features/routines/types/routines';

interface TasksSectionProps {
  tasks: RoutineTask[];
  isLoading: boolean;
  error?: string;
  routineId: number;
  createTaskLoading: boolean;
  onEditTask: (task: RoutineTask) => void;
  onDeleteTask: (taskId: number) => void;
  onCompleteTask: (taskId: number) => void;
  onCreateTask: (data: { 
    name: string; 
    notes?: string; 
    routineId: number;
    taskSchedule: {
      fromTime: string;
      toTime: string;
    };
  }) => void;
}

const TasksSection: React.FC<TasksSectionProps> = ({
  tasks,
  isLoading,
  error,
  routineId,
  createTaskLoading,
  onEditTask,
  onDeleteTask,
  onCompleteTask,
  onCreateTask,
}) => {
  const [showAddTask, setShowAddTask] = useState(false);

  const handleCreateTask = async (data: { 
    name: string; 
    notes?: string; 
    routineId: number;
    taskSchedule: {
      fromTime: string;
      toTime: string;
    };
  }) => {
    try {
      await onCreateTask(data);
      setShowAddTask(false);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Tasks</h2>
        <Button 
          variant="primary" 
          onClick={() => setShowAddTask(!showAddTask)}
          disabled={createTaskLoading}
        >
          {showAddTask ? 'Cancel' : 'Add Task'}
        </Button>
      </div>

      {/* Add Task Form */}
      {showAddTask && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <TaskForm
            routineId={routineId}
            onSubmit={handleCreateTask}
            loading={createTaskLoading}
          />
        </div>
      )}

      {/* Tasks List */}
      <TaskList
        tasks={tasks}
        isLoading={isLoading}
        error={error}
        onEditTask={onEditTask}
        onDeleteTask={onDeleteTask}
        onCompleteTask={onCompleteTask}
      />
    </Card>
  );
};

export default TasksSection; 