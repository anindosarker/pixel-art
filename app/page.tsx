import Canvas from "./components/Canvas";
import SignUp from "./components/SignUp";
import Navbar from "./components/Navbar";
import RenderArts from "./components/RenderArts";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { cookies } from "next/headers";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const currentUser = await supabase.auth.getUser();
  console.log("👉️ ~ file: page.tsx:13 ~ Home ~ currentUser:\n", currentUser);

  if (currentUser) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col gap-5 items-center justify-center bg-black p-5">
          <div className="text-2xl font-semibold text-rose-500">
            Welcome {currentUser?.data.user?.email} <br />
          </div>
          <Canvas />
          <div className="flex flex-col gap-4 w-1/2">
            <RenderArts />
          </div>
        </div>
      </>
    );
  }
  return <SignUp />;
}
