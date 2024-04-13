import React, { useState } from 'react';
import { Button, Carousel } from "@material-tailwind/react";
import { Link } from 'react-router-dom';

function Landing() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Array of image URLs
    const images = ['tt1.svg', 'tt2.svg', 'tt3.svg'];
    const body_texts = [
        'Sell houses Toughly with the help of Listenoryx and to make this line big I am writing more.',
        'Sell houses easily with the help of Listenoryx and to make this line big I am writing more.',
        'Sell houses muchhchchc with the help of Listenoryx and to make this line big I am writing more.'
    ];
    const header_texts = [
        'Anywhere you are',
        'At anytime',
        'Book your car'
    ];
    // Function to handle button click
    const handleButtonClick = () => {
        // Increment currentIndex, cycling back to 0 when reaching the end
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    return (
        <div className='w-[45vh] h-[100vh] bg-white relative'>
        <div className='flex flex-col p-8 gap-28'>
                <div className="flex flex-row-reverse">
                <Link to="/welcome" className='flex cursor-pointer'> <p  className='flex  cursor-pointer'>Skip</p>
</Link>
                </div>
                {/* Use currentIndex to dynamically change the image */}
                <div className="flex items-center transition-smooth transition-all duration-1000">
                    <img src={images[currentIndex]} className='w-[350px] h-[170px]' alt="" />
                </div>
                <div className='flex flex-col items-center gap-2 mt-[-84px] transition-smooth duration-1000'>
                    <p className='text-2xl leading-tight'>{header_texts[currentIndex]}</p>
                    <p className='text-sm leading-tight text-[#A0A0A0] w-[250px] text-center '>{body_texts[currentIndex]}</p>
                </div>
                <div className='flex flex-col items-center mt-24'>
                    <Button onClick={handleButtonClick} className='w-[70px] flex items-center justify-center h-[70px] bg-gray-900 rounded-full  border-4 solid black '>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Landing;
