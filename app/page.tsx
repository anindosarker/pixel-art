import Canvas from "./components/Canvas";
import Navbar from "./components/Navbar";
import RenderArts from "./components/RenderArts";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-12 items-center justify-center bg-black p-5">
        <div className="text-3xl font-semibold text-white tracking-widest">
          Welcome to OnlyMP3 <br />
        </div>
        <Canvas />
        <div className="text-3xl font-semibold text-white tracking-widest">
          Arts by other users
        </div>
        <RenderArts />
      </main>
    </>
  );
}
