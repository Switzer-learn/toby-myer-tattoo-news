import { NextResponse } from "next/server";
import { getConfig } from "@/app/lib/db/config";

export async function GET() {
  try {
    const config = await getConfig();
    
    if (!config) {
      return NextResponse.json({ error: "Config not found" }, { status: 404 });
    }
    
    return NextResponse.json(config);
  } catch (error) {
    console.error("Error fetching config:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
