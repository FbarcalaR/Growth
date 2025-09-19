import { ChangeEventHandler, FocusEventHandler, MouseEventHandler } from "react";

type IProps = {
    name: string;
    className?: string;
    defaultValue?: string;
    type?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onClick?: MouseEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
};

export default function FormInvisibleInput({ name, className, defaultValue, type, onChange, onClick, onBlur }: IProps) {
    return (
        <input
            name={name}
            className={`bg-transparent ${className}`}
            type={type}
            defaultValue={defaultValue}
            onChange={onChange}
            onClick={onClick}
            onBlur={onBlur}
        />
    );
}