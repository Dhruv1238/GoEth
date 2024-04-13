import React from 'react'
import { useState } from 'react'
import { Button } from '@material-tailwind/react'

function DriverHome() {
    const [distance, setDistance] = useState('13')
    const [destination, setDestination] = useState('KJ Somaiya')
    const [estimatedMinCost, setEstimatedMinCost] = useState('156');
    const [estimatedMaxCost, setEstimatedMaxCost] = useState('156');

    return (
        <>
            <div className='w-[45vh] h-[100vh] bg-white relative'>
                <div className="flex flex-col pl-8 pr-8 pt-8 gap-2">
                    <div className='flex flex-col gap-1 p-4'>

                        <p className='text-2xl leading-tight font-medium'>Rides Available <span className=' text-green-600'>Live</span></p>
                        <p className='text-gray-500 leading-tight'>4 Rides Found</p>
                    </div>


                    

                </div>
            </div>
        </>
    )
}

export default DriverHome
