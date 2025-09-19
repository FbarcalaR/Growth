import React from 'react';

interface InputProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  className?: string;
  name?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  type = 'text',
  className = '',
  name,
}) => {
  return (
    <div className={className}>
      {label && <label className="text-sm font-medium text-gray-800">{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 text-gray-900"
      />
    </div>
  );
};

export default Input; 