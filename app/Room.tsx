// Room.tsx
import React from 'react'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

interface RoomProps {
  color: string
  onBack: () => void
}

export default function Room({ color, onBack }: RoomProps) {
  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 2, 0]} intensity={0.5} />
      <mesh>
        <boxGeometry args={[10, 10, 10]} />
        <meshStandardMaterial color={color} side={THREE.BackSide} />
      </mesh>
      <mesh position={[0, 0, -2]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[-1, -1, -3]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[1, 1, -3]}>
        <coneGeometry args={[0.5, 1, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <Text
        position={[0, 0, 4]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {color.charAt(0).toUpperCase() + color.slice(1)} Room
      </Text>
    </group>
  )
}