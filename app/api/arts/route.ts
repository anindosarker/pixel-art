import { Database } from "@/lib/database.types";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get("filter");

  if (filter === "rating") {
    let { data, error } = await supabase
      .from("arts")
      .select(`*, user_id(*)`)
      .order("avg_rating", { ascending: false });

    if (error) {
      return NextResponse.error();
    }

    return NextResponse.json(data);
  } else {
    let { data, error } = await supabase
      .from("arts")
      .select(`*, user_id(*)`)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(error, { status: 500 });
    }

    return NextResponse.json(data);
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  let artData: Database["public"]["Tables"]["arts"]["Insert"] = {
    ...body,
  };

  const { data, error } = await supabase.from("arts").insert(artData).select();
  if (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(data);
}
