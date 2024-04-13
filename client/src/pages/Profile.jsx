import Navbar from '../components/Navbar'
import React, { useState } from 'react';
import { Input } from '@mui/base/Input';

function Profile() {
    const [userInfo, setUserInfo] = useState({
        name: 'Pratham',
        lastName: 'JG',
        phoneNumber: '9912245690',
        email: 'Pjg@gmail.com',
        address: '',
        TypeOfUser: 'Driver',
        isEditingAddress: false
    });


    return (
        <>
            <div className='w-[45vh] h-[100vh] bg-white relative'>
                <div className='flex flex-col overflow-hidden'>
                    <div className='flex flex-col p-8 '>
                        


                    </div>
                    <div className='absolute bottom-0 w-full'>
                        <Navbar />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
