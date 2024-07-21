'use client'

import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useSpring, animated, config, SpringValue } from '@react-spring/three'
import * as THREE from 'three'
import { MeshPortalMaterial, PortalMaterialType } from '@react-three/drei'

interface BoxProps {
  position: [number, number, number]
  onHover: () => void
  gameState: string
  room: React.ReactNode
  color: string
  isFocused: boolean
  rotation: SpringValue<number>
}

export default function Box({ position, onHover, gameState, room, color, isFocused, rotation }: BoxProps) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false)
  const portalMaterial = useRef<PortalMaterialType>(null);
  const roomRef = useRef<THREE.Group>(null)

  // TODO: The frame should scale, but not the room inside. Also, turn the frame. Look at examples on how they acheived this.
  const { scale, positionX, positionY, positionZ } = useSpring({
    scale: hovered && isFocused ? 1.5 : 1,
    positionX: position[0],
    positionY: position[1],
    positionZ: position[2],
    config: { mass: 1, tension: 280, friction: 60 }
  })

  useFrame(() => {
      if (roomRef.current) {
          roomRef.current.rotation.y = -rotation.get()
      }
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
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <MeshPortalMaterial ref={portalMaterial} side={THREE.DoubleSide}>
          <color attach="background" args={[color]} />
          {/* <group position={[0, 0, -5]}> */}
          <group ref={roomRef}>
            {room}
          </group>
          {/* </group> */}
        </MeshPortalMaterial>
    </animated.mesh>
  )
}