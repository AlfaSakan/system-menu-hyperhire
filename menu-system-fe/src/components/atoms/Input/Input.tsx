import { cn } from "@/utils/helper.util";

type Props = React.ComponentProps<"input"> & {
  label: string;
};

export default function InputText({ label, className, ...props }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-blue-gray-600" htmlFor={props.id}>
        {label}
      </label>
      <input
        type="text"
        placeholder="Menu ID"
        className={cn(
          "bg-blue-gray-50 rounded-2xl px-4 h-[52px] disabled:bg-blue-gray-200 w-full md:w-[262px]",
          className
        )}
        {...props}
      />
    </div>
  );
}
