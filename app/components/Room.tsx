'use client'

import React, { useEffect, useState } from 'react'
import { Physics } from '@react-three/cannon'
import Floor from './Floor'
import { Table } from './Furniture'
import { Guy } from './Guy'
import { Text } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import Groq from 'groq-sdk'
import { AppContext, useAppContext } from '../contexts/AppContext'

interface RoomProps {
  roomId: string;
  color: string
  gltf: string
  inRoom: boolean
  isEntering: boolean
  isExiting: boolean
}

const bold = { font: '/joystix.monospace-regular.otf', fontSize: 2.3, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false }
const regular = { font: '/joystix.monospace-regular.otf', fontSize: 2.5, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false }

const groq = new Groq({ apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY, dangerouslyAllowBrowser: true });

async function getGroqChatCompletion() {
  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: "Hey! Tell me a joke in 4 words.",
        },
      ],
      model: "llama3-8b-8192",
    });
    console.log(response.choices[0]?.message?.content)
    return response.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Error fetching Groq response:", error);
    return "Failed to fetch response";
  }
}

export default function Room({ roomId, color, gltf, inRoom, isEntering, isExiting }: RoomProps) {
  const { setInRoom, setSelectedRoom } = useAppContext();
  const { camera } = useThree()
  const inPosition = camera.position.z === -3

  const [groqResponse, setGroqResponse] = useState("")

  useEffect(() => {
    if (inRoom) {
      setInRoom(true);
      setSelectedRoom(roomId);
    } else {
      setInRoom(false);
      setSelectedRoom('');
    }
  }, [inRoom]);


  // TODO: If chatting, guy's mouth moves
  useEffect(() => {
    if (isEntering) {
      getGroqChatCompletion().then(setGroqResponse);
    } else if (isExiting) {
      setGroqResponse('');
    }
  }, [isEntering, isExiting]);

  return (
    <group>
      <color attach="background" args={['#171720']} />
      <fog attach="fog" args={['#171720', 60, 90]} />
      <ambientLight intensity={0.9} />
      {/* <pointLight position={[-20, -5, -20]} color="red" /> */}
      <Physics allowSleep={false} iterations={15} gravity={[0, -200, 0]}>
        <group position={[0, 0, -10]}>
          <Text 
            position={[-5, 3, 5]}
            rotation={[0, 0.2, 0]}
            color="black" 
            anchorX="center" 
            anchorY="middle"
            scale={[0.5, 0.5, 0.5]}
            maxWidth={10}  // This sets the maximum width of the text block
            textAlign="left"  // This centers the text within its block
            {...bold}
        >
            {(isEntering || inPosition) && !isExiting ? groqResponse : ''}
        </Text>
          <group rotation={[0, 1, 0]} position={[-5, -11, 5]}>
            <Guy />
          </group>
          <group rotation={[0, -1, 0]} position={[5, -11, 5]}>
            <Guy torsoColor='#326ee1'/>
          </group>
          <Table />
        </group>
        <Floor color={"#878790"} position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      </Physics>
    </group>
  )
}
