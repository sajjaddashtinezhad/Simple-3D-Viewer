import React from 'react';
import ColorIcon from './assets/color.svg';

interface SettingProps {
    showSetting: boolean;
    toggleSetting: () => void;
    backgroundColor: number;
    setBackgroundColor: (color: number) => void;
}

const Setting: React.FC<SettingProps> = ({ showSetting, toggleSetting, backgroundColor, setBackgroundColor }) => {
    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const color = parseInt(event.target.value.replace('#', ''), 16);
        setBackgroundColor(color);
    };

    return (

        <div>
            <div 
                className='cursor-pointer bg-gray-300 hover:-translate-y-1 duration-200 rounded-md flex justify-center items-center w-12 h-12'
                onClick={toggleSetting}
            >
                <img src={ColorIcon} alt="Setting Icon" />
            </div>
            {showSetting && (
                <div className='bg-gray-300 rounded-md p-4 text-black bottom-20 w-80 right-4 absolute'>
                    <div>
                        <label htmlFor="colorInput" className="block text-sm text-black">
                            Export Background Color:
                        </label>
                        <input
                            type="color"
                            id="colorInput"
                            name="colorInput"
                            className="mt-1 block w-full h-12 p-2 rounded-sm"
                            defaultValue={`#${backgroundColor.toString(16).padStart(6, '0')}`}
                            onChange={handleColorChange}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Setting;