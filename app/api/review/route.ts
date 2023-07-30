import { Database } from "@/lib/database.types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const supabase = createRouteHandlerClient<Database>({ cookies });

export async function GET() {
  let { data, error } = await supabase.from("reviews").select("*");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("👉️ ~ file: route.ts:13 ~ GET ~ user:\n", user);
  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json({ data, user });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("rating", body)
  let reviewData: Database["public"]["Tables"]["reviews"]["Insert"] = {
    ...body,
  };

  const { data, error } = await supabase
    .from("reviews")
    .upsert(reviewData)
    .select();
  if (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(data);
}
