import { Json } from './../../../lib/database.types';
import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase = createServerComponentClient<Database>({ cookies });
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
  const supabase = createServerComponentClient<Database>({ cookies });

  const art = await req.json();
  
  console.log(art)

  // let artData: Database["public"]["Tables"]["arts"]["Insert"] = {
  //   ...art,
  // };

  let artData: any = {
    ...art,
  };

  const { data, error } = await supabase.from("arts").upsert(artData).select();
  if (error) {
    console.log(error.message)    
    return NextResponse.error();
  }
  return NextResponse.json(data);
}
