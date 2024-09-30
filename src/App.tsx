import React, { useState } from 'react';
import figmaLogo from './assets/figma.png';
import ThreeDScene from './ThreeDScene';

function App() {
  const [fileData, setFileData] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result as string;
        console.log('File loaded:', data);
        setFileData(data);
        setFileName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    fileInput.click();
  };

  return (
    <div>
      {fileData === null ? (
        <div id='importFile' className="bg-gray-200 w-full h-full p-10 flex justify-start items-end">
          <div className='text-black z-10'>
            <h2 className='text-3xl mb-1'>Simple</h2>
            <h1 className='text-5xl font-bold mb-1'>3D Viewer</h1>
            <p className='text-lg mb-5'>A simple free Figma plugin to<br />
              see and export 3D objects.</p>
            <div className='mb-2'>
              <button className='bg-black text-gray-50 text-lg py-3 px-10 rounded-md hover:bg-gray-800 duration-200'
                onClick={handleButtonClick}
              >
                Add 3D Object
              </button>
            </div>
            <span className='text-sm mt-2'>Supported files: .fbx, .obj</span>
            <input
              type="file"
              id="file-input"
              style={{ display: 'none' }}
              onChange={handleFileChange}
              accept=".fbx,.obj"
            />
          </div>
          <div className='absolute top-0 right-0 z-0'>
            <img src={figmaLogo} alt="Figma Logo" className='' />
          </div>
        </div>
      ) : (
        <div id='3dViewer'>
          <ThreeDScene fileData={fileData} fileName={fileName}/>
        </div>
      )}
    </div>
  );
}

export default App;