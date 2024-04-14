import React from 'react'

function Act() {
    return (
        <>
            <div className='flex flex-row gap-9 items-center'>
                <div className='flex flex-row p-2 justify-center gap-2 items-center'>
                    <div className='p-2 w-24 h-24 bg-white rounded-lg flex items-center justify-center'>
                        <img src="tax.jpeg" alt="" />
                    </div>
                    <div className='flex flex-col '>
                        <p className='font-semibold text-base text-black'>Mint Colony</p>
                        <p className='text-sm text-gray-700'>28 Mar | 11:17 pm</p>
                        <p className='text-sm text-gray-700'>141/- | 1 Stop</p>
                    </div>
                    <div className='flex flex-row items-center justify-center p-2 gap-4 bg-black pr-2 pl-2
                             rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
                        </svg>
                        <p className='text-sm text-white'>Rebook</p>
                    </div>
                </div>
            </div>
            <div className='w-full h-[3px] bg-gray-500'>

            </div>
        </>
    )
}

export default Act
