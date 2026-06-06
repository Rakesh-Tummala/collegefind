import { SearchX } from "lucide-react";

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center rounded-md border border-dashed border-border bg-white p-8 text-center">
      <SearchX className="mb-3 h-10 w-10 text-slate-400" aria-hidden />
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-1 max-w-md text-sm text-slate-600">{description}</p>
    </div>
  );
}
