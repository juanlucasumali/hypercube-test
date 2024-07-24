import React, { useRef, useEffect } from 'react'
import { useThree, createPortal, useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import { useAppContext } from '../contexts/AppContext'

const HUD: React.FC = () => {
  const { size, gl } = useThree()
  const virtualScene = useRef(new THREE.Scene()).current
  const virtualCamera = useRef(new THREE.OrthographicCamera(-size.width / 2, size.width / 2, size.height / 2, -size.height / 2, 0.1, 1000))
  
  const { isRecording, startRecording, stopRecording, transcription, inRoom } = useAppContext()

  useEffect(() => {
    virtualCamera.current.position.z = 10
    virtualCamera.current.lookAt(0, 0, 0)

    const handleKeyPress = async (event: KeyboardEvent) => {
      if (inRoom && event.code === 'Space') {
        event.preventDefault()
        if (!isRecording) {
          await startRecording()
        } else {
          await stopRecording()
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [inRoom, isRecording, startRecording, stopRecording])

  useFrame(() => {
    gl.autoClear = false
    gl.clearDepth()
    gl.render(virtualScene, virtualCamera.current)
  }, 10)

  if (!inRoom) {
    return null
  }

  return createPortal(
    <>
      <Text
        position={[0, 50, 0]}
        fontSize={20}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {!isRecording ? `Press [SPACE] to start speaking.` : `Press [SPACE] to stop speaking.` }
      </Text>
      <Text
        position={[0, -50, 0]}
        fontSize={20}
        color="black"
        anchorX="center"
        anchorY="middle"
        maxWidth={300}
        textAlign="center"
      >
        {transcription || "Your speech will appear here..."}
      </Text>
    </>,
    virtualScene
  )
}

export default HUD