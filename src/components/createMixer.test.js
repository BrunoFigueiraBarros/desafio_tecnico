import React, { useEffect } from 'react';
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


const useEffectMock = jest.spyOn(React, 'useEffect');

beforeEach(() => {
  useGLTF.mockReturnValue(mockGLTF);
});

test('useEffect is called with the correct dependencies', () => {
  const { unmount } = render(<ModularTrack />);
  

  expect(useEffectMock).toHaveBeenCalled();

  unmount();


  expect(useEffectMock).toHaveBeenLastCalledWith(expect.any(Function), [mockGLTF]);
});
