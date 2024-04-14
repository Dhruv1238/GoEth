import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import { Button, IconButton, Input, Spinner } from '@material-tailwind/react'
import authCheck from '../components/AuthCheck';
import { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { ethers } from 'ethers';


function Activity() {

    const { requestRide, connectWallet, getAllRideRequests, isLoading, requestedRides, placeBid, getBids, bids, acceptBid } = useContext(TransactionContext);

    const [bidAmount, setBidAmount] = useState(0);

    // console.log(bidAmount);

    const [nftName, setNftName] = useState('Logabooze')
    return (
        <>
            <div className='w-[45vh] h-[100vh] bg-white relative'>
                <div className='flex flex-col p-8 gap-6'>
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
                    <div className='flex flex-col gap-4'>
                        <p className='text-2xl font-medium'>Upcoming</p>
                        <div className='w-full p-4 flex flex-col border border-1 rounded-xl '>
                            <p className='tex-2xl font-semibold'>You haven't Rented a car yet?</p>
                            <p className='tex-lg text-gray-400 font-thin'>Reserve Your Trip</p>

                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex flex-row justify-between items-center'>
                            <p className='text-2xl font-medium'>Past</p>
                            <Button className='w-8 h-8 p-2 rounded-full bg-black flex items-center justify-center' onClick={() => { getBids(0) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
                                </svg>
                            </Button>
                        </div>
                    </div>
                    <div className='flex flex-col '>
                        <div className='flex flex-row p-4 justify-between items-center'>
                            <div className='flex flex-row p-2 justify-center gap-2 items-center'>
                                <div className='p-2 w-24 h-24 bg-white rounded-lg flex items-center justify-center'>
                                    <img src="tax.jpeg" alt="" />
                                </div>
                                <div className='flex flex-col '>
                                    <p className='font-semibold text-base text-black'>Mint Colony</p>
                                    <p className='text-sm text-gray-700'>28 Mar | 11:17 pm</p>
                                    <p className='text-sm text-gray-700'>141/- | 1 Stop</p>
                                </div>
                                <div className='flex flex-row text-xs justify-between bg-blue-gray-300 p-2
                            w-[140px] rounded-full'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
                                    </svg>

                                    <p>Rebook</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-4 p-4'>
                    {requestedRides.map((ride, index) => (
                        <>
                            <div key={index} className="flex flex-row justify-between border b-1 rounded-lg">
                                <div className='flex flex-row items-start p-4 justify-center  gap-5'>

                                    <div className='w-20 h-20 bg-yellow-400 rounded-lg flex items-center justify-center'>
                                        <p className='text-2xl font-semibold '>Ride</p>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <p className='font-semibold text-lg'>Destination: {ride[3]}</p>
                                        <p className='font-extralight text-sm text-gray-700'>From {ride[2]}</p>
                                        <p className='font-extralight text-sm text-gray-700'>{ethers.utils.formatEther(ride.startingBid)} ETH</p>
                                        <p className='font-extralight text-sm text-gray-700'>{ethers.utils.formatEther(ride.startingBid) * 268873.65} INR</p>
                                        <div className='flex flex-row gap-4'>
                                            <Input variant="standard" label="Bid Amout" type='number' onChange={(e) => { setBidAmount(e.target.value) }} />
                                            <IconButton variant="outlined" size='lg' className='w-20' onClick={() => placeBid(ride.requestId.toNumber(), bidAmount)}>
                                                {/* <i className="fas fa-heart" /> */}
                                            </IconButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))
                    }
                </div >
                {
                    bids.map((bid, index) => (
                        <>
                            <div key={index} className="flex flex-row justify-between border b-1 rounded-lg">
                                <div className='flex flex-row items-start p-4 justify-center  gap-5'>

                                    <div className='w-20 h-20 bg-yellow-400 rounded-lg flex items-center justify-center'>
                                        <p className='text-2xl font-semibold '>Bid</p>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <p className='font-semibold text-lg'>Id: {bid.bidId.toNumber()}</p>
                                        <p className='font-extralight text-sm text-gray-700'>{ethers.utils.formatEther(bid.amount)} ETH</p>
                                        <p className='font-extralight text-sm text-gray-700'>{ethers.utils.formatEther(bid.amount) * 268873.65} INR</p>
                                    </div>
                                    <Button onClick={() => acceptBid(0, bid.bidId)} className='w-20 h-8 p-2 rounded-lg bg-black text-white'>Accept</Button>
                                </div>
                            </div>
                        </>
                    ))
                }
                <div className='absolute z-10 bottom-0 w-full'>
                    <Navbar />
                </div>
            </div>
        </>
    )
}

export default authCheck(Activity)
