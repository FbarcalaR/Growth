import { MouseEventHandler } from "react";

type IProps = {
  active?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  children: React.ReactNode;
};

export default function MenuButton({ children, onClick, active = false }: IProps) {
  return (
    <button
      className={`w-9 h-9 ${active && "[&>*]:text-main-color"}`}
      onClick={(e) => onClick && onClick(e)}
    >
      {children}
    </button>
  );
}
