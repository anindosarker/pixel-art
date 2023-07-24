import Canvas from "./components/Canvas";
import Navbar from "./components/Navbar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { cookies } from "next/headers";
import ServerRenderArts from "./components/ServerRenderArts";
import ServerArtsByRating from "./components/ServerArtsByRating";
import RenderArts from "./components/RenderArts";

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
          {/* <div className="flex gap-10">
            <div className="">
              <h1 className="text-3xl font-semibold mb-4">
                Sorted by Time Uploaded
              </h1>
              <ServerRenderArts />
            </div>
            <div className="">
              <h1 className="text-3xl font-semibold mb-4">Sorted by Rating</h1>
              <ServerArtsByRating />
            </div>
          </div> */}
          <div className="">
            <RenderArts/>
          </div>
        </div>
      </>
    );
  }
  return <SignUp />;
}
