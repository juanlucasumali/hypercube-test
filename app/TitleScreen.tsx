'use client'

import React from 'react'
import { Text } from '@react-three/drei'

interface TitleScreenProps {
  onPlay: () => void
  onAbout: () => void
}

export default function TitleScreen({ onPlay, onAbout }: TitleScreenProps) {
  return (
    <>
      <Text
        position={[0, 1, 0]}
        fontSize={1}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        CONSIDER THIS
      </Text>
      <group position={[0, -1, 0]}>
        <Text
          position={[-1, 0, 0]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
          onClick={onPlay}
          onPointerOver={(e) => (e.object.scale.x = e.object.scale.y = 1.1)}
          onPointerOut={(e) => (e.object.scale.x = e.object.scale.y = 1)}
        >
          Play
        </Text>
        <Text
          position={[1, 0, 0]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
          onClick={onAbout}
          onPointerOver={(e) => (e.object.scale.x = e.object.scale.y = 1.1)}
          onPointerOut={(e) => (e.object.scale.x = e.object.scale.y = 1)}
        >
          About
        </Text>
      </group>
    </>
  )
}