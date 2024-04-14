import React, { useState } from 'react';
import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

const CompleteRide = () => {

    const navigate = useNavigate();

    const handleEndRide = () => {
        alert('Ride Ended');
        navigate('/driverhome');
    };

    return (
        <div className='flex flex-col items-center justify-center gap-5'>
            <h1 className=' text-2xl'>Ride Completed?</h1>
            <Button onClick={handleEndRide}>End Ride</Button>
        </div>
    );
};

export default CompleteRide;