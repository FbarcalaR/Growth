import { MouseEventHandler } from "react";

type IProps = {
  className?: string | undefined;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
};

export default function DropdownArrow({ className, onClick }: IProps) {
  return (
    <div
      onClick={onClick}
      className={`${className} h-full w-fit flex items-center absolute top-0 right-1 mt-auto mb-auto`}>
        <div className="border-r-2 border-b-2 border-main-color rotate-45 h-2 w-2 rounded-sm"/>
    </div>
  );
}
