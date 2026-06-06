import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Pagination({ page, totalPages, searchParams }: { page: number; totalPages: number; searchParams: Record<string, string | string[] | undefined> }) {
  const hrefFor = (nextPage: number) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(searchParams)) {
      if (value) params.set(key, Array.isArray(value) ? value[0] : value);
    }
    params.set("page", String(nextPage));
    return `/?${params.toString()}`;
  };

  return (
    <nav className="flex items-center justify-between gap-3">
      <Button asChild href={hrefFor(Math.max(1, page - 1))} variant="secondary" className={page <= 1 ? "pointer-events-none opacity-50" : ""}>Previous</Button>
      <span className="text-sm text-slate-600">Page {page} of {totalPages}</span>
      <Link href={hrefFor(Math.min(totalPages, page + 1))} className={page >= totalPages ? "pointer-events-none opacity-50" : ""}>
        <Button variant="secondary">Next</Button>
      </Link>
    </nav>
  );
}
