'use client'

import React from 'react'
import { useSpring, animated, config } from '@react-spring/three'

const AnimatedGroup = animated.group

interface RotatingGroupProps {
  gameState: string
  children: React.ReactNode
}

export default function RotatingGroup({ gameState, children }: RotatingGroupProps) {
  const { rotationY } = useSpring({
    rotationY: 
      gameState === 'title' ? 0 : 
      gameState === 'play' ? -Math.PI * 2/3 : 
      Math.PI * 2/3,
    config: config.molasses
  })

  return <AnimatedGroup rotation-y={rotationY}>{children}</AnimatedGroup>
}