import { clsx } from "clsx";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: { label: string; value: string }[];
};

export function Select({ label, options, className, id, ...props }: SelectProps) {
  return (
    <label className="grid gap-1.5 text-sm font-medium text-slate-700" htmlFor={id}>
      {label}
      <select id={id} className={clsx("h-10 rounded-md border border-border bg-white px-3 text-sm outline-none ring-primary/20 focus:ring-4", className)} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
}
