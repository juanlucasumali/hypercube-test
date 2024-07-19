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

  const { scale, positionX, positionY, positionZ } = useSpring({
    scale: hovered ? 1.5 : 1,
    positionX: position[0],
    positionY: position[1],
    positionZ: position[2],
    config: config.wobbly
  })

  useFrame(() => {
    ref.current.rotation.y += 0.01
  })

  return (
    <animated.mesh
      ref={ref}
      position-x={positionX}
      position-y={positionY}
      position-z={positionZ}
      scale={scale}
      onPointerOver={() => { setHover(true); onHover(); }}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <animated.meshStandardMaterial color={color} />
    </animated.mesh>
  )
}