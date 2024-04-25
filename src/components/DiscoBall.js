import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';


let globalMixer;

const DiscoBall = () => {
    const gltf = useGLTF("/assets/animated_disco_ball_-_low_poly.glb");
    const mixer = useRef(globalMixer);

    if (!globalMixer) {
        globalMixer = new THREE.AnimationMixer(gltf.scene);
        mixer.current = globalMixer;
    }

    gltf.scene.position.set(0, 100, -1700);
    gltf.scene.scale.set(100, 100, 100);

    useEffect(() => {
        gltf.scene.traverse((child) => {
            if (child.isMesh) {
                child.material.color.set(0xffffff);
            }
        });

        const action = mixer.current.clipAction(gltf.animations[0]);
        action.play();

        return () => {
            action.stop();
        };
    }, [gltf]);

    useFrame((state, delta) => mixer.current.update(delta));

    return <primitive object={gltf.scene} />;
};

export default DiscoBall;
