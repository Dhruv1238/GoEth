import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { Button } from '@material-tailwind/react';

function Completion() {
    const [userName, setUserName] = useState('');
    const [starRating, setStarRating] = useState(0); // Step 1: Add state for star rating

    const {addRating, driverAddress}=useContext(TransactionContext);

    // Step 2: Create Star Rating Component
    const StarRating = ({ rating, setRating }) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    fill={i <= rating ? 'currentColor' : 'none'}
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className={`w-8 h-8 m-2 cursor-pointer ${i <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                    onClick={() => setRating(i)}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.17 22 12 18.7 5.83 22l1.18-7.86L2 9.27l6.91-1.01L12 2z" />
                </svg>
            );
        }
        return <div className="flex">{stars}</div>;
    };

    console.log(starRating);

    return (
        <>
            <div className='w-[45vh] h-[100vh] bg-white relative'>
                <div className='flex flex-col p-8'>
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
                </div>
                <div>
                    <div className='flex justify-center align-middle'>
                        <h1 className='text-2xl font-bold'>Please rate your experience</h1>
                    </div>
                </div>
                <div className='flex justify-center gap-5'>
                    {/* Render Star Rating Component */}
                    <StarRating rating={starRating} setRating={setStarRating} />
                    <Button onClick={()=>addRating(driverAddress, starRating)}>Submit</Button>
                </div>
                <div className='absolute z-10 bottom-0 w-full'>
                    <Navbar />
                </div>
            </div>
        </>
    );
}

export default Completion;
