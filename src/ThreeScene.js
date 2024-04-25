import * as React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useState, useRef, useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Model = ({ playAnimation }) => {
    const gltf = useGLTF("/assets/RobotExpressive.glb");
    const mixer = useRef();

   
    gltf.scene.scale.set(200, 200, 200);

 
    if (!mixer.current) {
        mixer.current = new THREE.AnimationMixer(gltf.scene);
        gltf.animations.forEach((animation) => {
            const action = mixer.current.clipAction(gltf.animations[1]);
            action.play();
        });
    }

    // Find the Head_4 object and change its position
    useEffect(() => {
        gltf.scene.traverse((child) => {
            if (child.name === 'Head_4') {
        
            //ANGRY
            // child.morphTargetInfluences[0] = 1;
            // child.morphTargetInfluences[1] = 0;
            // child.morphTargetInfluences[2] = -0;
   
             //SURPRISED   
            // child.morphTargetInfluences[0] = 0;
            // child.morphTargetInfluences[1] = 1.5;
            // child.morphTargetInfluences[2] = 1;

            //SAD
            child.morphTargetInfluences[0] = 0;
            child.morphTargetInfluences[1] = 0;
            child.morphTargetInfluences[2] = 1;
            }
        });
    }, [gltf.scene]);
    
    
  
    useFrame((state, delta) => mixer.current.update(delta));

  
    useEffect(() => {
        if (playAnimation) {
            mixer.current.timeScale = 1;
        } else {
            mixer.current.timeScale = 0;
        }
    }, [playAnimation]);

    return <primitive object={gltf.scene} />;
};

const Umbrella = () => {
    const [playAnimation, setPlayAnimation] = useState(false);

    const handleButtonClick = () => {
        setPlayAnimation(!playAnimation);
    };

    return (
        <div>
            <Canvas camera={{ position: [0, 0, 1000], fov: 75, near: 1, far: 5000 }} style={{ backgroundColor: "white", position: "relative", width: "100%", height: "90vh" }}>
                <directionalLight position={[2000, 2000, 2000]} intensity={1} color="white" />
                <pointLight position={[10, 10, 10]} intensity={0.6} />
                <ambientLight intensity={0.5} />
                <directionalLight color="white" position={[0, 3, 5]} />
                <Suspense fallback={null}>
                    <Model playAnimation={playAnimation} />
                </Suspense>
                <OrbitControls />
            </Canvas>
            <button onClick={handleButtonClick}>{playAnimation ? 'Pause Animation' : 'Play Animation'}</button>
        </div>
    );
};

export default Umbrella;
