import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { confirmTrip } from "./confirm-trip";
import { env } from "process";

const getTripSchema = z.string().uuid();

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const pathname = request.nextUrl.pathname;
    const tripId = getTripSchema.parse(
      pathname.split("/api/v1/trips/")[1].split("/confirm")[0]
    );
    const result = await confirmTrip(tripId);

    if (result?.confirmed) {
      NextResponse.redirect(`http://localhost:3000/${result?.redirectTo}`);
    }
  } catch (error) {
    throw new Error();
  }
}
