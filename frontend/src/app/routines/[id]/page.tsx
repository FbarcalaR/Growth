'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useUser } from '../../../lib/hooks';
import { useGetRoutineByIdQuery, useUpdateRoutineMutation, useDeleteRoutineMutation } from '../../../lib/features/routines/routinesApi';
import { useCreateRoutineTaskMutation } from '../../../lib/features/routineTasks/routineTasksApi';
import { Header } from '../../../components/organisms';
import { RoutineForm, RoutineHeader, RoutineStats } from '../../../components/molecules';
import { TasksSection } from '../../../components/organisms';
import { BackButton, ErrorState, Loader } from '../../../components/atoms';
import Card from '../../../components/atoms/Card/Card';

export default function RoutineDetailPage() {
  const router = useRouter();
  const params = useParams();
  const routineId = parseInt(params.id as string);
  const { isAuthenticated } = useUser();
  const [showEditForm, setShowEditForm] = useState(false);

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Fetch routine data (includes tasks)
  const { data: routine, isLoading: routineLoading, error: routineError } = useGetRoutineByIdQuery(routineId);

  // Mutations
  const [updateRoutine, { isLoading: updateLoading }] = useUpdateRoutineMutation();
  const [deleteRoutine, { isLoading: deleteLoading }] = useDeleteRoutineMutation();
  const [createTask, { isLoading: createTaskLoading }] = useCreateRoutineTaskMutation();

  const handleUpdateRoutine = async (data: { name: string; startDate: string }) => {
    try {
      await updateRoutine({ id: routineId, data }).unwrap();
      setShowEditForm(false);
    } catch (error) {
      console.error('Failed to update routine:', error);
    }
  };

  const handleDeleteRoutine = async () => {
    if (window.confirm('Are you sure you want to delete this routine? This action cannot be undone.')) {
      try {
        await deleteRoutine(routineId).unwrap();
        router.push('/dashboard');
      } catch (error) {
        console.error('Failed to delete routine:', error);
      }
    }
  };

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
      // Convert time strings to proper DateTimeOffset format
      const today = new Date();
      const fromTimeParts = data.taskSchedule.fromTime.split(':');
      const toTimeParts = data.taskSchedule.toTime.split(':');
      
      const fromDateTime = new Date(today);
      fromDateTime.setHours(parseInt(fromTimeParts[0]), parseInt(fromTimeParts[1]), 0, 0);
      
      const toDateTime = new Date(today);
      toDateTime.setHours(parseInt(toTimeParts[0]), parseInt(toTimeParts[1]), 0, 0);
      
      const taskData = {
        routineId: data.routineId,
        name: data.name,
        notes: data.notes || '',
        taskSchedule: {
          fromTime: fromDateTime.toISOString(),
          toTime: toDateTime.toISOString(),
        },
        repetitionType: 0, // Default to Daily
        goalTargets: []
      };
      
      await createTask(taskData).unwrap();
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleEditTask = (task: any) => {
    console.log('Edit task:', task);
    // TODO: Implement task editing
  };

  const handleDeleteTask = (taskId: number) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      console.log('Delete task:', taskId);
      // TODO: Implement task deletion
    }
  };

  const handleCompleteTask = (taskId: number) => {
    console.log('Complete task:', taskId);
    // TODO: Implement task completion
  };

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  if (routineLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Loader message="Loading routine..." className="flex justify-center items-center py-8" />
        </main>
      </div>
    );
  }

  if (routineError || !routine) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorState message="Failed to load routine" />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackButton />

        <RoutineHeader
          routine={routine}
          showEditForm={showEditForm}
          updateLoading={updateLoading}
          deleteLoading={deleteLoading}
          onToggleEdit={() => setShowEditForm(!showEditForm)}
          onDelete={handleDeleteRoutine}
        />

        {showEditForm && (
          <Card className="mb-8 p-6">
            <RoutineForm
              mode="edit"
              initialData={{
                name: routine.name,
                startDate: routine.startDate.split('T')[0],
              }}
              onSubmit={handleUpdateRoutine}
              loading={updateLoading}
            />
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TasksSection
              tasks={routine.tasks || []}
              isLoading={false} // Tasks are loaded with routine
              error={undefined}
              routineId={routineId}
              createTaskLoading={createTaskLoading}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onCompleteTask={handleCompleteTask}
              onCreateTask={handleCreateTask}
            />
          </div>

          <div className="lg:col-span-1">
            <RoutineStats
              totalTasks={routine.tasks?.length || 0}
              completedToday={0} // TODO: Calculate from backend
              daysActive={routine.totalDays}
            />
          </div>
        </div>
      </main>
    </div>
  );
} 