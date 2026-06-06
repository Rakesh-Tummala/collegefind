"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function SaveButton({ collegeId, initialSaved }: { collegeId: string; initialSaved: boolean }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    if (!session?.user) {
      router.push("/login");
      return;
    }
    setLoading(true);
    const response = await fetch(saved ? `/api/save/${collegeId}` : "/api/save", {
      method: saved ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: saved ? undefined : JSON.stringify({ collegeId })
    });
    setLoading(false);
    if (response.ok) {
      setSaved((value) => !value);
      router.refresh();
    }
  }

  return (
    <Button type="button" variant={saved ? "secondary" : "primary"} onClick={toggle} disabled={loading}>
      {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
      {saved ? "Saved" : "Save"}
    </Button>
  );
}
