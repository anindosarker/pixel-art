import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const supabase = createServerComponentClient<Database>({ cookies });

export async function GET() {
  let { data, error } = await supabase.from("arts").select(`*, user_id(*)`);

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json(data);
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
