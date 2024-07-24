'use client';

import { useState, useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { EffectComposer, Pixelation } from '@react-three/postprocessing'
import { useAppContext } from '../contexts/AppContext';

const MOUSE_PEEK = 1;
const CAMERA_LERP_FACTOR = 0.1;

export default function Camera() {
  const { camera, gl } = useThree()
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [canvasHeight, setCanvasHeight] = useState(gl.domElement.height)
  const { inRoom, isExiting } = useAppContext();
  const prevInRoom = useRef(inRoom);
  const targetRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: any) => {
      const newRotation = {
        x: ((e.clientY / window.innerHeight) * 2 - 1) * Math.PI / 16,
        y: ((e.clientX / window.innerWidth) * 2 - 1) * Math.PI / 16
      };
      setRotation(newRotation);
      if (inRoom && !isExiting) {
        targetRotation.current = newRotation;
      }
    }

    window.addEventListener('mousemove', updateMousePosition)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [inRoom, isExiting])

  useFrame(() => {
    if (canvasHeight != gl.domElement.height) {
      setCanvasHeight(gl.domElement.height)
    }

    if (inRoom && !isExiting) {
      camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, -targetRotation.current.y, CAMERA_LERP_FACTOR);
      camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, -targetRotation.current.x, CAMERA_LERP_FACTOR);
    } else {
      // If not in room or exiting, gradually move camera back to center
      camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, 0, CAMERA_LERP_FACTOR);
      camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, 0, CAMERA_LERP_FACTOR);
      targetRotation.current = { x: 0, y: 0 };
    }

    // Update prevInRoom for the next frame
    prevInRoom.current = inRoom;
  })

  return (
    <EffectComposer>
      <Pixelation granularity={canvasHeight / 165.8} />
    </EffectComposer>
  )
}
