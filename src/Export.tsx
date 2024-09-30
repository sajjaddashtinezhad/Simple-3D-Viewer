import React from 'react';
import { exportAsPNG } from './ThreeDScene'; // Adjust the path as necessary
import * as THREE from 'three';

interface ExportProps {
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    backgroundColor: number;
  }

const Export: React.FC<ExportProps> = ({ renderer, scene, camera, backgroundColor }) => {
    return (
        <button className='bg-black text-gray-50 text-lg flex h-12 items-center w-full justify-center rounded-md hover:bg-gray-800 duration-200'
        onClick={() => exportAsPNG(renderer, scene, camera, backgroundColor)}
       >
            Export to Figma
        </button>
    );
};

export default Export;