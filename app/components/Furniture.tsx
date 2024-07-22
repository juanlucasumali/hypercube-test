import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { useGLTF, SpotLight } from '@react-three/drei'
import { useCompoundBody, useSphere, useCylinder, useDistanceConstraint, usePointToPointConstraint } from '@react-three/cannon'
import { GLTF } from 'three-stdlib'
import { Block } from '../helpers/Block'

type GLTFResult = GLTF & {
  nodes: {
    ['buffer-0-mesh-0']: THREE.Mesh
    ['buffer-0-mesh-0_1']: THREE.Mesh
  }
  materials: {
    default: THREE.Material
    Liquid: THREE.Material
  }
}

interface Props {
  [key: string]: any
}

export function Chair(props: Props) {
  const ref = useRef<THREE.Group>(null)
  const [, api] = useCompoundBody(() => ({
    mass: 24,
    linearDamping: 0.95,
    angularDamping: 0.95,
    shapes: [
      { type: 'Box', mass: 10, position: [0, 0, 0], args: [3.1, 3.1, 0.5] },
      { type: 'Box', mass: 10, position: [0, -1.75, 1.25], args: [3.1, 0.5, 3.1] },
      { type: 'Box', mass: 1, position: [5 + -6.25, -3.5, 0], args: [0.5, 3, 0.5] },
      { type: 'Box', mass: 1, position: [5 + -3.75, -3.5, 0], args: [0.5, 3, 0.5] },
      { type: 'Box', mass: 1, position: [5 + -6.25, -3.5, 2.5], args: [0.5, 3, 0.5] },
      { type: 'Box', mass: 1, position: [5 + -3.75, -3.5, 2.5], args: [0.5, 3, 0.5] }
    ],
    ...props
  }), ref)

  return (
    <group ref={ref}>
      <Block position={[0, 0, 0]} scale={[3.1, 3.1, 0.5]} />
      <Block position={[0, -1.75, 1.25]} scale={[3.1, 0.5, 3.1]} />
      <Block position={[5 + -6.25, -3.5, 0]} scale={[0.5, 3, 0.5]} />
      <Block position={[5 + -3.75, -3.5, 0]} scale={[0.5, 3, 0.5]} />
      <Block position={[5 + -6.25, -3.5, 2.5]} scale={[0.5, 3, 0.5]} />
      <Block position={[5 + -3.75, -3.5, 2.5]} scale={[0.5, 3, 0.5]} />
    </group>
  )
}
export function Table(props: Props) {
  const ref = useRef<THREE.Group>(null)
  const [, api] = useCompoundBody(() => ({
    mass: 54,
    linearDamping: 0.95,
    angularDamping: 0.95,
    shapes: [
      { type: 'Box', mass: 50, position: [0, 0, 0], args: [5, 0.5, 5] },
      { type: 'Box', mass: 1, position: [2, -2.25, 2], args: [0.5, 4, 0.5] },
      { type: 'Box', mass: 1, position: [-2, -2.25, -2], args: [0.5, 4, 0.5] },
      { type: 'Box', mass: 1, position: [-2, -2.25, 2], args: [0.5, 4, 0.5] },
      { type: 'Box', mass: 1, position: [2, -2.25, -2], args: [0.5, 4, 0.5] }
    ],
    ...props
  }), ref)

  return (
    <group ref={ref}>
      <Block scale={[5, 0.5, 5]} position={[0, 0, 0]} />
      <Block scale={[0.5, 4, 0.5]} position={[2, -2.25, 2]} />
      <Block scale={[0.5, 4, 0.5]} position={[-2, -2.25, -2]} />
      <Block scale={[0.5, 4, 0.5]} position={[-2, -2.25, 2]} />
      <Block scale={[0.5, 4, 0.5]} position={[2, -2.25, -2]} />
    </group>
  )
}