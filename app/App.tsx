'use client'

import React from 'react'
import { Canvas } from '@react-three/fiber'
import Camera from './components/Camera'
import { Suspense } from "react";
import Carousel from './components/Carousel';
import HUD from './components/HUD';

export default function Scene() {

  return (
    <Canvas camera={{ position: [0, 0, 0], fov: 100 }}>
      <Suspense fallback={null}>
        <Camera />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <HUD />
        <Carousel />
      </Suspense>
    </Canvas>
  )
}