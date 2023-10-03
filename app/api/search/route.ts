import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const supabase = createServerComponentClient<Database>({ cookies });
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    console.log(query)

    if (!query) {
        return {
            status: 400,
            body: "Missing query parameter.",
        };
    }

    let { data, error } = await supabase
        .from("arts")
        .select("*")
        .order("created_at", { ascending: false })
        .or(`audio_name.ilike.%${query}%, genre.ilike.%${query}%, username.ilike.%${query}%`);
    console.error("Supabase error:", error);
    console.log(data)

    if (error) {
        return NextResponse.json(error, { status: 500 });
    }
    return NextResponse.json(data);
}
