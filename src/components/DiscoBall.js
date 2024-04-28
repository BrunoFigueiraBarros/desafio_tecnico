import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

let globalMixer;



const DiscoBall = (props) => {
    const gltf = useGLTF("/assets/animated_disco_ball_-_low_poly.glb");
    const mixer = useRef(globalMixer);

    const { opacity } = props;

  
    if (!globalMixer) {
        globalMixer = new THREE.AnimationMixer(gltf.scene);
        mixer.current = globalMixer;
    }

    gltf.scene.position.set(0, 100, -1700);
    gltf.scene.scale.set(100, 100, 100);

    useEffect(() => {
        gltf.scene.traverse((child) => {
            if (child.isMesh) {
                child.material.transparent = true;
                child.material.opacity = opacity; 
            }
        });

        const action = mixer.current.clipAction(gltf.animations[0]);
        action.play();


      
    }, [gltf,opacity]);

    useFrame((state, delta) => mixer.current.update(delta));

    return <primitive object={gltf.scene} />;
};

export default DiscoBall;
