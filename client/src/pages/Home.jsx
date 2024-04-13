import Navbar from '../components/Navbar'
import { Button } from '@material-tailwind/react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

function Home() {
    const [isTransport, setIsTransport] = useState(true);
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    // const [sourceChange, setSourceChange] = useState(false);
    // const [destinationChange, setDestinationChange] = useState(false);
    const [sourceList, setSourceList] = useState([]);
    const [destinationList, setDestinationList] = useState([]);
    const [userLocation, setUserLocation] = useState();
    const [showSourceDropdown, setShowSourceDropdown] = useState(false);
    const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);

    const API_KEY = import.meta.env.VITE_APP_MAPBOX_ACCESS_KEY;
    const PUBLIC_KEY = import.meta.env.VITE_APP_MAPBOX_PUBLIC_KEY;

    const getAddressList = async (query, setList) => {
        if (!query) return; // Prevents fetching when query is empty
        const req = await fetch(`https://api.mapbox.com/search/searchbox/v1/suggest?q=${query}&language=en&session_token=025067ec-efa6-47c1-88ed-5edc75f0d552&access_token=${API_KEY}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const result = await req.json();
        console.log('Response: ', result);
        setList(result.suggestions || []); // Ensures list is always an array
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            getAddressList(source, setSourceList);
        }, 1000);
        return () => clearTimeout(delayDebounceFn);
    }, [source]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            getAddressList(destination, setDestinationList);
        }, 1000);
        return () => clearTimeout(delayDebounceFn);
    }, [destination]);

    const getUserLocation = () => {
        navigator.geolocation.getCurrentPosition(function (pos) {
            setUserLocation({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude
            })
        })
    }

    useEffect(() => {
        getUserLocation();
        console.log('User Location: ', userLocation);
    }, []);

    // const handleToggle = () => {
    //     setIsTransport(!isTransport);
    // };

    const handleInputFocus = (setShowDropdown) => {
        setShowDropdown(true);
    };

    const handleInputBlur = (setShowDropdown) => {
        setTimeout(() => setShowDropdown(false), 200);
    };

    const handleSelectOption = (setInput, setList, option) => {
        setInput(option);
        setList([]);
    };

    return (
        <>
            <div className='w-[45vh] h-[100vh] bg-[url("./map.png")] relative overflow-scroll' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <div className='flex flex-col h-full justify-between overflow-hidden p-8  '>
                    <div className='flex flex-row justify-between'>
                        <Button className='flex items-center justify-center w-10 h-10 bg-black rounded-lg'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                            </svg>
                        </Button>
                        <div className='flex flex-row gap-3'>
                            <Button className='flex items-center justify-center w-10 h-10 bg-black rounded-lg'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </Button>
                            <Button className='flex items-center justify-center w-10 h-10 bg-black rounded-lg'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 transform rotate-12">
                                    <path className='' strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                                </svg>
                            </Button>
                        </div>
                    </div>
                    <div>
                    </div>
                    <div className='flex flex-col mb-24 gap-4 '>
                        <div className="flex flex-row justify-between items-center">
                            <Link to="/rent">
                                <Button className='bg-black text-white p-4 pl-6 pr-6 '>
                                    Book a Cab
                                </Button>
                            </Link>
                            <Button className='bg-black flex items-center justify-center p-4 rounded-lg'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64" />
                                </svg>
                            </Button>
                        </div>
                        <div className='flex flex-col border border-2 border-black bg-transparent p-4 rounded-xl gap-4'>
                            {/* source field */}
                            <div className='flex flex-row items-center justify-stretch rounded-xl relative'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                                <input
                                    type="text"
                                    onChange={(e) => setSource(e.target.value)}
                                    onFocus={() => handleInputFocus(setShowSourceDropdown)}
                                    onBlur={() => handleInputBlur(setShowSourceDropdown)}
                                    className='bg-transparent outline-none p-2'
                                    placeholder='Where from?'
                                    value={source}
                                />
                                {showSourceDropdown && sourceList.length > 0 && (
                                    <div className='absolute bg-white border border-gray-200 rounded shadow-lg bottom-full mb-2'>
                                        {sourceList.map((item, index) => (
                                            <div
                                                key={index}
                                                onClick={() => handleSelectOption(setSource, setSourceList, item.name)}
                                                className='p-2 hover:bg-gray-200 cursor-pointer'
                                            >
                                                {item.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {/* destination field */}
                            <div className='flex flex-row items-center justify-stretch rounded-xl relative'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                                <input
                                    type="text"
                                    onChange={(e) => setDestination(e.target.value)}
                                    onFocus={() => handleInputFocus(setShowDestinationDropdown)}
                                    onBlur={() => handleInputBlur(setShowDestinationDropdown)}
                                    className='bg-transparent outline-none p-2'
                                    placeholder='Where to?'
                                    value={destination}
                                />
                                {showDestinationDropdown && destinationList.length > 0 && (
                                    <div className='absolute bg-white border border-gray-200 rounded shadow-lg bottom-full mb-2'>
                                        {destinationList.map((item, index) => (
                                            <div
                                                key={index}
                                                onClick={() => handleSelectOption(setDestination, setDestinationList, item.name)}
                                                className='p-2 hover:bg-gray-200 cursor-pointer'
                                            >
                                                {item.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='absolute bottom-0 w-full'>
                    <Navbar />
                </div>
            </div >
        </>
    )
}

export default Home
