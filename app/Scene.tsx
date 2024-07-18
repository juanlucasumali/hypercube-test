// app/Scene.tsx
'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import { useSpring, animated, config } from '@react-spring/three'
import { Mesh } from 'three'

function Box(props: any) {
    const ref = useRef<Mesh>(null!);   
    const [hovered, setHover] = useState(false)
    const [rotate, setRotate] = useState(0)

    const { scale, color } = useSpring({
        scale: hovered ? 1.5 : 1,
        color: hovered ? 'white' : props.color || '#ff9900',
        config: config.wobbly
    })

    useEffect(() => {
        if (hovered) {
        props.onHover?.()
        }
    }, [hovered, props])

    useFrame(() => {
        if (!ref)
        setRotate(rotate + 0.005)
        ref.current.rotation.y = rotate
}) 

  return (
    <animated.mesh
      {...props}
      ref={ref}
      scale={scale}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <animated.meshStandardMaterial color={color} />
    </animated.mesh>
  )
}

export default function Scene() {
  const [text, setText] = useState('Welcome to 3D Interaction')

  useEffect(() => {
    const timer = setTimeout(() => {
      setText('Hover over a cube!')
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Canvas>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Box 
        position={[-2, 0, 0]} 
        color="#ff0000"
        onHover={() => setText('This is the red cube!')}
      />
      <Box 
        position={[0, 0, 0]} 
        color="#00ff00"
        onHover={() => setText('This is the green cube!')}
      />
      <Box 
        position={[2, 0, 0]} 
        color="#0000ff"
        onHover={() => setText('This is the blue cube!')}
      />
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