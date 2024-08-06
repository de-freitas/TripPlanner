import { NextResponse } from "next/server";
import { z } from "zod";

import { getTripDetails } from "./get-trip-details";

const getTripSchema = z.string().uuid();

export async function GET(request: Request, response: Response) {
  try {
    const { pathname } = new URL(request.url);
    const tripId = getTripSchema.parse(pathname.split("/api/v1/trips/")[1]);
    const { trip } = await getTripDetails(tripId);

    return NextResponse.json(
      { trip },
      {
        status: 200,
      }
    );
  } catch (error) {
    return error;
  }
}
