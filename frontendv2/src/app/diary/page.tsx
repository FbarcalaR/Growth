"use client";
import { IDiaryEntry } from "@/api/diary/types/diaryEntry";
import { getAllDiaryEntries, removeDiaryEntry, saveDiaryEntry } from "@/api/diary/handler";
import Title from "@/components/title/title";
import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import MainButton from "@/components/main-button/main-button";

export default function Diary() {
  const router = useRouter();
  const [diaryEntries, setDiaryEntries] = useState<IDiaryEntry[]>([]);

  useEffect(() => {
    fetchDiaryEntries();
  }, []);

  const handleRemoveDiaryEntry = (event: MouseEvent, diaryEntryId: string) => {
    event.stopPropagation();
    
    removeDiaryEntry(diaryEntryId).then(() => fetchDiaryEntries());
  };

  const handleNewDiaryEntry = () => {
    const id = Math.max(0, ...diaryEntries?.map(r => +r.id));
    saveDiaryEntry({ id: (id+1).toString(), title: 'new diary entry' })
      .then(() => fetchDiaryEntries());
  };

  const fetchDiaryEntries = () => {
    getAllDiaryEntries().then(entries => {
        setDiaryEntries(entries as IDiaryEntry[]);
    });
  }

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {diaryEntries && diaryEntries.map((entry) => (
        <div key={entry.id} className="w-full flex flex-col gap-4">
          <Title
            className="cursor-pointer"
            title={entry.title}
            icon={
              <BiTrash
                onClick={(e) => handleRemoveDiaryEntry(e, entry.id)}
                className="absolute top-0 right-1 mt-auto mb-auto cursor-pointer"
              />
            }
            onClick={() => router.push(`/diary/${entry.id}`)}
          />
        </div>
      ))}
      
      <div className="pt-4 w-1/3 min-w-min">
        <MainButton onClick={() => handleNewDiaryEntry()}>
          <span className="text-nowrap">Add new entry</span>
        </MainButton>
      </div>
    </div>
  );
}
