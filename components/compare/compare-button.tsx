"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { GitCompare } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CompareButton({ collegeId }: { collegeId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function compare() {
    const fromUrl = (searchParams.get("ids") ?? "").split(",").filter(Boolean);
    const fromStorage = JSON.parse(window.localStorage.getItem("compareIds") ?? "[]") as string[];
    const ids = Array.from(new Set([...fromUrl, ...fromStorage, collegeId])).slice(0, 3);
    window.localStorage.setItem("compareIds", JSON.stringify(ids));
    router.push(`/compare?ids=${ids.join(",")}`);
  }

  return (
    <Button type="button" variant="secondary" className="px-3" onClick={compare} aria-label="Compare college">
      <GitCompare className="h-4 w-4" />
    </Button>
  );
}
