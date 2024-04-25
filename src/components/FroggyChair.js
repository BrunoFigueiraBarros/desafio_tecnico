import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';


let globalMixer;

const createMixer = (scene) => {
    if (!globalMixer) {
        globalMixer = new THREE.AnimationMixer(scene);
    }
    return globalMixer;
};

const FroggyChair = () => {
    const gltf = useGLTF("/assets/froggy_chair.glb");
    const mixer = useRef(createMixer(gltf.scene));

    gltf.scene.position.set(0, -30, -250);
    gltf.scene.scale.set(100, 100, 100);

  

    return <primitive object={gltf.scene} />;
};

export default FroggyChair;
