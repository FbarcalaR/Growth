"use client";
import { useCreateRoutineMutation, useDeleteRoutineMutation, useGetRoutinesQuery } from "@/api/routines/routinesApi";
import { Routine } from "@/api/routines/types/routines";
import MainButton from "@/components/main-button/main-button";
import Title from "@/components/title/title";
import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";

export default function Routines() {
  const router = useRouter();
  const [routines, setRoutines] = useState([] as Routine[]);

  const [deleteRoutine, { isLoading: isLoadingDelete }] = useDeleteRoutineMutation();
  const [createRoutine, { isLoading: isLoadingCreation }] = useCreateRoutineMutation();
  const { data: routinesResponse, isLoading: isLoadingRoutines, error } = useGetRoutinesQuery();

  const handleRemoveRoutine = (event: MouseEvent, routineId:  number) => {
    event.stopPropagation();
    
    deleteRoutine(routineId);
  };

  const handleNewRoutine = () => {
    createRoutine({ name: 'new routine', startDate: new Date('2025-01-01').toISOString() });
  };

  useEffect(() => {
    if (isLoadingRoutines)
        return;

    if (error) {
      console.error('Error fetching routines:', error);
      return;
    }
    setRoutines(routinesResponse?.routines || []);
  }, [routinesResponse, isLoadingRoutines, error]);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {routines && routines.map((routine) => (
        <div key={routine.id} className="w-full flex flex-col gap-4">
          <Title
            className="cursor-pointer"
            title={routine.name}
            icon={
              <BiTrash
                onClick={(e) => handleRemoveRoutine(e, routine.id)}
                className="absolute top-0 right-1 mt-auto mb-auto cursor-pointer"
              />
            }
            onClick={() => router.push(`/routines/${routine.id}/routine-tasks`)
        }
          />
        </div>
      ))}

      <div className="pt-4 w-1/3 min-w-min">
        <MainButton onClick={() => handleNewRoutine()}>
          <span className="text-nowrap">Add new routine</span>
        </MainButton>
      </div>
    </div>
  );
}
