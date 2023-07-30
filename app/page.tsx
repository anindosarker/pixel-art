import Canvas from "./components/Canvas";
import Navbar from "./components/Navbar";
import RenderArts from "./components/RenderArts";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-5 items-center justify-center bg-black p-5">
        <div className="text-3xl font-semibold text-white tracking-widest">
          Welcome to OnlyMP3 <br />
        </div>
        <Canvas />
        <div className="">
          <RenderArts />
        </div>
      </div>
    </>
  );
}
