import Navbar from '../components/Navbar'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-tailwind/react'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import authCheck from '../components/AuthCheck';

function Profile() {

    const { user } = useContext(AuthContext);


    const [userInfo, setUserInfo] = useState({
        name: user != null ? user.displayName : "Please Sign In",
        phoneNumber: "9874563218",
        email: user?.email,
        address: '',
        TypeOfUser: 'Driver',
        // isEditingAddress: false,
        img: user?.photoURL,
        CO2: '0'
    });


    return (
        <>
            <div className='w-[45vh] h-[100vh] bg-white relative'>
                <div className='flex flex-col  gap-6 overflow-y-scroll' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} >
                    <Link to="/home" className=''>
                        <div className="flex flex-row items-center cursor-pointer pl-8 pt-8 ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>

                            <p>Back</p>
                        </div>
                    </Link>
                    <div className="flex flex-row justify-between pl-8 pr-8 ">

                        <div className='flex flex-col '>
                            <div className='flex flex-row gap-2 text-2xl font-medium'>
                                <p>{userInfo.name}</p>
                            </div>
                            <div>
                                <span className='font-thin text-lg text-gray-500 '>{userInfo.email}</span>
                            </div>
                            <p className='font-thin text-lg text-gray-500 '>{userInfo.phoneNumber}</p>
                            <p>Stars: 5</p>
                            <Link to="/understand">
                                <p className='text-xs text-gray-400'>Understand Rating</p>
                            </Link>
                        </div>
                        <div >
                            <img src={userInfo.img} className='w-20 h-20 p-1 rounded-full border border-1 border-black' alt="" />
                        </div>
                    </div>
                    <div className='pl-8 pr-8'>

                        <div className='flex  flex-row p-4 items-center  justify-between max-w-[full]  bg-green-500 text-white  rounded-xl'>
                            <p>Estimated CO2 saved</p>

                            <p className='font-semibold'>{userInfo.CO2} G</p>
                        </div>
                    </div>
                    <div className='max-w-2xl mx-auto relative'>
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your Address</label>
                        <div className="flex flex-col gap-2 text-lg">
                            <textarea id="message" cols='40' rows="4" className="block p-2.5 text-sm text-gray-900 w-full rounded-lg border border-black outline-none" placeholder="Your Address..." />
                            <Button className="bg-black p-4 ">
                                Update
                            </Button>
                        </div>
                    </div>
                    <div className='flex items-start pl-10'>
                        <Button className="bg-black p-4 w-1/3">
                            Sign Out
                        </Button>
                    </div>
                    <div className='mt-12 mb-12 flex items-center justify-center'>
                        <img src="tt3.svg" className='w-70 h-70' alt="" />
                    </div>

                    <div className='absolute bottom-0 w-full'>
                        <Navbar />
                    </div>
                </div>
            </div>
        </>
    )
}

export default authCheck(Profile)
