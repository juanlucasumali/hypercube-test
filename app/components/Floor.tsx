import React from 'react';
import { usePlane } from "@react-three/cannon";
import { MeshReflectorMaterial } from '@react-three/drei';
import { PlaneProps } from '@react-three/cannon';
import { Mesh } from 'three';

interface FloorProps extends Partial<PlaneProps> {
    color: string
}

export default function Floor(props: FloorProps) {
    const [ref] = usePlane<Mesh>(() => ({ type: 'Static', ...props }));
    
    return (
      <mesh ref={ref} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          color={props.color}
          blur={[400, 400]}
          resolution={1024}
          mixBlur={1}
          mixStrength={3}
          depthScale={1}
          minDepthThreshold={0.85}
          metalness={0}
          roughness={1}
          mirror={0}
        />
      </mesh>
    );
}
