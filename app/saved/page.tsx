import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { CollegeCard } from "@/components/college/college-card";
import { EmptyState } from "@/components/ui/empty-state";
import { authOptions } from "@/lib/auth";
import { getSavedColleges } from "@/lib/repositories/user-repository";

export const dynamic = "force-dynamic";

export default async function SavedPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) redirect("/login");

  const saved = await getSavedColleges(session.user.id);

  return (
    <div className="grid gap-6">
      <section>
        <h1 className="text-3xl font-semibold">Saved colleges</h1>
        <p className="mt-2 text-slate-600">Your personal shortlist stays here across sessions.</p>
      </section>
      {saved.length ? (
        <div className="grid gap-4">{saved.map((item) => <CollegeCard key={item.id} college={item.college} />)}</div>
      ) : (
        <EmptyState title="No saved colleges yet" description="Save colleges from search results or detail pages to build your shortlist." />
      )}
    </div>
  );
}
