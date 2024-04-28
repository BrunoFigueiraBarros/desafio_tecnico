import { useGLTF } from '@react-three/drei';

const ModularTrack = () => {
    const gltf = useGLTF("/assets/modular_track_roads_free.glb");

    gltf.scene.scale.set(200, 200, 200);
    gltf.scene.position.set(3000, 0, -2000);
    gltf.scene.rotation.set(0, 4.8, 0);

    return <primitive object={gltf.scene} />;
};

export default ModularTrack;
