import React from 'react'
import { Link } from 'react-router-dom'
// import authCheck from '../components/AuthCheck';
import { Button } from "@material-tailwind/react";

function Understand() {
    return (
        <>
            <div className='w-[45vh] h-[100vh] bg-white relative overflow-scroll' >
                <div className='flex flex-col p-8 gap-4' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <div>
                        <Link to="/home">
                            <Button className="flex p-2 w-10 h-10 bg-black rounded-xl curson-pointer justify-center items-center cursor-pointer ">
                                <p className='text-white'>X</p>
                            </Button>
                        </Link>
                    </div>
                    <div className="flex flex-col gap-2 p-2">
                        <p className='text-2xl font-medium'>Understanding Your Rating</p>
                        <p className='w-full text-sm font-thin text-gray-400 leading-tight'>Understanding your rating is essential for evaluating your performance or the quality of a product or service. Ratings provide a quantitative measure that reflects satisfaction, quality, or effectiveness. They offer valuable feedback that can help identify strengths and areas for improvement. </p>
                        <img src="tt6.jpeg" alt="" />
                        <p className='text-xl font-medium'>How your rating is Calculated</p>
                        <p className='w-full text-sm font-thin text-gray-400 leading-tight'>
                            The calculation of your rating in our system involves a sophisticated process that leverages blockchain technology. 
                            {/* <br /> */}
                            Instead of centralized databases or authorities, blockchain allows for decentralized voting. This means that every vote or rating is recorded on a distributed ledger, ensuring transparency and immutability.</p>
                            <p className='w-full text-sm font-thin text-gray-400 leading-tight'>
                            Using blockchain ensures that each rating is securely and transparently recorded without the risk of tampering or manipulation. This decentralized approach fosters trust among users, knowing that their ratings are accurately represented and cannot be altered after submission. It also promotes a fair and democratic way of aggregating ratings, where each vote carries equal weight and contributes to the overall score.</p>
                            <img src="u6.png" className='p-2' alt="" />
                            <p className='text-base font-medium'>Short waiting Times</p>
                            <p className='w-full text-sm font-thin text-gray-400 leading-tight'>With our Matching Algotithm The user can choose the person closest to them or cheaper based on their preference</p>
                            <img src="u7.png" className='p-2' alt="" />

                            <p className='text-base font-medium'>Safety</p>
                            <p className='w-full text-sm font-thin text-gray-400 leading-tight'>Safety is a top priority when using our app's cab service. We ensure all our drivers undergo thorough background checks and training to guarantee passenger security. Additionally, our app features real-time tracking and an emergency button for immediate assistance, providing peace of mind during your ride.</p>

                            <p className='text-base font-medium'>Why Your Rating Matters</p>
                            <p className='w-full text-sm font-thin text-gray-400 leading-tight'>
                            Your rating matters because it directly influences the quality of service you receive. Higher ratings encourage better performance from drivers and prompt improvements from our end. It also helps maintain a trustworthy community by highlighting responsible and reliable service providers. Ultimately, your feedback shapes the overall experience for all users.
                            </p>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Understand
