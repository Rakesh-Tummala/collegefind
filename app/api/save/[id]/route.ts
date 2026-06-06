import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { removeSavedCollege } from "@/lib/repositories/user-repository";
import type { ApiResponse } from "@/lib/types/api";

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
      return NextResponse.json<ApiResponse<never>>({ ok: false, error: "Authentication required" }, { status: 401 });
    }
    const { id } = await params;
    await removeSavedCollege(session.user.id, id);
    return NextResponse.json<ApiResponse<{ id: string }>>({ ok: true, data: { id }, message: "College removed" });
  } catch {
    return NextResponse.json<ApiResponse<never>>({ ok: false, error: "Unable to remove saved college" }, { status: 500 });
  }
}
