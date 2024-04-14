import React from 'react'
import { useState } from 'react';

import {
    Drawer,
    Button,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import SendLocationButton from '../components/SendLocationButton';

function UserLive() {
    const [openBottom, setOpenBottom] = React.useState(true);
    const [driver, setDriver] = React.useState('Raj Agarwal');
    const [distance, setDistance] = useState('500')
    const openDrawerBottom = () => setOpenBottom(true);
    const closeDrawerBottom = () => setOpenBottom(false);


    return (
        <>
            <div className="flex justify-center flex-col items-center">
                <Typography color="blueGray" className="text-center text-4xl font-bold p-5">You are on your way to the destination</Typography>
                <Typography color="blueGray" className="text-center text-3xl font-bold p-5">Share ride details with your loved ones</Typography>
                <SendLocationButton />
                <Link to="/completion">
                    <Button variant='outlined' color="black" fullWidth className='my-10' >Rate Your Ride</Button>
                </Link>
            </div>
            <div className="flex justify-center flex-col items-center">
                
            </div>
        </>
    )
}

export default UserLive
