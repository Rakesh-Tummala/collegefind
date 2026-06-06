import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { ZodError } from "zod";
import { authOptions } from "@/lib/auth";
import { saveCollege } from "@/lib/repositories/user-repository";
import type { ApiResponse } from "@/lib/types/api";
import { saveCollegeSchema } from "@/lib/validators/college";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
      return NextResponse.json<ApiResponse<never>>({ ok: false, error: "Authentication required" }, { status: 401 });
    }
    const body = saveCollegeSchema.parse(await request.json());
    const saved = await saveCollege(session.user.id, body.collegeId);
    return NextResponse.json<ApiResponse<typeof saved>>({ ok: true, data: saved, message: "College saved" });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json<ApiResponse<never>>({ ok: false, error: "Invalid request", issues: error.flatten().fieldErrors }, { status: 400 });
    }
    return NextResponse.json<ApiResponse<never>>({ ok: false, error: "Unable to save college" }, { status: 500 });
  }
}
