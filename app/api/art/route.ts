import Arts from "@/backend/models/Arts";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const arts = await Arts.find({}).populate('userId', 'username').sort({ createdAt: -1 }).lean().maxTimeMS(2000);
    return NextResponse.json(arts);
}