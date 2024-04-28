import * as React from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense, useState, useRef, useEffect } from 'react';
import { OrbitControls, Environment } from '@react-three/drei';

import DiscoBall from './components/DiscoBall';
import FroggyChair from './components/FroggyChair';
import ModularTrack from './components/ModularTrack';
import Model from './components/Model';
import Menu from './components/Menu';

const ThreeScene = () => {
   
    const [playAnimation, setPlayAnimation] = useState(false);
    const [expression, setExpression] = useState(null);
    const [selectedAnimation, setSelectedAnimation] = useState(null);
    const [showDiscoBall, setShowDiscoBall] = useState(0);
    const [showTrack, setShowTrack] = useState(0);
    const [showChair, setShowChair] = useState(0);
    const [hdrFile, setHdrFile] = useState('/assets/lilienstein_1k.hdr');
    const [cameraPosition, setCameraPosition] = useState([1000, 1000, 1000]);
    const controlsRef = useRef(null);
    const [ambientLightIntensity, setAmbientLightIntensity] = useState(0.6);
    const [environmentIntensity, setEnvironmentIntensity] = useState(0.3);
    const [directionalLightPosition, setDirectionalLightPosition] = useState([2000, 2000, 2000]);
    const [pointLightPosition, setPointLightPosition] = useState([10, 10, 10]);

 
    const handleExpressionButtonClick = (expr) => {
        setExpression(expr);
    };


  
    const handleAnimationSelection = (animationIndex) => {
        let newHdrFile = '/assets/lilienstein_1k.hdr';
        let newCameraPosition = [1000, 1000, 1000];
        let newDirectionalLightPosition = [2000, 2000, 2000];
        let newPointLightPosition = [10, 10, 10];
        let newEnvironmentIntensity = 0.3;
        setShowDiscoBall(0);
        setShowTrack(0);
        setShowChair(0);

        switch (animationIndex) {
            case 0:
                newHdrFile = '/assets/dancing_hall_1k.hdr';
                newCameraPosition = [-1000, 1000, 2000];
                newDirectionalLightPosition = [1500, 1500, 1500];
                newPointLightPosition = [20, 20, 20];
                newEnvironmentIntensity = 1;
                setShowDiscoBall(1);
                break;
            case 6:
                newHdrFile = '/assets/leibstadt_1k.hdr';
                newCameraPosition = [1000, 1000, 2000];
                newDirectionalLightPosition = [2200, 2200, 2200];
                newPointLightPosition = [5, 5, 5];
                newEnvironmentIntensity = 0;
                setShowTrack(1);
                break;
            case 7:
                newHdrFile = '/assets/hochsal_field_1k.hdr';
                newCameraPosition = [-1000, 1000, 1000];
                newDirectionalLightPosition = [0, 0, 0];
                newPointLightPosition = [0, 0, 0];
                newEnvironmentIntensity = 0;
                setShowChair(1);
                break;
            default:
         
                break;
        }

        setSelectedAnimation(animationIndex);
        setHdrFile(newHdrFile);
        updateCameraPosition(controlsRef.current, newCameraPosition);
        setDirectionalLightPosition(newDirectionalLightPosition);
        setPointLightPosition(newPointLightPosition);
        setEnvironmentIntensity(newEnvironmentIntensity);
    };





    const updateCameraPosition = (controls, newPosition) => {
        controls.target.set(0, 0, 0);
        controls.object.position.set(newPosition[0], newPosition[1], newPosition[2]);
        controls.update();
    };
    const opacityValue = 1;
    return (
        <div>
            <Canvas camera={{ position: cameraPosition, fov: 75, near: 1, far: 5000 }} style={{ backgroundColor: "white", position: "relative", width: "100%", height: "100vh" }}>
           
                <directionalLight position={directionalLightPosition} intensity={1} color="white" />
                <pointLight position={pointLightPosition} intensity={0.6} />
                <ambientLight intensity={ambientLightIntensity} />
                <directionalLight color="white" position={[0, 3, 5]} />
                <Environment background={true} files={[hdrFile]} environmentIntensity={environmentIntensity} />

            
                <Suspense fallback={null}>
                    <Model playAnimation={playAnimation} expression={expression} selectedAnimation={selectedAnimation} />
                    {console.log(showDiscoBall)}
                    <DiscoBall opacity={showDiscoBall} />
                    <ModularTrack opacity={showTrack} />
                    <FroggyChair opacity={showChair} />
                </Suspense>
                <OrbitControls ref={controlsRef} />
            </Canvas>

           
            <Menu
                handleExpressionButtonClick={handleExpressionButtonClick}
                handleAnimationSelection={handleAnimationSelection}
            />
        </div>
    );
};

export default ThreeScene;