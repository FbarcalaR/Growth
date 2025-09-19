import { MouseEventHandler } from "react";

type IProps = {
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export default function MainButton({ children, onClick }: IProps) {
  return (
    <button
      className="w-full h-auto bg-main-color text-main-text p-3 size-4 font-bold leading-4 rounded-md"
      onClick={onClick}
      >
      {children}
    </button>
  );
}
