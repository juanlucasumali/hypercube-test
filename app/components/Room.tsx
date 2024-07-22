import React from 'react'
import { Physics } from '@react-three/cannon'
import Floor from './Floor'
import { Table } from './Furniture'
import { Guy } from './Guy'
import { Text } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

interface RoomProps {
  color: string
  gltf: string
  inRoom: boolean
}

const bold = { font: '/joystix.monospace-regular.otf', fontSize: 2.3, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false }
const regular = { font: '/joystix.monospace-regular.otf', fontSize: 2.5, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false }

export default function Room({ color, gltf, inRoom }: RoomProps) {
  const { camera } = useThree()
  const inPosition = camera.position.z == -3
  return (
    <group>
      <color attach="background" args={['#171720']} />
      <fog attach="fog" args={['#171720', 60, 90]} />
      <ambientLight intensity={0.9} />
      {/* <pointLight position={[-20, -5, -20]} color="red" /> */}
      <Physics allowSleep={false} iterations={15} gravity={[0, -200, 0]}>
        <group position={[0, 0, -10]}>
            <Text 
                position={[-5, 1.5, 5]}
                rotation={[0, 0.2, 0]}
                color="black" 
                anchorX="center" 
                anchorY="middle"
                scale={[0.5, 0.5, 0.5]}
                {...bold}
            >
                {inPosition && `HI THERE!`}
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
