'use client';
import { useGetRoutineByIdQuery, useUpdateRoutineMutation } from "@/api/routines/routinesApi";
import { Routine } from "@/api/routines/types/routines";
import FormInvisibleInput from "@/components/form-invisible-input/form-invisible-input";
import Title from "@/components/title/title";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function RoutineTasks() {
  const { routineId: routineId } = useParams<{ routineId: string }>()
  const [routine, setRoutine] = useState<Routine>();
  
    const { data: routineResponse, isLoading: isLoadingRoutine, error } = useGetRoutineByIdQuery(+routineId);
    const [updateRoutine] = useUpdateRoutineMutation();
  
  useEffect(() => {
    if (isLoadingRoutine)
        return;

    if (error) {
      console.error('Error fetching routine:', error);
      return;
    }
    setRoutine(routineResponse);
  }, [routineResponse, isLoadingRoutine, error]);

      const handleForm = (ev: FormEvent<HTMLFormElement>) => {
        const rawFormData = new FormData(ev.currentTarget);
        const formData = Object.fromEntries(rawFormData);
  
        updateRoutine({id: +routineId, data: formData})
      };
  
      return (
        <>
          {routine &&
            <form className='w-full flex flex-col items-center gap-4' onChange={(ev) => handleForm(ev)}>
                <Title className='w-full' titleTemplate={
                  <FormInvisibleInput type='text' defaultValue={routine?.name} name='name'/>
                } />
                
            </form>
          }
          {!routine && <span>Loading...</span>}
        </>
      );
}