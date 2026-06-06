"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export function CollegeFilters({ locations }: { locations: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const params = new URLSearchParams();
    for (const key of ["q", "location", "minFee", "maxFee", "sort"]) {
      const value = String(form.get(key) ?? "").trim();
      if (value) params.set(key, value);
    }
    params.set("page", "1");
    router.push(`/?${params.toString()}`);
  }

  return (
    <form onSubmit={submit} className="grid gap-3 rounded-md border border-border bg-white p-4 shadow-sm md:grid-cols-6">
      <Input id="q" name="q" label="College name" placeholder="Search colleges" defaultValue={searchParams.get("q") ?? ""} className="md:col-span-2" />
      <Select id="location" name="location" label="Location" defaultValue={searchParams.get("location") ?? ""} options={[{ label: "All India", value: "" }, ...locations.map((state) => ({ label: state, value: state }))]} />
      <Input id="minFee" name="minFee" label="Min fees" type="number" min={0} placeholder="0" defaultValue={searchParams.get("minFee") ?? ""} />
      <Input id="maxFee" name="maxFee" label="Max fees" type="number" min={0} placeholder="500000" defaultValue={searchParams.get("maxFee") ?? ""} />
      <Select id="sort" name="sort" label="Sort" defaultValue={searchParams.get("sort") ?? "rating"} options={[
        { label: "Rating", value: "rating" },
        { label: "Fees low to high", value: "feesAsc" },
        { label: "Fees high to low", value: "feesDesc" },
        { label: "Placements", value: "placement" }
      ]} />
      <Button type="submit" className="md:col-span-6"><Search className="h-4 w-4" />Search</Button>
    </form>
  );
}
