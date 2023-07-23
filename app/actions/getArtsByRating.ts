import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const supabase = createServerComponentClient<Database>({ cookies });

export const getArtsByRating = async () => {
    let {data, error} = await supabase.from ("arts").select(`*, user_id(*)`).order("avg_rating", {ascending: false});
    if (error) {
        return error;
    } else {
        return data;
    }
}