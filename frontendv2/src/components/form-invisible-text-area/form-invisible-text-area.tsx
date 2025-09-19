import { ChangeEventHandler, FocusEventHandler, MouseEventHandler, useEffect, useRef } from "react";

type IProps = {
    name: string;
    withAutoHeight?: boolean;
    className?: string;
    defaultValue?: string;
    onChange?: ChangeEventHandler<HTMLTextAreaElement>;
    onClick?: MouseEventHandler<HTMLTextAreaElement>;
    onBlur?: FocusEventHandler<HTMLTextAreaElement>;
};

export default function FormInvisibleTextArea({ name, withAutoHeight = false, className, defaultValue, onChange, onClick, onBlur }: IProps) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const autoHeight = () => {
        if (!withAutoHeight) return;

        const element = textAreaRef.current;
        if(!element) return;

        element.style.height = "5px";
        element.style.height = (element.scrollHeight) + "px";
      };

      useEffect(() => autoHeight(), []);

    return (
        <textarea
            ref={textAreaRef}
            name={name}
            className={`bg-transparent ${className}`}
            defaultValue={defaultValue}
            onChange={onChange}
            onClick={onClick}
            onInput={autoHeight}
            onBlur={onBlur}
        />
    );
}