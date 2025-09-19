import React from 'react';
import { RoutineTask } from '../../../api/features/routines/types/routines';
import Button from '../../atoms/Button/Button';

interface TaskListProps {
  tasks: RoutineTask[];
  isLoading?: boolean;
  error?: string;
  onEditTask?: (task: RoutineTask) => void;
  onDeleteTask?: (taskId: number) => void;
  onCompleteTask?: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  isLoading = false,
  error,
  onEditTask,
  onDeleteTask,
  onCompleteTask,
}) => {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-800">Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-800 mb-4">No tasks yet</p>
        <p className="text-sm text-gray-700">Add your first task to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div 
          key={task.id}
          className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <h3 className="font-semibold text-gray-900">{task.name}</h3>
                {task.taskStreak && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {task.taskStreak.currentStreakDays} day streak
                  </span>
                )}
              </div>
              
              {task.notes && (
                <p className="text-sm text-gray-800 mt-1">{task.notes}</p>
              )}
              
              {task.taskSchedule && (
                <p className="text-xs text-gray-700 mt-2">
                  {new Date(task.taskSchedule.fromTime).toLocaleTimeString()} - {new Date(task.taskSchedule.toTime).toLocaleTimeString()}
                </p>
              )}
              
              {task.goals && task.goals.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs text-gray-700 font-medium">Goals:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {task.goals.map((goal, index) => (
                      <span key={index} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        {goal.target.name}: {goal.target.value}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex space-x-2 ml-4">
              {onCompleteTask && (
                <Button 
                  variant="primary" 
                  className="text-sm"
                  onClick={() => onCompleteTask(task.id)}
                >
                  Complete
                </Button>
              )}
              {onEditTask && (
                <Button 
                  variant="secondary" 
                  className="text-sm"
                  onClick={() => onEditTask(task)}
                >
                  Edit
                </Button>
              )}
              {onDeleteTask && (
                <Button 
                  variant="secondary" 
                  className="text-sm text-red-600 hover:text-red-700"
                  onClick={() => onDeleteTask(task.id)}
                >
                  Delete
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList; 