'use client';

import { useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { EffectComposer, Pixelation } from '@react-three/postprocessing'
import { useAppContext } from '../contexts/AppContext';

const MOUSE_PEEK = 1;

export default function Camera() {
  const { camera, gl } = useThree()
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [canvasHeight, setCanvasHeight] = useState(gl.domElement.height)
  const { inRoom } = useAppContext();

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
    if (canvasHeight != gl.domElement.height) {
      setCanvasHeight(gl.domElement.height)
    }

    // TODO: Smooth transition into exiting and entering room, and also do a delayed instead of immediate response
    if (inRoom) {
    // camera.rotation.y = -THREE.MathUtils.lerp(camera.rotation.y, rotation.y, MOUSE_PEEK)
    // camera.rotation.x = -THREE.MathUtils.lerp(camera.rotation.x, rotation.x, MOUSE_PEEK)
    }

    
  })

  return (
    <EffectComposer>
      <Pixelation granularity={canvasHeight / 165.8} />
    </EffectComposer>
  )
}

// const CAMERA_LERP_FACTOR = 0.05; // Adjust this value to control the speed of camera movement

// let targetRotationY = 0;
// let targetRotationX = 0;

// function updateCamera() {
//   if (inRoom) {
//     if (isEntering) {
//       // Keep the camera at the center of the screen
//       camera.rotation.y = 0;
//       camera.rotation.x = 0;
//     } else if (isExiting) {
//       // Gradually move the camera to the center of the screen
//       targetRotationY = 0;
//       targetRotationX = 0;
      
//       camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, targetRotationY, CAMERA_LERP_FACTOR);
//       camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, targetRotationX, CAMERA_LERP_FACTOR);
//     } else {
//       // Normal camera behavior (you can uncomment and adjust as needed)
//       // camera.rotation.y = -THREE.MathUtils.lerp(camera.rotation.y, rotation.y, MOUSE_PEEK);
//       // camera.rotation.x = -THREE.MathUtils.lerp(camera.rotation.x, rotation.x, MOUSE_PEEK);
//     }
//   }
// }

// // Call this function in your animation loop
// function animate() {
//   requestAnimationFrame(animate);
  
//   updateCamera();
  
//   // Other animation code...
  
//   renderer.render(scene, camera);
// }

// animate();
