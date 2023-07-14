import Image from 'next/image'
import DrawingBoard from './components/DrawingBoard'
import Canvas from './components/Canvas'

export default function Home() {
  return (
    <div className="flex items-center justify-center p-5">
      <Canvas/>
    </div>
  )
}
