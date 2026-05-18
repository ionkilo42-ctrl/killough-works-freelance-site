import { NextResponse } from "next/server";

import { handleIntake } from "@/lib/intake";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const result = await handleIntake(payload);
    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not submit the form right now.";

    return NextResponse.json({ message }, { status: 400 });
  }
}
