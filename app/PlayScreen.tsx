'use client'

import React, { useState } from 'react'
import { Text } from '@react-three/drei'
import Box from './Box'

interface PlayScreenProps {
  onBack: () => void
  gameState: string
}

export default function PlayScreen({ onBack, gameState }: PlayScreenProps) {
    const [text, setText] = useState('')
    
    return (
        <group position={[-5 * Math.sqrt(3)/2, 0, 2.5]} rotation={[0, Math.PI - 1, 0]}>
            <Text 
                position={[0, 2, 0]}
                color="white" 
                anchorX="center" 
                anchorY="middle"
                scale={[0.5, 0.5, 0.5]}
                >
                Where would you like to travel to today?
            </Text>
            <Text 
                position={[0, 2, -5]}
                color="white" 
                anchorX="center" 
                anchorY="middle"
                scale={[0.5, 0.5, 0.5]}
                >
                {text}
            </Text>
            <Box 
                position={[-2, 0, 0]} 
                color="#ff0000"
                onHover={() => setText('This is the red cube!')}
                gameState={gameState}
            />
            <Box 
                position={[0, 0, 0]} 
                color="#00ff00"
                onHover={() => setText('This is the green cube!')}
                gameState={gameState}
            />
            <Box 
                position={[2, 0, 0]} 
                color="#0000ff"
                onHover={() => setText('This is the blue cube!')}
                gameState={gameState}
            />
            <Text
                position={[-2, -2, 0]}
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