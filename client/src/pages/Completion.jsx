import React, { useState } from 'react'
import authCheck from '../components/AuthCheck';

function Completion() {
    const [userName, setUserName] = useState('')
    return (
        <>
          <div className='w-[45vh] h-[100vh] bg-white relative'>
                <div className='flex flex-col p-8'>
                    <div>
                    <Link to="/home">
                        <div className="flex flex-row items-center cursor-pointer ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>

                            <p>Back</p>
                        </div>
                    </Link>
                    </div>
                </div>
                    <div className='absolute z-10 bottom-0 w-full'>
                        <Navbar />
                    </div>
            </div>
        </>
    )
}

export default authCheck(Completion)
