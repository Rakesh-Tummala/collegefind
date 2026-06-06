import { clsx } from "clsx";

export function Table({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx("overflow-x-auto rounded-md border border-border bg-white", className)}><table className="w-full min-w-[720px] text-left text-sm">{children}</table></div>;
}
