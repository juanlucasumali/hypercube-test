'use client'

import React, { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useSpring, animated, config, SpringValue } from '@react-spring/three'
import * as THREE from 'three'
import { MeshPortalMaterial, PortalMaterialType, useCursor } from '@react-three/drei'
import { gsap } from 'gsap'
import Room from './Room'

interface BoxProps {
  position: [number, number, number]
  onHover: () => void
  child?: React.ReactNode
  color?: string
  boxColor?: string
  roomColor?: string
  roomScene?: string
  isFocused: boolean
  rotation: SpringValue<number>
}

export default function Box({ position, onHover, color, child, boxColor, roomColor, roomScene, isFocused, rotation }: BoxProps) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false)
  const portalMaterial = useRef<PortalMaterialType>(null!);
  const roomRef = useRef<THREE.Group>(null)
  const [isEntering, setIsEntering] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { camera } = useThree()
  useCursor(hovered && isFocused && !isEntering && !isOpen)

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
  })

  const handleClick = () => {
      setIsEntering(true);
      gsap.to(camera.position, {
        onStart: () => { 
          // isOpen && portalMaterial.current ? portalMaterial.current.blend = 0 : null
        },
        duration: 1,
        x: 0,
        y: 0,
        z: !isOpen ? -3 : 0,
        ease: 'power4.inOut',
        onComplete: () => {
          setIsOpen(!isOpen);
          setIsEntering(false);
          // isOpen && portalMaterial.current ? null : portalMaterial.current.blend = 1;
        }
      })
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
        onClick={isFocused && !isEntering ? handleClick : () => {}}
      >
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <MeshPortalMaterial ref={portalMaterial} side={THREE.DoubleSide}>
          <color attach="background" args={[boxColor ? boxColor! : color!]} />
          <animated.group scale-x={scale.to(s => 1 / s)} scale-y={scale.to(s => 1 / s)} scale-z={scale.to(s => 1 / s)}>
            <group ref={roomRef}>
              {child ? child : <Room color={roomColor!} gltf={roomScene!} inRoom={isOpen}/>}
            </group>
          </animated.group>
        </MeshPortalMaterial>
      </mesh>
    </animated.group>
  )
}