import ArtComponent from './components/ArtComponent';
import Canvas from './components/Canvas'
import { getDatabase } from '@/backend/db/connection';
import Grid from './components/Grid';
import getCurrentUser from './action/getCurrentUser';


export default async function Home() {
  await getDatabase();
  const currentUser = await getCurrentUser();
  
  if (!currentUser) {
    return (
      <div className="">not signed in</div>
    )
  }

  return (
    <div className="flex flex-col gap-5 items-center justify-center bg-black p-5">
      <Canvas />
      <div className="flex flex-col gap-4 w-1/2">
        <ArtComponent />
        <ArtComponent />
        <ArtComponent />
      </div>
    </div>
  );
}
