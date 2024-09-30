import React from 'react';

const Back: React.FC = () => {
    return (
        <div className='cursor-pointer bg-gray-300 hover:-translate-y-1 duration-200 rounded-md flex justify-center items-center w-12 h-12'
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="20" viewBox="0 0 27 20" fill="none">
                <rect x="6" y="7" width="21" height="6" rx="3" fill="#6B7280" />
                <path d="M1.63263 11.4812C0.757778 10.6875 0.757779 9.31249 1.63263 8.51877L7.15614 3.50749C8.44135 2.34146 10.5 3.25338 10.5 4.98871L10.5 15.0113C10.5 16.7466 8.44135 17.6585 7.15614 16.4925L1.63263 11.4812Z" fill="#6B7280" />
            </svg>
        </div>
    );
};

export default Back;