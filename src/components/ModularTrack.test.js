import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import ModularTrack from './ModularTrack';


jest.mock('@react-three/drei', () => ({
  useGLTF: jest.fn(),
}));


const mockGLTF = {
  scene: new THREE.Object3D(),
};

beforeEach(() => {
  useGLTF.mockReturnValue(mockGLTF);
});

test('renders ModularTrack component', () => {
  render(<ModularTrack />);
  
 
  expect(useGLTF).toHaveBeenCalledWith("/assets/modular_track_roads_free.glb");
});

test('ModularTrack component sets correct scale, position, and rotation', () => {
  render(<ModularTrack />);
  

  expect(mockGLTF.scene.scale.x).toBe(200);
  expect(mockGLTF.scene.scale.y).toBe(200);
  expect(mockGLTF.scene.scale.z).toBe(200);


  expect(mockGLTF.scene.position.x).toBe(3000);
  expect(mockGLTF.scene.position.y).toBe(0);
  expect(mockGLTF.scene.position.z).toBe(-2000);


  expect(mockGLTF.scene.rotation.x).toBe(0);
  expect(mockGLTF.scene.rotation.y).toBe(4.8);
  expect(mockGLTF.scene.rotation.z).toBe(0);
});
