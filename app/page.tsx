import ArtComponent from "./components/ArtComponent";
import Canvas from "./components/Canvas";
import { getDatabase } from "@/backend/db/connection";
import getCurrentUser from "./action/getCurrentUser";
import SignUp from "./components/SignUp";
import Navbar from "./components/Navbar";
import RenderArts from "./components/RenderArts";
import getAllArts from "./action/getAllArts";

export default async function Home() {
  await getDatabase();
  const currentUser = await getCurrentUser();

  if (currentUser) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col gap-5 items-center justify-center bg-black p-5">
          <div className="text-2xl font-semibold text-rose-500">
            Welcome {currentUser?.username}! <br />
          </div>
          <Canvas />
          <div className="flex flex-col gap-4 w-1/2">
            <RenderArts/>
          </div>
        </div>
      </>
    );
  }
  return <SignUp />;
}
