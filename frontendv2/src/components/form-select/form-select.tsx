import DropdownArrow from "../dropdown-arrow/dropdown-arrow";

export type Option = {
  label: string;
  value: string | number;
}

type IProps = {
  label: string;
  options: Option[];
  defaultValue: string;
  onChange: (value: string) => void;
};

export function FormSelect({ label, onChange, options, defaultValue }: IProps) {
  const handleInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const fieldValue = e.target.value;
    onChange(fieldValue);
  };

  return (
    <div className="flex justify-between w-full">
      <label className="w-1/3">{label}</label>
      <div className="w-1/3 relative">
        <select
          className="w-full text-white appearance-none bg-transparent border-b-main-color border-b-2 cursor-pointer"
          name={label}
          onChange={(event) => handleInput(event)}
          defaultValue={defaultValue}
        >
          {options && options.map(option => 
            <option className="bg-black cursor-pointer" value={option.value} key={option.value}>{option.label}</option>
          )};
        </select>
        <DropdownArrow />
      </div>
    </div>
  );
}
