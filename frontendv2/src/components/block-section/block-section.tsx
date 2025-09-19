import { useState, MouseEvent } from "react";
import DropdownArrow from "../dropdown-arrow/dropdown-arrow";
import Title from "../title/title";
import { BiTrash } from "react-icons/bi";

type IProps = {
  title?: string;
  titleTemplate?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  onRemove?: (e: MouseEvent) => void;
};

export default function BlockSection({ title, titleTemplate, children, className, bodyClassName, onRemove }: IProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <Title
      className={className}
      titleClassName="cursor-pointer"
      title={title}
      titleTemplate={titleTemplate}
      onClick={() => setIsCollapsed(prev => !prev)}
      icon={
        <>
        {onRemove &&
          <BiTrash
            onClick={(e) => {onRemove(e)}}
            className="absolute top-0 right-5 mt-auto mb-auto cursor-pointer"
          />}
          <DropdownArrow
            className={`transition-all duration-300 ${
              !isCollapsed && "rotate-180"
            }`}
          />
        </>
      }
    >
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isCollapsed ? "h-0" : "h-full"
        } ${bodyClassName}`}
      >
      {children}
      </div>
    </Title>
  );
}
