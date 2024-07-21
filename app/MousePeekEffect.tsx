'use client';

import { useState, useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { EffectComposer, Pixelation } from '@react-three/postprocessing'

const MOUSE_PEEK = 1;

export default function MousePeekEffect() {
  const { camera, gl } = useThree()
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [canvasHeight, setCanvasHeight] = useState(gl.domElement.height)

  useEffect(() => {
    const updateMousePosition = (e: any) => {
      setRotation({
        x: ((e.clientY / window.innerHeight) * 2 - 1) * Math.PI / 16,
        y: ((e.clientX / window.innerWidth) * 2 - 1) * Math.PI / 16
      })
    }

    window.addEventListener('mousemove', updateMousePosition)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])

  useFrame(() => {

    console.log(canvasHeight / 331.6)
    if (canvasHeight != gl.domElement.height) {
      setCanvasHeight(gl.domElement.height)
      console.log("Current canvasHeight:", canvasHeight)
      console.log("Current domElement height:", gl.domElement.height)
    }

    camera.rotation.y = -THREE.MathUtils.lerp(camera.rotation.y, rotation.y, MOUSE_PEEK)
    camera.rotation.x = -THREE.MathUtils.lerp(camera.rotation.x, rotation.x, MOUSE_PEEK)
  })

  return (
    <EffectComposer>
      <Pixelation granularity={canvasHeight / 165.8} />
    </EffectComposer>
  )
}