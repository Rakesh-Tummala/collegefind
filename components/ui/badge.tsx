import { clsx } from "clsx";

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={clsx("inline-flex items-center rounded-md bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-800", className)}>{children}</span>;
}
