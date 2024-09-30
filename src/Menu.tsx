import React, { useState } from 'react';
import Guide from './Guide';
//import Back from './Back';
import Setting from './Setting';
import Export from './Export';
import * as THREE from 'three';

interface MenuProps {
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    backgroundColor: number;
    setBackgroundColor: (color: number) => void;
  }


const Menu: React.FC<MenuProps> = ({ renderer, scene, camera, backgroundColor, setBackgroundColor }) => {

    const [showSetting, setShowSetting] = useState(false);
    const [showGuide, setShowGuide] = useState(false);

    const toggleSetting = () => {
        setShowSetting(prevState => !prevState);
        if (showGuide) setShowGuide(false); // Close guide if open
    };

    const toggleGuide = () => {
        setShowGuide(prevState => !prevState);
        if (showSetting) setShowSetting(false); // Close setting if open
    };

    return (

        <div className='w-full flex absolute justify-end bottom-0 left-0 p-4'>
            <div className='gap-2 flex w-80'>
            <Guide showGuide={showGuide} toggleGuide={toggleGuide} />
            <Setting showSetting={showSetting} toggleSetting={toggleSetting} backgroundColor={backgroundColor} setBackgroundColor={setBackgroundColor} />
            <Export renderer={renderer} scene={scene} camera={camera} backgroundColor={backgroundColor}/>
            </div>
        </div>

    );
};

export default Menu;