'use client'

import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useSpring, animated, config } from '@react-spring/three'
import * as THREE from 'three'

interface BoxProps {
  position: [number, number, number]
  color: string
  onHover: () => void
  gameState: string
}

export default function Box({ position, color, onHover, gameState }: BoxProps) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false)

  const { scale, positionX } = useSpring({
    scale: hovered ? 1.5 : 1,
    positionX: gameState === 'play' ? position[0] : -20,
    config: config.wobbly
  })

  useFrame(() => {
    ref.current.rotation.y += 0.01
  })

  return (
    <animated.mesh
      ref={ref}
      position-x={positionX}
      position-y={position[1]}
      position-z={position[2]}
      scale={scale}
      onPointerOver={() => { setHover(true); onHover(); }}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <animated.meshStandardMaterial color={color} />
    </animated.mesh>
  )
}