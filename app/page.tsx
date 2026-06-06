import { getServerSession } from "next-auth";
import { CollegeCard } from "@/components/college/college-card";
import { CollegeFilters } from "@/components/college/college-filters";
import { EmptyState } from "@/components/ui/empty-state";
import { Pagination } from "@/components/ui/pagination";
import { authOptions } from "@/lib/auth";
import { getCollegeSearch, getLocations } from "@/lib/services/college-service";

export const dynamic = "force-dynamic";

export default async function HomePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const session = await getServerSession(authOptions);
  const [data, locations] = await Promise.all([
    getCollegeSearch(params, session?.user.id),
    getLocations()
  ]);

  return (
    <div className="grid gap-6">
      <section className="rounded-md border border-border bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase text-primary">College Discovery Platform</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal sm:text-4xl">Find the right college across India</h1>
        <p className="mt-3 max-w-3xl text-slate-600">Search, filter, save, and compare colleges using fees, placements, ratings, courses, and location data.</p>
      </section>
      <CollegeFilters locations={locations} />
      {data.items.length ? (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600">{data.total} colleges found</p>
          </div>
          <div className="grid gap-4">
            {data.items.map((college) => <CollegeCard key={college.id} college={college} />)}
          </div>
          <Pagination page={data.page} totalPages={data.totalPages} searchParams={params} />
        </>
      ) : (
        <EmptyState title="No colleges found" description="Try widening your search, removing fee limits, or choosing a different location." />
      )}
    </div>
  );
}
