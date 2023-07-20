import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Database } from "@/lib/database.types";

const supabase = createServerComponentClient<Database>({ cookies });

export async function GET() {
  let { data, error } = await supabase.from("arts").select("*");

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { data, error } = await supabase
    .from("product")
    .insert([body])
    .select();

  return NextResponse.json(data);
}
