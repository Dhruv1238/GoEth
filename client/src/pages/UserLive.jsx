import React from 'react'
import { useState } from 'react';
import {
    Drawer,
    Button,
    Typography,
    IconButton,
} from "@material-tailwind/react";

function UserLive() {
    const [openBottom, setOpenBottom] = React.useState(true);
    const [driver, setDriver] = React.useState('Raj Agarwal');
    const [distance, setDistance] = useState('500')
    const openDrawerBottom = () => setOpenBottom(true);
    const closeDrawerBottom = () => setOpenBottom(false);


    return (
        <>
            <div id="map" className="absolute top-0 w-full mx-auto h-full z-0 overflow-hidden"></div>
            <div className='w-[45vh] h-[100vh] relative overflow-scroll' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <div className='flex flex-col p-8'>
                    <Button onClick={openDrawerBottom}>Open Drawer Bottom</Button>
                    <Drawer
                        placement="bottom"
                        open={openBottom}
                        onClose={closeDrawerBottom}
                        className="p-8"
                        style={{ height: '60vh', width: '45vh' }}  // Adjusting the height

                    >


                        <div className=" gap-3 flex flex-col justify-between">
                            <div className='flex flex-row-reverse items-end'>

                                <IconButton variant="text" color="blue-gray" onClick={() => setOpenBottom(false)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 52 52"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="h-10 w-10"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </IconButton>
                            </div>
                            <div className='flex flex-col items-start gap-1'>
                                <p className='text-lg font-medium'>Your driver is coming at 3:35</p>
                                <div className='w-full h-[3px] bg-gray-300 my-4'></div>
                            </div>
                            <div className='p-4 flex flex-row justify-between'>
                                <div className='flex flex-row gap-4 items-center justify-center'>
                                    <div className='w-20 h-20 bg-black rounded-xl'>

                                    </div>
                                    <div className='flex flex-col '>
                                        <p className='text-xl '>{driver}</p>
                                        <p className='text-base text-gray-700 '>{distance}m {'('} 5mins Away {')'}</p>
                                        <div className='flex flex-row gap-1'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-yellow-600">
                                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                            </svg>
                                            <p className='text-gray-700'>4.9</p>
                                            <p className='text-gray-700'>{'('}531 reviews{')'}</p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full h-[3px] bg-gray-300 my-4'></div>

                        </div>
                    </Drawer>

                </div>
            </div>

        </>
    )
}

export default UserLive
