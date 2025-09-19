type IProps = {
  label: string;
  defaultValue?: string;
  onChange: (value: string) => void;
};

export default function FormInput({ label, onChange, defaultValue }: IProps) {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldValue = e.target.value;
    onChange(fieldValue);
  };

  return (
    <div className="flex justify-between w-full">
      <label className="w-1/3">{label}</label>
      <input
        defaultValue={defaultValue}
        className="w-1/3 text-white bg-transparent border-b-main-color border-b-2"
        name={label}
        onChange={(event) => handleInput(event)}
      />
    </div>
  );
}
