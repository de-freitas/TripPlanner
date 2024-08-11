import { NextRequest, NextResponse } from "next/server";
import { getParticipants } from "./get-participants";

export async function GET(
  request: NextRequest,
  { params }: { params: { tripId: string } }
) {
  const participants = await getParticipants(params.tripId);

  return NextResponse.json({ participants });
}
