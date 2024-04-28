import { useGLTF } from '@react-three/drei';

const FroggyChair = () => {
    const gltf = useGLTF("/assets/froggy_chair.glb");

    gltf.scene.position.set(0, -30, -250);
    gltf.scene.scale.set(100, 100, 100);

    return <primitive object={gltf.scene} />;
};

export default FroggyChair;
