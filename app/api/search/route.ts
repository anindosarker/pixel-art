import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<void | Response> {
    const supabase = createServerComponentClient<Database>({ cookies });
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    console.log(query);

    if (!query) {
        return new Response("Missing query parameter.", { status: 400 });
    }

    let { data, error } = await supabase
        .from("arts")
        .select("*")
        .order("created_at", { ascending: false })
        .or(`audio_name.ilike.%${query}%, genre.ilike.%${query}%, username.ilike.%${query}%`);
    console.error("Supabase error:", error);
    console.log(data);

    if (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }

    return new Response(JSON.stringify(data), { status: 200, headers: { "Content-Type": "application/json" } });
}
