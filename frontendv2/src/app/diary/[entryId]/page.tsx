'use client';

import { IDiaryEntry } from '@/api/diary/types/diaryEntry';
import FormInvisibleInput from '@/components/form-invisible-input/form-invisible-input';
import Title from '@/components/title/title';
import { FormEvent, useEffect, useState } from 'react';
import { getDiaryEntry, saveDiaryEntry } from "@/api/diary/handler";
import { useParams } from 'next/navigation'
import FormInvisibleTextArea from '@/components/form-invisible-text-area/form-invisible-text-area';

export default function DiaryEntry() {
  const { entryId } = useParams<{ entryId: string }>()
    const [diaryEntry, setDiaryEntry] = useState<IDiaryEntry>();

    useEffect(() => {
        getDiaryEntry(entryId).then((entry) => {
            setDiaryEntry(entry as IDiaryEntry);
      });
    }, [entryId]);

    const handleForm = (ev: FormEvent<HTMLFormElement>) => {
      const rawFormData = new FormData(ev.currentTarget);
      const formData = Object.fromEntries(rawFormData);

      saveDiaryEntry({ id: diaryEntry?.id, ...formData });
    };

    return (
      <>
        {diaryEntry &&
          <form className='w-full flex flex-col items-center gap-4' onChange={(ev) => handleForm(ev)}>
              <Title className='w-full' titleTemplate={
                <FormInvisibleInput type='text' defaultValue={diaryEntry?.title} name='title'/>
              } />
                <FormInvisibleTextArea
                    name="body"
                    withAutoHeight={true}
                    className="w-full"
                    defaultValue={diaryEntry.body ?? ''}
                />
          </form>
        }
        {!diaryEntry && <span>Loading...</span>}
      </>
    );
}
