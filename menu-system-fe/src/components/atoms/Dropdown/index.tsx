import { MouseEvent } from "react";
import { IconChevronDown } from "../icon";

export type Option = { value: string; label: string };

type Props = {
  options?: Option[];
  selected?: string;
  label: string;
  placeholder: string;
  onSelect?: (opt: Option) => void;
};

export default function Dropdown({
  options = [],
  selected,
  label,
  placeholder,
  onSelect,
}: Props) {
  const handleSelect = (opt: Option) => (e: MouseEvent<HTMLInputElement>) => {
    if (onSelect) onSelect(opt);
    e.currentTarget.blur();
  };

  return (
    <button type="button" className="text-left relative group">
      <p className="text-sm text-blue-gray-600 mb-2">{label}</p>
      <div className="bg-blue-gray-50 w-[350px] rounded-2xl text-base py-[14px] px-4 flex items-center justify-between">
        <p>{selected || placeholder}</p>
        <div className="group-focus:rotate-180">
          <IconChevronDown />
        </div>
      </div>
      <div className="group-focus:flex group-focus-within:flex flex-col absolute hidden bg-blue-gray-50 w-full rounded-2xl mt-2 z-10 overflow-hidden">
        {options.map((opt) => (
          <input
            key={opt.value}
            type="button"
            className="text-left h-12 px-4 py-[14px] hover:bg-blue-gray-300"
            value={opt.label}
            onClick={handleSelect(opt)}
          />
        ))}
      </div>
    </button>
  );
}
