import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { ZodError } from "zod";
import { authOptions } from "@/lib/auth";
import { getCollegeSearch } from "@/lib/services/college-service";
import type { ApiResponse } from "@/lib/types/api";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const searchParams = Object.fromEntries(request.nextUrl.searchParams.entries());
    const data = await getCollegeSearch(searchParams, session?.user.id);
    return NextResponse.json<ApiResponse<typeof data>>({ ok: true, data });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json<ApiResponse<never>>({ ok: false, error: "Invalid filters", issues: error.flatten().fieldErrors }, { status: 400 });
    }
    return NextResponse.json<ApiResponse<never>>({ ok: false, error: "Unable to load colleges" }, { status: 500 });
  }
}
