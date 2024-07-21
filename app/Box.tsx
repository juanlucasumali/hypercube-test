'use client'

import React, { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useSpring, animated, config, SpringValue } from '@react-spring/three'
import * as THREE from 'three'
import { MeshPortalMaterial, PortalMaterialType, useCursor } from '@react-three/drei'
import { gsap } from 'gsap'

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
  const [isOpen, setIsOpen] = useState(false)
  const { camera } = useThree()
  useCursor(hovered && isFocused)

  // TODO: The frame should scale, but not the room inside. Also, turn the frame. Look at examples on how they acheived this.
  const { scale, positionX, positionY, positionZ } = useSpring({
    scale: hovered && isFocused ? 1.2 : 1,
    positionX: position[0],
    positionY: position[1],
    positionZ: position[2],
    config: { mass: 1, tension: 280, friction: 60 }
  })

  useFrame(() => {
      if (roomRef.current) {
          roomRef.current.rotation.y = -rotation.get()
      }
      if (portalMaterial.current) {
        portalMaterial.current.blend = THREE.MathUtils.lerp(
          portalMaterial.current.blend,
          isOpen && isFocused ? 1 : 0,
          0.1
        )
      }
  })

  const handleClick = () => {
    gsap.to(camera.position, {
      duration: 1,
      x: 0,
      y: 0,
      z: -3,
      ease: 'power2.inOut'
    })
    // setIsOpen(!isOpen)
  }

  return (
    <animated.group
      position-x={positionX}
      position-y={positionY}
      position-z={positionZ}
      scale={scale}
    >
      <mesh
        ref={ref}
        onPointerOver={() => { setHover(true); onHover(); }}
        onPointerOut={() => setHover(false)}
        onClick={handleClick}
      >
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <MeshPortalMaterial ref={portalMaterial} side={THREE.DoubleSide}>
          <color attach="background" args={[color]} />
          <animated.group scale-x={scale.to(s => 1 / s)} scale-y={scale.to(s => 1 / s)} scale-z={scale.to(s => 1 / s)}>
            <group ref={roomRef}>
              {room}
            </group>
          </animated.group>
        </MeshPortalMaterial>
      </mesh>
    </animated.group>
  )
}