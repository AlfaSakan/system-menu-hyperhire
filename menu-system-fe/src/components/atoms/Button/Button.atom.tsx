import { cn } from "@/utils/helper.util";

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}: {
  variant?: "primary" | "dark" | "outline";
} & React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      className={cn(
        "py-3 px-8 font-bold text-sm rounded-full",
        variant === "primary" && "bg-arctic-blue-600 text-white",
        variant === "dark" && "bg-blue-gray-800 text-white",
        variant === "outline" && "bg-white text-blue-gray-900 border",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
