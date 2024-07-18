'use client';

import { useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const MOUSE_PEEK = 1;

export default function MousePeekEffect() {
  const { camera } = useThree()
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

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
    camera.rotation.y = -THREE.MathUtils.lerp(camera.rotation.y, rotation.y, MOUSE_PEEK)
    camera.rotation.x = -THREE.MathUtils.lerp(camera.rotation.x, rotation.x, MOUSE_PEEK)
  })

  return null
}