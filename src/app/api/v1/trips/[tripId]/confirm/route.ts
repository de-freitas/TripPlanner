import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { confirmTrip } from "./confirm-trip";

const getTripSchema = z.string().uuid();

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const pathname = request.nextUrl.pathname;
    const tripId = pathname.split("/api/v1/trips/")[1].split("/confirm")[0];

    getTripSchema.parse(tripId);

    const result = await confirmTrip(tripId);

    if (result?.confirmed) {
      return NextResponse.redirect(
        `${process.env.APPLICATION_BASE_URL}/trip-details/${result?.redirectTo}`
      );
    } else {
      return NextResponse.json(
        { error: "Trip not confirmed" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
