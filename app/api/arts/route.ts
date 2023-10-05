import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


const getPagination = (page: number, size: number) => {
  const limit = size ? +size : 6; // Change the default page size to 6
  const from = page ? (page - 1) * limit : 0;
  const to = page ? from + limit : limit;

  return { from, to };
};

export async function GET(request: Request) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get("filter");
  const page = parseInt(searchParams.get("page") || "1");
  const size = parseInt(searchParams.get("size") || "5"); 

  const pagination = getPagination(page, size);

  if (filter === "timeA") {
    let { data, error } = await supabase
      .from("arts")
      .select(`*, user_id(*)`)
      .order("created_at", { ascending: true })
      .range(pagination.from, pagination.to);

    if (error) {
      return NextResponse.error();
    }
    return NextResponse.json(data);
  } else if (filter === "timeD") {
    let { data, error } = await supabase
      .from("arts")
      .select(`*, user_id(*)`)
      .order("created_at", { ascending: false })
      .range(pagination.from, pagination.to);

    if (error) {
      return NextResponse.json(error, { status: 500 });
    }

    return NextResponse.json(data);
  } else if (filter === "price") {
    let { data, error } = await supabase
      .from("arts")
      .select(`*, user_id(*)`)
      .order("price", { ascending: false })
      .range(pagination.from, pagination.to);

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
