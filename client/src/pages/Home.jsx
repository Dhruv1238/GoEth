import React from 'react'
import Navbar from '../components/Navbar'
import { Button } from '@material-tailwind/react'
import { useState } from 'react'
import { Switch } from '@mui/base/Switch';
import { Link } from 'react-router-dom';
function Home() {
    const [isTransport, setIsTransport] = useState(true);

    const handleToggle = () => {
        setIsTransport(!isTransport);
    };
    const [location, setLocation] = useState('')
    return (
        <>
            <div className='w-[55vh] h-[100vh] bg-white rounded-xl relative'>
                <div className='flex flex-col h-full justify-between overflow-hidden p-8  '>
                    <div className='flex flex-row justify-between'>
                        <Button className='flex items-center justify-center w-10 h-10 bg-black rounded-lg'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                            </svg>

                        </Button>
                        <div className='flex flex-row gap-3'>
                            <Button className='flex items-center justify-center w-10 h-10 bg-black rounded-lg'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>

                            </Button>
                            <Button className='flex items-center justify-center w-10 h-10 bg-black rounded-lg'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 transform rotate-12">
                                    <path className='' strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                                </svg>


                            </Button>
                        </div>
                    </div>
                    <div className='flex flex-col mb-24 gap-4 '>
                        <div className="flex flex-row justify-between items-center">
                            <Link to="/rent">
                                <Button className='bg-black text-white p-4 pl-6 pr-6 '>
                                    Book a Cab
                                </Button>
                            </Link>
                            <Button className='bg-black flex items-center justify-center p-4 rounded-lg'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64" />
                                </svg>
                            </Button>
                        </div>
                        <div className='flex flex-col border border-2 border-black bg-transparent p-4 rounded-xl gap-4'>
                            <div className='flex flex-row w-full bg-transparent border border-2 border-black p-2 items-center justify-between rounded-lg'>
                                <div className='flex flex-row items-center justify-center rounded-xl '>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>
                                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}
                                        className='bg-transparent outline-none p-2' placeholder='Where to?' />

                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                            </div>
                            <div className='flex flex-row items-center w-full '>
                                <Button
                                    className={`p-4 w-full ${isTransport ? 'bg-black text-white' : 'bg-transparent text-black'}`}
                                    onClick={handleToggle}
                                >
                                    Transport
                                </Button>
                                <Button
                                    className={`p-4 w-full ${isTransport ? 'text-black border-black bg-transparent' : 'bg-black text-white border-black'}`}
                                    onClick={handleToggle}
                                >
                                    Delivery
                                </Button>

                            </div>


                        </div>
                    </div>
                    <div className='absolute bottom-0 '>
                        <Navbar />
                    </div>
                </div>
            </div >
        </>

    )
}

export default Home
