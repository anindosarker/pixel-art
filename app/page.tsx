import Canvas from './components/Canvas'
import { getDatabase } from '@/backend/db/connection';


export default async function Home() {
  await getDatabase();
  
  return (
    <div className="flex items-center justify-center bg-black p-5">
      <Canvas/>
    </div>
  )
}
