import React from 'react'
import Navbar from '../components/Navbar'

function Wallet() {
    return (
        <>
            <div className=' w-[55vh] h-[100vh] bg-white  rounded-xl  relative'>
                <h2>Wallet</h2>
                <div className='absolute bottom-0 w-full'>
                    <Navbar />
                </div>
            </div>
        </>
    )
}

export default Wallet
