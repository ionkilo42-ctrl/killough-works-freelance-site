import { NextResponse } from "next/server";

import { extractRequestMeta, handlePaymentAcceptance } from "@/lib/payment-acceptance";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const meta = extractRequestMeta(request);
    const result = await handlePaymentAcceptance(
      {
        offerSlug: payload.offerSlug as "friction-check" | "first-fix" | "mini-build",
        stripeUrl: String(payload.stripeUrl ?? ""),
      },
      meta,
    );

    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not record payment acceptance right now.";

    return NextResponse.json({ message }, { status: 400 });
  }
}