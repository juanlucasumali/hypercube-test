'use client'

import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { useSpring, animated, config } from '@react-spring/three'
import TitleScreen from './TitleScreen'
import Box from './Box'
import MousePeekEffect from './MousePeekEffect'

const AnimatedText = animated(Text)

export default function Scene() {
  const [gameState, setGameState] = useState('title')
  const [text, setText] = useState('')

  const handlePlay = () => {
    setGameState('play')
    setText('Move your mouse to peek around!')
  }

  const handleAbout = () => {
    setGameState('about')
    setText('This is an interactive 3D experience.')
  }

  const handleBack = () => {
    setGameState('title')
    setText('')
  }

  const { aboutPositionX } = useSpring({
    aboutPositionX: gameState === 'about' ? 0.5 : 30,
    config: config.molasses
  });

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <MousePeekEffect />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />

      <group visible={gameState === 'title'}>
        <TitleScreen onPlay={handlePlay} onAbout={handleAbout} />
      </group>
      
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

      <AnimatedText
        position-x={aboutPositionX}
        position-y={0}
        position-z={0}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={10}
      >
        Consider This is an interactive 3D experience that challenges your perspective.
        Move your mouse to peek around and interact with the objects.
      </AnimatedText>

      {gameState !== 'title' && (
        <Text
          position={[-2, -2, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
          onClick={handleBack}
          onPointerOver={(e) => (e.object.scale.x = e.object.scale.y = 1.1)}
          onPointerOut={(e) => (e.object.scale.x = e.object.scale.y = 1)}
        >
          Back
        </Text>
      )}

      <Text 
        position={[0, 2, 0]} 
        color="white" 
        anchorX="center" 
        anchorY="middle"
        scale={[0.5, 0.5, 0.5]}
      >
        {text}
      </Text>
    </Canvas>
  )
}