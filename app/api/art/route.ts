import Arts from "@/backend/models/Arts";
import { NextResponse } from "next/server";

export async function GET(request:Request) {
    const arts = await Arts.find({}).populate('userId', 'username');
    return NextResponse.json(arts);
}