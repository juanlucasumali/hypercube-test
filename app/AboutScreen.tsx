'use client'

import React from 'react'
import { Text } from '@react-three/drei'

interface AboutScreenProps {
  onBack: () => void
}

export default function AboutScreen({ onBack }: AboutScreenProps) {
  return (
    <group position={[5 * Math.sqrt(3)/2, 0, 2.5]} rotation={[0, Math.PI + 1, 0]}>
        <Text 
          position={[0, 2, 0]}
          color="white" 
          anchorX="center" 
          anchorY="middle"
          scale={[0.5, 0.5, 0.5]}
        >
            ABOUT
        </Text>
      <Text
        position={[0, 0, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={10}
      >
        Consider This is an interactive 3D experience that challenges your perspective.
        Move your mouse to peek around and interact with the objects.
      </Text>
      <Text
        position={[0, -2, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        onClick={onBack}
        onPointerOver={(e) => (e.object.scale.x = e.object.scale.y = 1.1)}
        onPointerOut={(e) => (e.object.scale.x = e.object.scale.y = 1)}
      >
        Back
      </Text>
    </group>
  )
}