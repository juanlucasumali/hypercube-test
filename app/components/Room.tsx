import React from 'react'
import { Gltf, Text, useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { Physics, usePlane } from '@react-three/cannon'
import Floor from './Floor'
import { Table } from './Furniture'
import { Guy } from './Guy'

interface RoomProps {
  color: string
}

export default function Room({ color }: RoomProps) {
  return (
    <group>
      <color attach="background" args={['#171720']} />
      <fog attach="fog" args={['#171720', 60, 90]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[-20, -5, -20]} color="red" />
      {/* <Gltf src="https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/low-poly-farm/model.gltf" scale={1} position={[0, -0.8, -4]} /> */}
      <Physics allowSleep={false} iterations={15} gravity={[0, -200, 0]}>
        <group position={[8, 0, -15]}>
          <Guy />
          <Table />
        </group>
        <Floor color={"#878790"} position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      </Physics>
    </group>
  )
}