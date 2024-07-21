'use client'

import React, { useState, useMemo, useEffect, useRef } from 'react'
import { Gltf, Text } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'
import Box from './Box'
import Room from './Room'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface BoxData {
  id: string
  hoverText: string
  child: React.ReactNode
  color: string
}

interface PlayScreenProps {
  onBack: () => void
  gameState: string
}

const dummyBoxData: BoxData[] = [
  { id: 'oranges1', hoverText: 'Oranges', color: "#e4cdac", child: <Gltf src="still_life_based_on_heathers_artwork-transformed.glb" scale={2} position={[0, -0.8, -4]} /> },
  { id: 'teapot1', hoverText: 'Teapot', color: "#e4cdac", child: <Gltf src="fiesta_tea-transformed.glb" position={[0, -2, -3]} /> },
  { id: 'cucumber1', hoverText: 'Cucumber', color: "#e4cdac", child: <Gltf src="pickles_3d_version_of_hyuna_lees_illustration-transformed.glb" scale={8} position={[0, -0.7, -2]} /> },
  { id: 'oranges2', hoverText: 'Oranges', color: "#e4cdac", child: <Gltf src="still_life_based_on_heathers_artwork-transformed.glb" scale={2} position={[0, -0.8, -4]} /> },
  { id: 'teapot2', hoverText: 'Teapot', color: "#e4cdac", child: <Gltf src="fiesta_tea-transformed.glb" position={[0, -2, -3]} /> },
  { id: 'cucumber3', hoverText: 'Cucumber', color: "#e4cdac", child: <Gltf src="pickles_3d_version_of_hyuna_lees_illustration-transformed.glb" scale={8} position={[0, -0.7, -2]} /> },
]
const AnimatedGroup = animated.group

export default function PlayScreen({ onBack, gameState }: PlayScreenProps) {
    const [text, setText] = useState('')
    const [rotationIndex, setRotationIndex] = useState(0)
    const [focusedIndex, setFocusedIndex] = useState(0)

    const boxCount = dummyBoxData.length
    const angleStep = (2 * Math.PI) / boxCount

    const boxesWithPositions = useMemo(() => {
        const radius = 3
        const offset = Math.PI / 2
    
        return dummyBoxData.map((box, index) => {
            const angle = index * angleStep - offset
            return {
                ...box,
                position: [
                    radius * Math.cos(angle),
                    0,
                    radius * Math.sin(angle)
                ] as [number, number, number]
            }
        })
    }, [boxCount, angleStep])

    const { rotation } = useSpring({
        rotation: rotationIndex * angleStep,
        config: { mass: 5, tension: 500, friction: 150 }
    })

    const rotateLeft = () => setRotationIndex((prevIndex) => prevIndex + 1)
    const rotateRight = () => setRotationIndex((prevIndex) => prevIndex - 1)

    useEffect(() => {
        const newFocusedIndex = Math.round(rotationIndex) % boxCount
        setFocusedIndex(newFocusedIndex < 0 ? newFocusedIndex + boxCount : newFocusedIndex)
        setText(dummyBoxData[focusedIndex].hoverText)
    }, [rotationIndex, boxCount])
    
    return (
        <group position={[0, 0, -3]} rotation={[0, 0, 0]}>
        {/* <group position={[-5 * Math.sqrt(3)/2, 0, 2.6]} rotation={[0, Math.PI - 1.05, 0]}> */}
            <Text 
                position={[0, 3, 0]}
                color="white" 
                anchorX="center" 
                anchorY="middle"
                scale={[0.5, 0.5, 0.5]}
            >
                Where would you like to travel to today?
            </Text>
            <Text 
                position={[0, 2, 0]}
                color="white" 
                anchorX="center" 
                anchorY="middle"
                scale={[0.3, 0.3, 0.3]}
            >
                {text}
            </Text>
            <AnimatedGroup rotation-y={rotation} position={[0, 0, 3]}>
            {/* <AnimatedGroup rotation-y={rotation} position={[-5 * Math.sqrt(3)/2 + 4.4, 0, 4]}> */}
            {boxesWithPositions.map((box, index) => {
                const roomRef = useRef<THREE.Group>(null)

                useFrame(() => {
                    if (roomRef.current) {
                        roomRef.current.rotation.y = -rotation.get()
                    }
                })

                return (
                    <Box 
                        key={box.id}
                        position={box.position}
                        onHover={() => {}}
                        gameState={gameState}
                        color={box.color}
                        isFocused={index === focusedIndex}
                    >
                        <group ref={roomRef}>
                            {box.child}
                        </group>
                    </Box>
                )
            })}

            </AnimatedGroup>
            <group position={[0, -1, 1.5]}>
                <Text
                    position={[-1, 0, 0]}
                    fontSize={0.3}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    onClick={rotateLeft}
                    onPointerOver={(e) => (e.object.scale.x = e.object.scale.y = 1.1)}
                    onPointerOut={(e) => (e.object.scale.x = e.object.scale.y = 1)}
                >
                    ← Left
                </Text>
                {/* <Text
                    position={[0, 0, 0]}
                    fontSize={0.3}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    onClick={onBack}
                    onPointerOver={(e) => (e.object.scale.x = e.object.scale.y = 1.1)}
                    onPointerOut={(e) => (e.object.scale.x = e.object.scale.y = 1)}
                >
                    Back
                </Text> */}
                <Text
                    position={[1, 0, 0]}
                    fontSize={0.3}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    onClick={rotateRight}
                    onPointerOver={(e) => (e.object.scale.x = e.object.scale.y = 1.1)}
                    onPointerOut={(e) => (e.object.scale.x = e.object.scale.y = 1)}
                >
                    Right →
                </Text>
            </group>
        </group>
    )
}