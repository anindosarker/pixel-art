import Arts from "@/backend/models/Arts";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const arts = await Arts.find({}).populate('userId', 'username').sort({ createdAt: -1 }).lean().maxTimeMS(2000);
        return NextResponse.json(arts);
    } catch (error) {
        return NextResponse.json({ error: "something went wrong" }, { status: 500 });
    }
}