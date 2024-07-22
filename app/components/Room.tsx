import React from 'react'
import { Physics } from '@react-three/cannon'
import Floor from './Floor'
import { Table } from './Furniture'
import { Guy } from './Guy'

interface RoomProps {
  color: string
  gltf: string
  inRoom: boolean
}

export default function Room({ color, gltf, inRoom }: RoomProps) {
  return (
    <group>
      <color attach="background" args={['#171720']} />
      <fog attach="fog" args={['#171720', 60, 90]} />
      <ambientLight intensity={0.9} />
      {/* <pointLight position={[-20, -5, -20]} color="red" /> */}
      <Physics allowSleep={false} iterations={15} gravity={[0, -200, 0]}>
        <group position={[0, 0, -10]}>
          <group rotation={[0, 1, 0]} position={[-5, -11, 5]}>
            <Guy />
          </group>
          <group rotation={[0, -1, 0]} position={[5, -11, 5]}>
            <Guy torsoColor='#326ee1'/>
          </group>
          <Table />
        </group>
        <Floor color={"#878790"} position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      </Physics>
    </group>
  )
}
