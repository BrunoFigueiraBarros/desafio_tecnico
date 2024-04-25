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
    // State
    const [playAnimation, setPlayAnimation] = useState(false);
    const [expression, setExpression] = useState(null);
    const [selectedAnimation, setSelectedAnimation] = useState(null);
    const [showDiscoBall, setShowDiscoBall] = useState(false);
    const [showTrack, setShowTrack] = useState(false);
    const [showChair, setShowChair] = useState(false);
    const [hdrFile, setHdrFile] = useState('/assets/lilienstein_1k.hdr');
    const [cameraPosition, setCameraPosition] = useState([1000, 1000, 1000]);
    const controlsRef = useRef(null);
    const [ambientLightIntensity, setAmbientLightIntensity] = useState(0.6);
    const [environmentIntensity, setEnvironmentIntensity] = useState(0.3);
    const [directionalLightPosition, setDirectionalLightPosition] = useState([2000, 2000, 2000]);
    const [pointLightPosition, setPointLightPosition] = useState([10, 10, 10]);

    // Handlers
    const handleExpressionButtonClick = (expr) => {
        setExpression(expr);
    };

    const handleAnimationSelection = (animationIndex) => {
        setSelectedAnimation(animationIndex);

        switch (animationIndex) {
            case 0:
                setHdrFile('/assets/dancing_hall_1k.hdr');
                updateCameraPosition(controlsRef.current, [-1000, 1000, 2000]);
                setDirectionalLightPosition([1500, 1500, 1500]);
                setPointLightPosition([20, 20, 20]);
                setEnvironmentIntensity(1);
                break;
            case 6:
                setHdrFile('/assets/leibstadt_1k.hdr');
                updateCameraPosition(controlsRef.current, [1000, 1000, 2000]);
                setDirectionalLightPosition([2200, 2200, 2200]);
                setPointLightPosition([5, 5, 5]);
                setEnvironmentIntensity(0);
                break;
            case 7:
                setHdrFile('/assets/hochsal_field_1k.hdr');
                updateCameraPosition(controlsRef.current, [-1000, 1000, 1000]);
                setDirectionalLightPosition([0, 0, 0]);
                setPointLightPosition([0, 0, 0]);
                setEnvironmentIntensity(0);
                break;
            default:
                setHdrFile('/assets/lilienstein_1k.hdr');
                updateCameraPosition(controlsRef.current, [1000, 1000, 1000]);
                setDirectionalLightPosition([2000, 2000, 2000]);
                setPointLightPosition([10, 10, 10]);
                setEnvironmentIntensity(0.3);
                break;
        }
    };

    // Effects
    useEffect(() => {
        if (selectedAnimation === 0) {
            const checkModel = () => {
                setShowDiscoBall(true);
                setShowTrack(false);
                setShowChair(false);
                clearInterval(intervalId);
            };
            const intervalId = setInterval(checkModel, 1);
        } else if (selectedAnimation === 6) {
            const checkModel = () => {
                setShowTrack(true);
                setShowDiscoBall(false);
                setShowChair(false);
                clearInterval(intervalId);
            };
            const intervalId = setInterval(checkModel, 1);
        } else if (selectedAnimation === 7) {
            const checkModel = () => {
                setShowTrack(false);
                setShowDiscoBall(false);
                setShowChair(true);
                clearInterval(intervalId);
            };
            const intervalId = setInterval(checkModel, 1);
        } else {
            const checkModel = () => {
                setShowDiscoBall(false);
                setShowTrack(false);
                setShowChair(false);
                clearInterval(intervalId);
            };
            const intervalId = setInterval(checkModel, 1);
        }
    }, [selectedAnimation]);

    // Helper Functions
    const updateCameraPosition = (controls, newPosition) => {
        controls.target.set(0, 0, 0);
        controls.object.position.set(newPosition[0], newPosition[1], newPosition[2]);
        controls.update();
    };

    return (
        <div>
            <Canvas camera={{ position: cameraPosition, fov: 75, near: 1, far: 5000 }} style={{ backgroundColor: "white", position: "relative", width: "100%", height: "100vh" }}>
                {/* Lights and Environment */}
                <directionalLight position={directionalLightPosition} intensity={1} color="white" />
                <pointLight position={pointLightPosition} intensity={0.6} />
                <ambientLight intensity={ambientLightIntensity} />
                <directionalLight color="white" position={[0, 3, 5]} />
                <Environment background={true} files={[hdrFile]} environmentIntensity={environmentIntensity} />
                
                {/* Models and Controls */}
                <Suspense fallback={null}>
                    <Model playAnimation={playAnimation} expression={expression} selectedAnimation={selectedAnimation} />
                    {showDiscoBall && <DiscoBall />}
                    {showTrack && <ModularTrack />}
                    {showChair && <FroggyChair />}
                </Suspense>
                <OrbitControls ref={controlsRef} />
            </Canvas>
            
            {/* Menu */}
            <Menu
                handleExpressionButtonClick={handleExpressionButtonClick}
                handleAnimationSelection={handleAnimationSelection}
            />
        </div>
    );
};

export default ThreeScene;