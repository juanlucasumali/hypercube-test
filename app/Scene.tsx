// app/Scene.tsx
'use client'


import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import { useSpring, animated, config } from '@react-spring/three'
import * as THREE from 'three'

const MOUSE_PEEK = 1;

function Box(props: any) {
    const ref = useRef<THREE.Mesh>(null!);   
    const [hovered, setHover] = useState(false)
    const [rotate, setRotate] = useState(0)

    const { scale, color } = useSpring({
        scale: hovered ? 1.5 : 1,
        color: hovered ? props.color : 'white' || '#ff9900',
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

function MousePeekEffect() {
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

export default function Scene() {
  const [text, setText] = useState('CONSIDER THIS')

  useEffect(() => {
    const timer = setTimeout(() => {
      setText('Move your mouse to peek around!')
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <MousePeekEffect />
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