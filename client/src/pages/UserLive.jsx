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
            <SendLocationButton />

        </>
    )
}

export default UserLive
