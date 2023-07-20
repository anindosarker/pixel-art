import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Database } from "@/lib/database.types";

const supabase = createServerComponentClient<Database>({ cookies });

export async function GET() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("👉️ ~ file: route.ts:13 ~ GET ~ user:\n", user);

  if (!user) {
    return NextResponse.json("No user found", { status: 404 });
  }

  return NextResponse.json(user);
}
