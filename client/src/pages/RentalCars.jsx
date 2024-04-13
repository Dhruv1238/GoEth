import { Button } from '@material-tailwind/react'
import React from 'react'
import { Link } from 'react-router-dom'
import Home from './Home'
import { useState } from 'react'
import Navbar from '../components/Navbar'

function RentalCars() {

    const [cars, setCars] = useState([
        {
            timeToArrive: '10 mins',
            name: 'BMW Cabrio',
            distance: '5 km',
            img: 'https://t3.ftcdn.net/jpg/02/22/85/16/360_F_222851624_jfoMGbJxwRi5AWGdPgXKSABMnzCQo9RN.jpg',
            driverName:'Hamiz Parekh'
        },
        {
            timeToArrive: '15 mins',
            name: 'Audi SUV',
            distance: '10 km',
            img: '',
            driverName:'Sarfaraz Shaikh'
        },
        {
            timeToArrive: '20 mins',
            name: 'Mercedes Sedan',
            distance: '15 km',
            img: '',
            driverName:'Dhruv Khan'

        },
        {
            timeToArrive: '20 mins',
            name: 'Mercedes Sedan',
            distance: '15 km',
            img: '',
            driverName:'Pratham choenka'

        }
    ]);
    return (
        <>
            <div className='w-[55vh] h-[100vh] bg-white rounded-xl relative  '>
                <div className='flex flex-col p-8'>
                    <Link to="/home">
                        <div className="flex flex-row items-center cursor-pointer ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>

                            <p>Back</p>
                        </div>
                    </Link>
                    <div className='flex flex-col gap-1 p-4'>
                        <p className='text-2xl leading-tight font-medium'>Cars Available <span className=' text-green-600'>Live</span></p>
                        <p className='text-gray-500 leading-tight'>4 Cars Found</p>
                    </div>
                    <div className='flex flex-col p-4 gap-4  h-[72vh] overflow-y-scroll 'style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {cars.map((car, index) => (

                            <div key={index} className='flex flex-col p-4 border border-2 border-black rounded-xl gap-2 '>
                                <div className='flex flex-row gap-4 items-center'>
                                    <img src={car.img} className='w-8 h-8 border border-2 border-black rounded-full' alt="" />
                                    <p className='text-base font-semibold'>{car.driverName}</p>
                                </div>
                                
                                <div className='flex flex-row'>
                                    <div className='flex flex-col '>
                                        <p className='text-black'>{car.name}</p>
                                        <div className='flex flex-row text-xs text-gray-400 gap-2'>
                                            <p>Automatic</p> |
                                            <p>3 Seats</p> |
                                            <p>Octane</p> |
                                        </div>
                                    </div>
                                    <div>
                                        <img src="" alt="" />
                                    </div>
                                </div>
                                <div className='flex flex-row text-xs gap-2 items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>

                                    <p className='text-gray-700'>{car.timeToArrive}</p>
                                    <p className='text-gray-700'>{car.distance}</p>
                                </div>
                                <div className="flex flex-row gap-4">
                                    <Button className='p-4 text-black bg-transparent border border-2 border-black w-full' >
                                    Book Later
                                    </Button>
                                    <Button className='p-4 text-white bg-black w-full' >
                                    Ride Now
                                    </Button>
                                </div>
                            </div>
                        ))}

                    </div>

                    <div className='fixed absolute bottom-0 '>
                        <Navbar />
                    </div>
                </div>
            </div>
        </>
    )
}

export default RentalCars
