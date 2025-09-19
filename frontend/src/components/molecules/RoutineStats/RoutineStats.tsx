import React from 'react';
import Card from '../../atoms/Card/Card';

interface RoutineStatsProps {
  totalTasks: number;
  completedToday: number;
  daysActive: number;
}

const RoutineStats: React.FC<RoutineStatsProps> = ({
  totalTasks,
  completedToday,
  daysActive,
}) => {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Routine Stats</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-800">Total Tasks</span>
          <span className="font-semibold text-gray-900">{totalTasks}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-800">Completed Today</span>
          <span className="font-semibold text-green-600">{completedToday}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-800">Days Active</span>
          <span className="font-semibold text-blue-600">{daysActive}</span>
        </div>
      </div>
    </Card>
  );
};

export default RoutineStats; 