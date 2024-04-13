import React from 'react'
import Navbar from '../components/Navbar'

function Activity() {
    return (
        <>
            <div className='w-[45vh] h-[100vh] bg-white relative'>
                <div className='flex flex-col'>
                    <div>

                    </div>
                    <div className='absolute z-10 bottom-0 w-full'>
                        <Navbar />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Activity
