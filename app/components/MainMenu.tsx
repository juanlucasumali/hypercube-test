'use client'

import React, { useState, useMemo, useEffect, useRef } from 'react'
import { Gltf, Text } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'
import Box from './Box'
import Room from './Room'
interface BoxData {
    id: string
    hoverText: string
    child?: React.ReactNode
    color?: string
    boxColor?: string
    roomColor?: string
    roomScene?: string
  }
  
  interface MainMenuProps {
  }
  
  const dummyBoxData: BoxData[] = [
      { id: 'mysterious', hoverText: 'Blue', boxColor: "#e4cdac", roomColor: 'black', roomScene: 'fiesta_tea-transformed.glb' },
      { id: 'oranges1', hoverText: 'Orange', color: "#e4cdac", child: <Gltf src="still_life_based_on_heathers_artwork-transformed.glb" scale={2} position={[0, -0.8, -4]} /> },
      { id: 'teapot1', hoverText: 'Blue', color: "#e4cdac", child: <Gltf src="fiesta_tea-transformed.glb" position={[0, -2, -3]} /> },
      { id: 'cucumber1', hoverText: 'Green', color: "#e4cdac", child: <Gltf src="pickles_3d_version_of_hyuna_lees_illustration-transformed.glb" scale={8} position={[0, -0.7, -2]} /> },
      { id: 'oranges2', hoverText: 'Orange', color: "#e4cdac", child: <Gltf src="still_life_based_on_heathers_artwork-transformed.glb" scale={2} position={[0, -0.8, -4]} /> },
      { id: 'teapot2', hoverText: 'Blue', color: "#e4cdac", child: <Gltf src="fiesta_tea-transformed.glb" position={[0, -2, -3]} /> },
      { id: 'cucumber3', hoverText: 'Green', color: "#e4cdac", child: <Gltf src="pickles_3d_version_of_hyuna_lees_illustration-transformed.glb" scale={8} position={[0, -0.7, -2]} /> },
  ]
const AnimatedGroup = animated.group

export default function MainMenu({ }: MainMenuProps) {
    const [text, setText] = useState('')
    const [rotationIndex, setRotationIndex] = useState(0)
    const [focusedIndex, setFocusedIndex] = useState(0)

    const boxCount = dummyBoxData.length
    const angleStep = (2 * Math.PI) / boxCount

    const bold = { font: '/joystix.monospace-regular.otf', fontSize: 2.3, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false }
    const regular = { font: '/joystix.monospace-regular.otf', fontSize: 2.5, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false }

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
        const adjustedIndex = newFocusedIndex < 0 ? newFocusedIndex + boxCount : newFocusedIndex
        setFocusedIndex(adjustedIndex)
        setText(dummyBoxData[adjustedIndex].hoverText)
    }, [rotationIndex, boxCount])
    
    return (
        <group position={[0, 0, -3]} rotation={[0, 0, 0]}>
            <Text 
                position={[0, 3, 0]}
                color="black" 
                anchorX="center" 
                anchorY="middle"
                scale={[0.5, 0.5, 0.5]}
                {...bold}
            >
                CONSIDER THIS:
            </Text>
            <AnimatedGroup rotation-y={rotation} position={[0, 0, 3]}>
            {boxesWithPositions.map((box, index) => {
                return (
                    <Box 
                        key={box.id}
                        id={box.id}
                        position={box.position}
                        onHover={() => {}}
                        color={box.color}
                        child={box.child}
                        boxColor={box.boxColor}
                        isFocused={index === focusedIndex}
                        rotation={rotation}
                        roomColor={box.roomColor}
                        roomScene={box.roomScene}
                    />
                )
            })}

            </AnimatedGroup>
            <group position={[0, -1, 1.5]}>
                <Text
                    position={[-0.9, -0.05, 0]}
                    scale={[0.1, 0.1, 0.1]}
                    color="black"
                    anchorX="center"
                    anchorY="middle"
                    onClick={rotateLeft}
                    onPointerOver={(e) => (e.object.scale.x = e.object.scale.y = 0.2)}
                    onPointerOut={(e) => (e.object.scale.x = e.object.scale.y = 0.1)}
                    {...regular}
                >
                    {`←`}
                </Text>
                <Text 
                    position={[0, 0.3, 0.5]}
                    scale={[0.08, 0.08, 0.08]}
                    color={text} 
                    anchorX="center" 
                    anchorY="middle"
                    {...bold}
                >
                    {text}
                </Text>
                <Text
                    position={[0.9, -0.05, 0]}
                    scale={[0.1, 0.1, 0.1]}
                    color="black"
                    anchorX="center"
                    anchorY="middle"
                    onClick={rotateRight}
                    onPointerOver={(e) => (e.object.scale.x = e.object.scale.y = 0.2)}
                    onPointerOut={(e) => (e.object.scale.x = e.object.scale.y = 0.1)}
                    {...regular}
                >
                    {`→`}
                </Text>
            </group>
        </group>
    )
}