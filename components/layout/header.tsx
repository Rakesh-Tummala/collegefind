"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Bookmark, GitCompare, LogOut, Search, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-white"><Search className="h-5 w-5" /></span>
          <span>CollegeFind</span>
        </Link>
        <nav className="flex items-center gap-2">
          <Button asChild href="/compare" variant="ghost" className="px-2 sm:px-3"><GitCompare className="h-4 w-4" /><span className="hidden sm:inline">Compare</span></Button>
          {session?.user ? (
            <>
              <Button asChild href="/saved" variant="ghost" className="px-2 sm:px-3"><Bookmark className="h-4 w-4" /><span className="hidden sm:inline">Saved</span></Button>
              <Button variant="secondary" className="px-2 sm:px-3" onClick={() => signOut({ callbackUrl: "/" })}><LogOut className="h-4 w-4" /><span className="hidden sm:inline">Logout</span></Button>
            </>
          ) : status !== "loading" ? (
            <Button asChild href="/login" variant="secondary"><UserRound className="h-4 w-4" />Login</Button>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
