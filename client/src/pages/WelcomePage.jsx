import { Button } from '@material-tailwind/react'
import React from 'react'
import { Link } from 'react-router-dom';

function WelcomePage() {
    return (
        <>
        <div className=' w-[55vh] h-[100vh] bg-white  rounded-xl  relative'>
                <div className='flex flex-col gap-24 p-4'>

                    <div className='flex flex-col gap-6'>
                        <div className='flex flex-col items-center p-8 mt-28'>
                            <img src="tt4.svg" className='w-[346px] h-[266px]' alt="" />
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <p className='text-center text-2xl font-normal'>Welcome</p>
                            <p className='text-base leading-tight font-thin text-gray-400 w-[250px] text-center '>Have a better Booking experience</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 pl-4 pr-4 '>
                        <Link to="/home">
                            <Button className='w-full rounded-lg p-4 bg-black text-white'>Create An Account</Button>
                        </Link>
                        <Button className='rounded-lg p-4 bg-transparent border border-2 border-black text-black' >Login to Account</Button>

                    </div>
                </div>
            </div>
        </>
    )
}

export default WelcomePage
