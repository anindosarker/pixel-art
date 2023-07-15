import Image from 'next/image'
import DrawingBoard from './components/DrawingBoard'
import Canvas from './components/Canvas'
import { getDatabase } from '@/db/connection';


export default async function Home() {
  await getDatabase();
  
  return (
    <div className="flex items-center justify-center">
      <Canvas/>
    </div>
  )
}
