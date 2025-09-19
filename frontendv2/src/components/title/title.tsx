import { MouseEventHandler } from "react";

type IProps = {
  title?: string;
  titleTemplate?: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  titleClassName?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

export default function Title({ title, titleTemplate, children, icon, className, titleClassName, onClick }: IProps) {
  return (
    <div className={className}>
      <div
        onClick={(e) => onClick && onClick(e)}
        className={`w-full border-b-2 border-main-color relative text-base ${titleClassName}`}
      >
        <span className="w-full font-bold">{title ?? titleTemplate}</span>
        {icon}
      </div>
        {children}
    </div>
  );
}
