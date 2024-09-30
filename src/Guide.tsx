import React from 'react';
import Guideicon from './assets/guide.svg';

interface GuideProps {
    showGuide: boolean;
    toggleGuide: () => void;
}

const Guide: React.FC<GuideProps> = ({ showGuide, toggleGuide }) => {

    return (
        <div>
            <>          
            <div 
                className='cursor-pointer bg-gray-300 hover:-translate-y-1 duration-200 rounded-md flex justify-center items-center w-12 h-12'
                onClick={toggleGuide}
            >
                <img src={Guideicon} alt="Guide Icon" className='h-5' />
            </div>
            {showGuide && (
                <div className='bg-gray-300 rounded-md p-4 text-black bottom-20 w-80 right-4 absolute'>
                <p><strong>Control Guide:</strong></p>
                <p>Rotate: Left Mouse Button</p>
                <p>Zoom: Scroll Wheel</p>
                <p>Pan: Right Mouse Button</p>
                </div>
            )}
            </>
        </div>


    );
};

export default Guide;