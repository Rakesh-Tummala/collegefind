import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCollegeDetail } from "@/lib/services/college-service";
import type { ApiResponse } from "@/lib/types/api";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    const college = await getCollegeDetail(id, session?.user.id);
    if (!college) {
      return NextResponse.json<ApiResponse<never>>({ ok: false, error: "College not found" }, { status: 404 });
    }
    return NextResponse.json<ApiResponse<typeof college>>({ ok: true, data: college });
  } catch {
    return NextResponse.json<ApiResponse<never>>({ ok: false, error: "Unable to load college" }, { status: 500 });
  }
}
