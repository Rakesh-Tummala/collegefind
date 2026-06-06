import { clsx } from "clsx";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function Input({ label, className, id, ...props }: InputProps) {
  return (
    <label className="grid gap-1.5 text-sm font-medium text-slate-700" htmlFor={id}>
      {label}
      <input
        id={id}
        className={clsx("h-10 rounded-md border border-border bg-white px-3 text-sm outline-none ring-primary/20 transition focus:ring-4", className)}
        {...props}
      />
    </label>
  );
}
