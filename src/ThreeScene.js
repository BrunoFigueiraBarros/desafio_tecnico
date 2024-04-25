import React from 'react';
import { Canvas, useLoader } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';

function ThreeScene() {
  const gltf = useLoader(GLTFLoader, '/assets/RobotExpressive.glb');

  return (
    <div className="canvas-container">
      <Canvas className="canvas">
        <ambientLight intensity={0.5} />
        <directionalLight color="white" position={[0, 3, 5]} />
        <OrbitControls />
        <primitive object={gltf.scene} position={[0, -1, 0]} />
      </Canvas>
    </div>
  );
}

export default ThreeScene;
