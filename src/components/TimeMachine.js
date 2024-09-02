import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function TimeMachine({ onYearChange }) {
  const group = useRef();
  const gltf = useLoader(GLTFLoader, '/models/time_machine.glb');

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t / 4) / 2;
    group.current.position.y = Math.sin(t / 1.5) / 2;

    // שינוי שנה בהתאם לסיבוב
    const year = Math.floor(1960 + (t % 60));
    onYearChange(year);
  });

  return (
    <group ref={group}>
      <primitive object={gltf.scene} />
    </group>
  );
}

export default TimeMachine;