import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Menu from './Menu';

interface ThreeDSceneProps {
  fileData: string;
  fileName: string | null;
}



const ThreeDScene = ({ fileData, fileName }: ThreeDSceneProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);
  const [backgroundColor, setBackgroundColor] = useState<number>(0xE5E7EB); // Default color

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Create a scene
    const scene = new THREE.Scene();
    setScene(scene);

    // Create a camera
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.005, 1000);
    camera.position.z = 5;
    setCamera(camera);

    // Create a renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(backgroundColor); // Use backgroundColor state
    mount.appendChild(renderer.domElement);
    setRenderer(renderer);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // White directional light
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Initialize OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Enable damping (inertia)
    controls.dampingFactor = 0.25; // Damping factor
    controls.screenSpacePanning = false; // Do not allow panning in screen space

    // Load the 3D object
    const loadModel = () => {
      if (!fileName) {
        const error = 'No file name provided';
        console.error(error);
        setErrorMessage(error);
        setTimeout(() => setErrorMessage(null), 2000);
        return;
      }

      console.log('Loading model with fileData:', fileData);
      const fileExtension = fileName.split('.').pop()?.toLowerCase();
      console.log('File extension:', fileExtension);
      if (fileExtension === 'fbx') {
        const loader = new FBXLoader();
        loader.load(fileData, (object) => {
          console.log('FBX object loaded:', object);
          object.scale.set(0.01, 0.01, 0.01); // Scale down the object
          object.position.set(0, 0, 0); // Center the object
          scene.add(object);
        }, undefined, (error) => {
          const errorMsg = 'Error loading FBX object';
          console.error(errorMsg, error);
          setErrorMessage(errorMsg);
          setTimeout(() => setErrorMessage(null), 4000);
        });
      } else if (fileExtension === 'obj') {
        const loader = new OBJLoader();
        loader.load(fileData, (object) => {
          console.log('OBJ object loaded:', object);
          object.scale.set(0.01, 0.01, 0.01); // Scale down the object
          object.position.set(0, 0, 0); // Center the object
          scene.add(object);
        }, undefined, (error) => {
          const errorMsg = 'Error loading OBJ object';
          console.error(errorMsg, error);
          setErrorMessage(errorMsg);
          setTimeout(() => setErrorMessage(null), 4000);
        });
      } else {
        const error = `Unsupported file extension: ${fileExtension}`;
        console.error(error);
        setErrorMessage(error);
        setTimeout(() => setErrorMessage(null), 4000);
      }
    };

    loadModel();

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update(); // Update controls
      renderer.render(scene, camera);
    };

    // ThreeDScene.tsx
    

    animate();

    // Cleanup on unmount
    return () => {
      mount.removeChild(renderer.domElement);
      controls.dispose(); // Dispose of controls
    };
  }, [fileData, fileName]);

  return (
    <div>
      {errorMessage && (
      <div style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: 'red', color: 'white', padding: '5px', borderRadius: '3px' }}>
        {errorMessage}
      </div>
      )}

      {renderer && scene && camera && (
        <Menu renderer={renderer} scene={scene} camera={camera} backgroundColor={backgroundColor} setBackgroundColor={setBackgroundColor}/>
      )}


      <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />
    </div>
  );
};


export const exportAsPNG = (renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera, backgroundColor: number) => {
    // Create a new renderer with antialiasing enabled
    const exportRenderer = new THREE.WebGLRenderer({ antialias: true });
  
    // Set a higher resolution for the export renderer
    const width = renderer.domElement.width * 2; // Double the width
    const height = renderer.domElement.height * 2; // Double the height
    exportRenderer.setSize(width, height);
    exportRenderer.setPixelRatio(2); // Set pixel ratio for better quality
    exportRenderer.setClearColor(backgroundColor);

    // Render the scene with the current camera position using the export renderer
    exportRenderer.render(scene, camera);

  // Convert the canvas content to a data URL
  const dataURL = exportRenderer.domElement.toDataURL('image/png');

    // Send the data URL to the Figma plugin
    parent.postMessage({ pluginMessage: { type: 'create-image', dataURL } }, '*');

      // Dispose of the export renderer
  exportRenderer.dispose();
};
export default ThreeDScene;