import React, { useEffect } from 'react'
import { useState } from 'react'
import { Button, IconButton, Input, Spinner } from '@material-tailwind/react'
import { useContext } from 'react'
import { TransactionContext } from '../context/TransactionContext'
import { ethers } from 'ethers'


function DriverHome() {
    const [distance, setDistance] = useState('13')
    const [destination, setDestination] = useState('KJ Somaiya')
    const [estimatedMinCost, setEstimatedMinCost] = useState('156');
    const [estimatedMaxCost, setEstimatedMaxCost] = useState('156');
    const [bidAmount, setBidAmount] = useState(0);

    const { requestRide, connectWallet, getAllRideRequests, isLoading, requestedRides, placeBid, getBids, bids, acceptBid, bidPlaced,setRequestedRides } = useContext(TransactionContext);

    useEffect(() => {
        getAllRideRequests();
    }, [])

    useEffect(() => {
        if (bidPlaced) {
            setRequestedRides(requestedRides.slice(1));
        }
        getAllRideRequests();
    }, [bidPlaced])

    return (
        <>
            <div className='w-[45vh] h-[100vh] bg-white relative'>
                <div className="flex flex-col pl-8 pr-8 pt-8 gap-2">
                    <div className='flex flex-col gap-4 p-4'>

                        <p className='text-2xl leading-tight font-medium'>Rides Available <span className=' text-green-600'>Live</span></p>
                        <p className='text-gray-500 leading-tight'>4 Rides Found</p>
                    </div>
                    {requestedRides?.map((ride, index) => (
                        <>
                            <div key={index} className="flex flex-row justify-between border b-1 rounded-lg">
                                <div className='flex flex-row items-start p-4 justify-center gap-5'>

                                    <div className='w-20 h-20 bg-yellow-400 rounded-lg flex items-center justify-center'>
                                        <p className='text-2xl font-semibold '>Ride</p>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <p className='font-semibold text-lg'>Destination: {JSON.parse(ride[3]).name}</p>
                                        <p className='font-extralight text-sm text-gray-700'>From {JSON.parse(ride[2]).name}</p>
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
                </div>
            </div>
        </>
    )
}

export default DriverHome
