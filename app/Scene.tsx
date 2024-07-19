'use client'

import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import RotatingGroup from './RotatingGroup'
import TitleScreen from './TitleScreen'
import PlayScreen from './PlayScreen'
import AboutScreen from './AboutScreen'
import MousePeekEffect from './MousePeekEffect'

export default function Scene() {
  const [gameState, setGameState] = useState('title')

  const handlePlay = () => {
    setGameState('play')
  }

  const handleAbout = () => {
    setGameState('about')
  }

  const handleBack = () => {
    setGameState('title')
  }

  return (
    <Canvas camera={{ position: [0, 0, 0], fov: 75 }}>
      <MousePeekEffect />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />

      <RotatingGroup gameState={gameState}>
        <TitleScreen onPlay={handlePlay} onAbout={handleAbout} />
        <PlayScreen onBack={handleBack} gameState={gameState} />
        <AboutScreen onBack={handleBack} />
      </RotatingGroup>
    </Canvas>
  )
}