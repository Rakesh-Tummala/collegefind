import type { College, Course, SavedCollege } from "@prisma/client";
import Link from "next/link";
import { BarChart3, IndianRupee, MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CompareButton } from "@/components/compare/compare-button";
import { SaveButton } from "@/components/college/save-button";
import { formatCurrency, formatLakhs } from "@/lib/format";

type CollegeCardProps = {
  college: College & { courses: Course[]; savedBy?: Pick<SavedCollege, "id">[] };
};

export function CollegeCard({ college }: CollegeCardProps) {
  return (
    <article className="rounded-md border border-border bg-white p-5 shadow-sm transition hover:shadow-soft">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge>{college.type}</Badge>
            <span className="text-xs font-medium text-slate-500">Est. {college.established}</span>
          </div>
          <Link href={`/college/${college.id}`} className="text-lg font-semibold hover:text-primary">{college.name}</Link>
          <p className="mt-1 flex items-center gap-1 text-sm text-slate-600"><MapPin className="h-4 w-4" />{college.location}</p>
        </div>
        <div className="flex gap-2">
          <SaveButton collegeId={college.id} initialSaved={Boolean(college.savedBy?.length)} />
          <CompareButton collegeId={college.id} />
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <Metric icon={<Star className="h-4 w-4" />} label="Rating" value={`${college.rating.toFixed(1)} / 5`} />
        <Metric icon={<IndianRupee className="h-4 w-4" />} label="Fees" value={`${formatCurrency(college.feesMin)} - ${formatCurrency(college.feesMax)}`} />
        <Metric icon={<BarChart3 className="h-4 w-4" />} label="Avg package" value={formatLakhs(college.avgPackage)} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {college.courses.map((course) => <span key={course.id} className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-700">{course.degree} {course.name}</span>)}
      </div>
    </article>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="rounded-md bg-slate-50 p-3"><p className="flex items-center gap-1 text-xs font-medium uppercase text-slate-500">{icon}{label}</p><p className="mt-1 text-sm font-semibold">{value}</p></div>;
}
