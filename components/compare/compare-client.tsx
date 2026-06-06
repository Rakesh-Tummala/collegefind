"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { College, Course } from "@prisma/client";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Table } from "@/components/ui/table";
import { formatCurrency, formatLakhs } from "@/lib/format";

type CompareCollege = College & { courses: Course[] };

export function CompareClient({ colleges }: { colleges: CompareCollege[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ids = (searchParams.get("ids") ?? "").split(",").filter(Boolean).slice(0, 3);

  function remove(id: string) {
    const next = ids.filter((value) => value !== id);
    window.localStorage.setItem("compareIds", JSON.stringify(next));
    router.push(next.length ? `/compare?ids=${next.join(",")}` : "/compare");
  }

  if (!colleges.length) {
    return <EmptyState title="No colleges selected" description="Use Compare from college cards to add up to three colleges." />;
  }

  return (
    <div className="grid gap-4">
      <Table>
        <thead className="bg-slate-50">
          <tr>
            <th className="p-3 text-xs uppercase text-slate-500">Metric</th>
            {colleges.map((college) => (
              <th key={college.id} className="p-3">
                <div className="flex items-start justify-between gap-3">
                  <span>{college.name}</span>
                  <button aria-label={`Remove ${college.name}`} onClick={() => remove(college.id)} className="rounded-md p-1 hover:bg-slate-100"><X className="h-4 w-4" /></button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <Row label="Location" values={colleges.map((college) => college.location)} />
          <Row label="Fees" values={colleges.map((college) => `${formatCurrency(college.feesMin)} - ${formatCurrency(college.feesMax)}`)} />
          <Row label="Rating" values={colleges.map((college) => `${college.rating.toFixed(1)} / 5`)} />
          <Row label="Placement rate" values={colleges.map((college) => `${college.placementRate}%`)} />
          <Row label="Average package" values={colleges.map((college) => formatLakhs(college.avgPackage))} />
          <Row label="Highest package" values={colleges.map((college) => formatLakhs(college.highestPackage))} />
          <Row label="Top courses" values={colleges.map((college) => college.courses.map((course) => course.name).join(", "))} />
        </tbody>
      </Table>
      <Button asChild href="/" variant="secondary">Add more colleges</Button>
    </div>
  );
}

function Row({ label, values }: { label: string; values: string[] }) {
  return (
    <tr className="border-t border-border">
      <td className="p-3 font-semibold">{label}</td>
      {values.map((value, index) => <td key={`${label}-${index}`} className="p-3 text-slate-700">{value}</td>)}
    </tr>
  );
}
