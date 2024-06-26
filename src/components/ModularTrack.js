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

const ModularTrack = (props) => {
    const gltf = useGLTF("/assets/modular_track_roads_free.glb");
    const mixer = useRef(createMixer(gltf.scene));
    gltf.scene.scale.set(200, 200, 200);
    gltf.scene.position.set(3000, 0, -2000);
    gltf.scene.rotation.set(0, 4.8, 0);

    const { opacity } = props;

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

export default ModularTrack;
