import React from 'react'
import Navbar from '../components/Navbar'

function Profile() {
    return (
        <>
            <div className='w-[45vh] h-[100vh] bg-white relative'>
                <div className='flex flex-col overflow-hidden' style={{ backgroundImage: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.justvehicle.solutions%2Fblog-google-maps-tips%2F&psig=AOvVaw2pIVcfTpA4l8ouyZ-8ZRcu&ust=1713078071639000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPDV6KbPvoUDFQAAAAAdAAAAABAE" }}>

                    <div className='absolute bottom-0 w-full'>
                        <Navbar />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
