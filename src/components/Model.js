import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';


let globalMixer;

const createMixer = (scene) => {
    if (!globalMixer) {
        globalMixer = new THREE.AnimationMixer(scene);
    }
    return globalMixer;
};

const Model = ({ playAnimation, expression, selectedAnimation }) => {
    const gltf = useGLTF("/assets/RobotExpressive.glb");
    const mixer = useRef(createMixer(gltf.scene));

    gltf.scene.scale.set(200, 200, 200);

    useEffect(() => {
        gltf.scene.traverse((child) => {
            if (child.name === 'Head_4') {
                child.morphTargetInfluences.forEach((_, index) => {
                    child.morphTargetInfluences[index] = 0;
                });

                switch (expression) {
                    case 'NEUTRA':
                        break;
                    case 'ANGRY':
                        child.morphTargetInfluences[0] = 1;
                        break;
                    case 'SURPRISED':
                        child.morphTargetInfluences[1] = 1.5;
                        break;
                    case 'SAD':
                        child.morphTargetInfluences[2] = 1;
                        break;
                    default:
                        break;
                }
            }
        });
    }, [gltf.scene, expression]);

    useFrame((state, delta) => mixer.current.update(delta));

    useEffect(() => {
        const action = mixer.current.clipAction(gltf.animations[10]);
        action.play();

        if (playAnimation) {
            action.stop();
            const newAction = mixer.current.clipAction(gltf.animations[0]);
            newAction.play();
        }

        const Newaction0 = mixer.current.clipAction(gltf.animations[0]);
        const Newaction1 = mixer.current.clipAction(gltf.animations[6]);
        const Newaction7 = mixer.current.clipAction(gltf.animations[7]);
        switch (selectedAnimation) {
            case 0:
                mixer.current.timeScale = 1;
                action.stop();
                Newaction0.stop();
                Newaction1.stop();
                Newaction7.stop();
                Newaction0.play();
                break;
            case 6:
                mixer.current.timeScale = 1;
                action.stop();
                Newaction0.stop();
                Newaction1.stop();
                Newaction7.stop();
                Newaction1.play();
                break;
            case 7:
                action.stop();
                Newaction0.stop();
                Newaction1.stop();
                Newaction7.stop();
                Newaction7.play();
                mixer.current.timeScale = 0.6;
                const checkAnimationTime = () => {
                    if (Newaction7.time >= 0.30321343267709167) {
                        console.log(Newaction7.time);
                        Newaction7.paused = true;
                        clearInterval(intervalId);
                    }
                };
                const intervalId = setInterval(checkAnimationTime, 10);

                break;
            case 10:
                mixer.current.timeScale = 1;
                Newaction0.stop();
                Newaction1.stop();
                Newaction7.stop();
                action.play();
                break;
            default:
                break;
        }

    }, [playAnimation, selectedAnimation]);

    return <primitive object={gltf.scene} />;
};

export default Model;
