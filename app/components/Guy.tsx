import React, { createContext, useContext, useRef, ReactNode } from 'react'
import { useFrame } from '@react-three/fiber'
import { useBox, useConeTwistConstraint } from '@react-three/cannon'
import { createRagdoll } from '../helpers/createRagdoll'
import { Block } from './Block'
import * as THREE from 'three'


const { shapes, joints } = createRagdoll(5.5, Math.PI / 16, Math.PI / 16, 0)
const context = createContext<React.RefObject<THREE.Object3D> | null>(null)

interface BodyPartProps {
  config?: any
  children?: ReactNode
  render?: ReactNode
  name: keyof typeof shapes
  [key: string]: any
}

interface Shape {
  color: string
  args: [number, number, number]
  mass: number
  position: [number, number, number]
}

const BodyPart: React.FC<BodyPartProps> = ({ config, children, render, name, ...props }) => {
    const { color, args, mass, position } = shapes[name] as Shape
    const parent = useContext(context)
    const ref = useRef<THREE.Mesh>(null)
    const [, api] = useBox(() => ({ mass, args, position, linearDamping: 0.99, ...props }), ref)
    
    useConeTwistConstraint(ref, parent || undefined, config)
    
    return (
      <context.Provider value={ref}>
        <Block castShadow receiveShadow ref={ref} {...props} scale={args} name={name} color={color}>
          {render}
        </Block>
        {children}
      </context.Provider>
    )
  }
  
function Face() {
const mouth = useRef<THREE.Mesh>(null)
const eyes = useRef<THREE.Group>(null)
useFrame((state) => {
    if (eyes.current) eyes.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1
    if (mouth.current) mouth.current.scale.y = (1 + Math.sin(state.clock.elapsedTime * 2)) * 0.6
})
return (
    <>
    <group ref={eyes}>
        <Block position={[-0.3, 0.1, 0.5]} args={[0.2, 0.1, 0.1]} color="black" transparent opacity={0.8} />
        <Block position={[0.3, 0.1, 0.5]} args={[0.2, 0.1, 0.1]} color="black" transparent opacity={0.8} />
    </group>
    <Block ref={mouth} position={[0, -0.2, 0.5]} args={[0.3, 0.05, 0.1]} color="#700000" transparent opacity={0.8} />
    </>
)
}

interface GuyProps {
  [key: string]: any
}

export const Guy: React.FC<GuyProps> = (props) => {
  return (
    <BodyPart name="upperBody" {...props}>
      <BodyPart {...props} name="head" config={joints['neckJoint']} render={<Face />} />
      {/* <BodyPart {...props} name="upperLeftArm" config={joints['leftShoulder']}>
        <BodyPart {...props} name="lowerLeftArm" config={joints['leftElbowJoint']} />
      </BodyPart> */}
      {/* <BodyPart {...props} name="upperRightArm" config={joints['rightShoulder']}>
        <BodyPart {...props} name="lowerRightArm" config={joints['rightElbowJoint']} />
      </BodyPart> */}
      {/* <BodyPart {...props} name="pelvis" config={joints['spineJoint']}>
        <BodyPart {...props} name="upperLeftLeg" config={joints['leftHipJoint']}>
          <BodyPart {...props} name="lowerLeftLeg" config={joints['leftKneeJoint']} />
        </BodyPart>
        <BodyPart {...props} name="upperRightLeg" config={joints['rightHipJoint']}>
          <BodyPart {...props} name="lowerRightLeg" config={joints['rightKneeJoint']} />
        </BodyPart>
      </BodyPart> */}
    </BodyPart>
  )
}
