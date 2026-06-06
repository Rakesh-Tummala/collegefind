import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ZodError } from "zod";
import { prisma } from "@/lib/prisma";
import type { ApiResponse } from "@/lib/types/api";
import { signupSchema } from "@/lib/validators/auth";

export async function POST(request: NextRequest) {
  try {
    const body = signupSchema.parse(await request.json());
    const existing = await prisma.user.findUnique({ where: { email: body.email } });
    if (existing) {
      return NextResponse.json<ApiResponse<never>>({ ok: false, error: "Email is already registered" }, { status: 409 });
    }
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        passwordHash: await bcrypt.hash(body.password, 12)
      },
      select: { id: true, name: true, email: true }
    });
    return NextResponse.json<ApiResponse<typeof user>>({ ok: true, data: user }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json<ApiResponse<never>>({ ok: false, error: "Invalid signup details", issues: error.flatten().fieldErrors }, { status: 400 });
    }
    return NextResponse.json<ApiResponse<never>>({ ok: false, error: "Unable to create account" }, { status: 500 });
  }
}
