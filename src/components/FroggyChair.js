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

const FroggyChair = (props) => {
    const gltf = useGLTF("/assets/froggy_chair.glb");
    const mixer = useRef(createMixer(gltf.scene));
    const { opacity } = props;


    gltf.scene.position.set(0, -30, -250);
    gltf.scene.scale.set(100, 100, 100);

    useEffect(() => {
        gltf.scene.traverse((child) => {
            if (child.isMesh) {
                child.material.transparent = true;
                child.material.opacity = opacity;
            }
        });
    }, [gltf,opacity]);




    return <primitive object={gltf.scene} />;
};

export default FroggyChair;
