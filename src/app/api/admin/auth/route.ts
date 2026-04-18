import { NextRequest, NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const COOKIE_NAME = "admin_token";
// Simple token - in production, use a proper JWT
const ADMIN_TOKEN = Buffer.from(`admin:${ADMIN_PASSWORD}`).toString("base64");

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set(COOKIE_NAME, ADMIN_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(COOKIE_NAME);
  return response;
}

// Verify auth - used by other API routes
export function verifyAuth(request: NextRequest): boolean {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  return token === ADMIN_TOKEN;
}
