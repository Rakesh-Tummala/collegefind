import { CompareClient } from "@/components/compare/compare-client";
import { getCompareColleges } from "@/lib/services/college-service";

export const dynamic = "force-dynamic";

export default async function ComparePage({ searchParams }: { searchParams: Promise<{ ids?: string }> }) {
  const { ids = "" } = await searchParams;
  const selectedIds = ids.split(",").filter(Boolean).slice(0, 3);
  const colleges = selectedIds.length ? await getCompareColleges(selectedIds) : [];

  return (
    <div className="grid gap-6">
      <section>
        <h1 className="text-3xl font-semibold">Compare colleges</h1>
        <p className="mt-2 text-slate-600">Compare up to three colleges by fees, ratings, placements, and location.</p>
      </section>
      <CompareClient colleges={colleges} />
    </div>
  );
}
