import * as THREE from 'three'
import React, { forwardRef, ReactNode } from 'react'
import { RoundedBox } from '@react-three/drei'
import { MeshStandardMaterialProps } from '@react-three/fiber'

interface BlockProps {
  children?: ReactNode
  transparent?: boolean
  opacity?: number
  color?: MeshStandardMaterialProps['color']
  args?: [number, number, number]
  [key: string]: any // for other props that might be passed
}

export const Block = forwardRef<THREE.Mesh, BlockProps>(({ 
  children, 
  transparent = false, 
  opacity = 1, 
  color = 'white', 
  args = [1, 1, 1], 
  ...props 
}, ref) => {
  return (
    <RoundedBox args={args} receiveShadow castShadow ref={ref} {...props}>
      <meshStandardMaterial color={color} transparent={transparent} opacity={opacity} />
      {children}
    </RoundedBox>
  )
})

Block.displayName = 'Block'
