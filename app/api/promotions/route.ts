import { NextResponse } from "next/server";
import { getActivePromotions } from "@/app/lib/db/promotions";

export async function GET() {
  try {
    const promotions = await getActivePromotions();
    return NextResponse.json(promotions);
  } catch (error) {
    console.error("Error fetching promotions:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
