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

  const body = await req.json();
  console.log(body.art_array)

  // check if art already exists
  
  const existingArts = await supabase
    .from('arts')
    .select('art_array');

  // Check if art_array already exists in the database
  const { data: existingArtsData, error: existingArtsError } = await supabase
    .from('arts')
    .select('art_array');

  if (existingArtsError) {
    return NextResponse.error();
  }

  // Extract art_array values from the response
  const existingArtArrays = existingArtsData.map(existingArt => existingArt.art_array);

  // Check if art_array already exists in the database
  const artExists = existingArtArrays.some(existingArtArray =>
    JSON.stringify(existingArtArray) === JSON.stringify(body.art_array)
  );

  console.log(artExists);
  if (artExists) {
    return NextResponse.error();
  }


  let artData: Database["public"]["Tables"]["arts"]["Insert"] = {
    ...body,
  };

  const { data, error } = await supabase.from("arts").insert(artData).select();
  if (error) {
    return NextResponse.error();
  }
  return NextResponse.json(data);
}
