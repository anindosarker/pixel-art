import Canvas from "./components/Canvas";
import Navbar from "./components/Navbar";
import RenderArts from "./components/RenderArts";

export default async function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-5 items-center justify-center bg-black p-5">
        <div className="text-2xl font-semibold text-rose-500">
          Welcome to Pixel art
        </div>
        <Canvas />
        <div className="flex flex-col gap-4 w-1/2">
          <RenderArts />
        </div>
      </div>
    </>
  );
}
