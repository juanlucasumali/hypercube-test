import React, { useRef, useEffect, useState } from 'react'
import { useThree, createPortal, useFrame } from '@react-three/fiber'
import { Text, Html } from '@react-three/drei'
import * as THREE from 'three'
import { useAppContext } from '../contexts/AppContext'

const HUD: React.FC = () => {
  const { size, gl } = useThree()
  const virtualScene = useRef(new THREE.Scene()).current
  const virtualCamera = useRef(new THREE.OrthographicCamera(-size.width / 2, size.width / 2, size.height / 2, -size.height / 2, 0.1, 1000))
  
  const [showInput, setShowInput] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [storedValue, setStoredValue] = useState('')
  const { sendMessageToGroq, inRoom } = useAppContext();

  useEffect(() => {
    virtualCamera.current.position.z = 10
    virtualCamera.current.lookAt(0, 0, 0)

    const handleKeyPress = (event: KeyboardEvent) => {
      if (inRoom) {
        console.log("inRoom!",inRoom)
        if (event.key === 'c' || event.key === 'C') {
          setShowInput(true)
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [inRoom])

  useFrame(() => {
    gl.autoClear = false
    gl.clearDepth()
    gl.render(virtualScene, virtualCamera.current)
  }, 10)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleInputSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setStoredValue(inputValue)
      sendMessageToGroq(inputValue)
      setInputValue('')
      setShowInput(false)
    }
  }

  if (!inRoom) {
    return null;
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
        {!showInput ? `Press [C] to chat.` : `Press [RETURN] when done!` }
      </Text>
      {showInput && (
        <Html position={[0, 0, -3]}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleInputSubmit}
            autoFocus
            style={{ fontSize: '20px', padding: '5px'}}
          />
        </Html>
      )}
      {/* <Text
        position={[0, -50, 0]}
        fontSize={20}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        You said: "{storedValue}"
      </Text> */}
    </>,
    virtualScene
  )
}

export default HUD
