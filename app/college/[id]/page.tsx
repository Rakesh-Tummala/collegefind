import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { BarChart3, BriefcaseBusiness, IndianRupee, MapPin, Star } from "lucide-react";
import { SaveButton } from "@/components/college/save-button";
import { Badge } from "@/components/ui/badge";
import { Table } from "@/components/ui/table";
import { authOptions } from "@/lib/auth";
import { formatCurrency, formatLakhs } from "@/lib/format";
import { getCollegeDetail } from "@/lib/services/college-service";

export const dynamic = "force-dynamic";

export default async function CollegeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const college = await getCollegeDetail(id, session?.user.id);
  if (!college) notFound();

  return (
    <div className="grid gap-6">
      <section className="rounded-md border border-border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-3 flex flex-wrap gap-2"><Badge>{college.type}</Badge><Badge className="bg-teal-100 text-teal-800">Est. {college.established}</Badge></div>
            <h1 className="text-3xl font-semibold">{college.name}</h1>
            <p className="mt-2 flex items-center gap-1 text-slate-600"><MapPin className="h-4 w-4" />{college.location}</p>
          </div>
          <SaveButton collegeId={college.id} initialSaved={Boolean(college.savedBy?.length)} />
        </div>
        <p className="mt-5 max-w-4xl text-slate-700">{college.overview}</p>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <Stat icon={<Star className="h-5 w-5" />} label="Rating" value={`${college.rating.toFixed(1)} / 5`} />
        <Stat icon={<IndianRupee className="h-5 w-5" />} label="Fees" value={`${formatCurrency(college.feesMin)} - ${formatCurrency(college.feesMax)}`} />
        <Stat icon={<BriefcaseBusiness className="h-5 w-5" />} label="Placement rate" value={`${college.placementRate}%`} />
        <Stat icon={<BarChart3 className="h-5 w-5" />} label="Highest package" value={formatLakhs(college.highestPackage)} />
      </section>

      <section className="grid gap-3">
        <h2 className="text-xl font-semibold">Courses</h2>
        <Table>
          <thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="p-3">Course</th><th className="p-3">Degree</th><th className="p-3">Duration</th><th className="p-3">Fees</th><th className="p-3">Seats</th></tr></thead>
          <tbody>{college.courses.map((course) => <tr key={course.id} className="border-t border-border"><td className="p-3 font-medium">{course.name}</td><td className="p-3">{course.degree}</td><td className="p-3">{course.duration}</td><td className="p-3">{formatCurrency(course.fees)}</td><td className="p-3">{course.seats}</td></tr>)}</tbody>
        </Table>
      </section>

      <section className="grid gap-3">
        <h2 className="text-xl font-semibold">Reviews</h2>
        <div className="grid gap-3">
          {college.reviews.map((review) => (
            <article key={review.id} className="rounded-md border border-border bg-white p-4">
              <div className="flex items-center justify-between gap-3"><h3 className="font-semibold">{review.title}</h3><span className="text-sm font-semibold text-amber-700">{review.rating}/5</span></div>
              <p className="mt-2 text-sm text-slate-600">{review.body}</p>
              <p className="mt-3 text-xs text-slate-500">By {review.user.name}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="rounded-md border border-border bg-white p-4 shadow-sm"><p className="flex items-center gap-2 text-sm text-slate-500">{icon}{label}</p><p className="mt-2 text-lg font-semibold">{value}</p></div>;
}
