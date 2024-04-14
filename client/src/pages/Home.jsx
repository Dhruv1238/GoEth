import Navbar from '../components/Navbar'
import {
    Drawer,
    Button,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Map, { Marker } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import UserLive from './UserLive';
import React from 'react';
import { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

function Home() {

    const navigate = useNavigate();
    const { requestRide, currentAccount, getTotalRequestCount } = useContext(TransactionContext);

    const { user, userData } = useContext(AuthContext);

    if (userData?.hasBooked) {
        console.log('Navigating to /rent');
        navigate('/book');
    } else {
        console.log('Not navigating');
    }

    const passengerEmail = user.email;

    const [isTransport, setIsTransport] = useState(true);
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    // const [sourceChange, setSourceChange] = useState(false);
    // const [destinationChange, setDestinationChange] = useState(false);
    const [sourceCoordinates, setSourceCoordinates] = useState([]);
    const [destinationCoordinates, setDestinationCoordinates] = useState([]);
    const [sourceList, setSourceList] = useState([]);
    const [destinationList, setDestinationList] = useState([]);
    const [userLocation, setUserLocation] = useState();
    const [showSourceDropdown, setShowSourceDropdown] = useState(false);
    const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
    const [sourceLat, setSourceLat] = useState();
    const [sourceLng, setSourceLng] = useState();
    const [destinationLat, setDestinationLat] = useState();
    const [destinationLng, setDestinationLng] = useState();
    const [showPopup, setShowPopup] = useState(false);
    const [journeyDetails, setJourneyDetails] = useState({ duration: 0, distance: 0 });

    const [openRight, setOpenRight] = React.useState(false);
    const [driver, setDriver] = React.useState('Raj Agarwal');
    const [distanceee, setDistanceee] = useState('500')
    const openDrawerRight = () => setOpenRight(true);
    const closeDrawerRight = () => setOpenRight(false);

    const API_KEY = import.meta.env.VITE_APP_MAPBOX_ACCESS_KEY;
    const PUBLIC_KEY = import.meta.env.VITE_APP_MAPBOX_PUBLIC_KEY;
    const SESSION_TOKEN = '025067ec-efa6-47c1-88ed-5edc75f0d552';

    const walletId = currentAccount;

    const getAddressList = async (query, setList) => {
        if (!query) return; // Prevents fetching when query is empty
        const req = await fetch(`https://api.mapbox.com/search/searchbox/v1/suggest?q=${query}&language=en&session_token=${SESSION_TOKEN}&access_token=${API_KEY}&country=in`, {
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

    const handleSelectOptionSource = (setInput, setList, option, item) => {
        setInput(option);
        setList([]);
        fetch(`https://api.mapbox.com/search/searchbox/v1/retrieve/${item.mapbox_id}?session_token=${SESSION_TOKEN}&access_token=${API_KEY}`)
            .then(req => req.json())
            .then(result => {
                console.log('Selected Source: ', result);
                setSourceLat(result.features[0].properties.coordinates.latitude);
                setSourceLng(result.features[0].properties.coordinates.longitude);
            });
    };
    console.log('Source Latitude: ', sourceLat);
    console.log('Source Longitude: ', sourceLng);

    const handleSelectOptionDestination = (setInput, setList, option, item) => {
        setInput(option);
        setList([]);
        fetch(`https://api.mapbox.com/search/searchbox/v1/retrieve/${item.mapbox_id}?session_token=${SESSION_TOKEN}&access_token=${API_KEY}`)
            .then(req => req.json())
            .then(result => {
                console.log('Selected Destination: ', result);
                setDestinationLat(result.features[0].properties.coordinates.latitude);
                setDestinationLng(result.features[0].properties.coordinates.longitude);
            });
    };
    console.log('Destination Latitude: ', destinationLat);
    console.log('Destination Longitude: ', destinationLng);

    const getDirectionRoute = async () => {
        const req = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${sourceLng},${sourceLat};${destinationLng},${destinationLat}?overview=full&geometries=geojson&access_token=${PUBLIC_KEY}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        const result = await req.json();
        console.log('Route: ', result);
        const routeGeometry = result.routes[0].geometry;
        const duration = result.routes[0].duration;
        const distance = result.routes[0].distance;
        return { routeGeometry, duration, distance };
    }

    useEffect(() => {
        mapboxgl.accessToken = PUBLIC_KEY;
        const map = new mapboxgl.Map({
            container: 'map', // container id
            style: 'mapbox://styles/mapbox/streets-v9', // style URL
            center: [72.9005454139102, 19.072655410514404], // starting position [lng, lat]
            zoom: 14 // starting zoom
        });

        // Function to update map and markers
        const updateMapAndMarkers = () => {
            // Remove existing markers
            map.getSource('sourceMarker')?.setData({ type: 'FeatureCollection', features: [] });
            map.getSource('destinationMarker')?.setData({ type: 'FeatureCollection', features: [] });

            // Add user location marker
            if (userLocation) {
                new mapboxgl.Marker()
                    .setLngLat([userLocation.longitude, userLocation.latitude])
                    .addTo(map);
            }

            // Add source marker
            if (sourceLat && sourceLng) {
                new mapboxgl.Marker({ color: 'red' })
                    .setLngLat([sourceLng, sourceLat])
                    .addTo(map);
                map.flyTo({
                    center: [sourceLng, sourceLat],
                    essential: true
                });
            }

            // Add destination marker
            if (destinationLat && destinationLng) {
                new mapboxgl.Marker()
                    .setLngLat([destinationLng, destinationLat])
                    .addTo(map);
                map.flyTo({
                    center: [destinationLng, destinationLat],
                    essential: true
                });
            }
        };

        const displayRoute = (routeGeoJSON, duration, distance) => {
            if (map.getSource('route')) {
                map.getSource('route').setData(routeGeoJSON);
            } else {
                map.addSource('route', {
                    type: 'geojson',
                    data: routeGeoJSON
                });
                map.addLayer({
                    id: 'route',
                    type: 'line',
                    source: 'route',
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    paint: {
                        'line-color': '#888',
                        'line-width': 8
                    }
                });
            }
            setJourneyDetails({ duration, distance });
            setShowPopup(true);
        };

        if (sourceLat && sourceLng && destinationLat && destinationLng) {
            getDirectionRoute().then(({ routeGeometry, duration, distance }) => {
                displayRoute(routeGeometry, duration, distance);
            });
        }

        // Call the function to update map and markers
        updateMapAndMarkers();

        return () => map.remove();
    }, [userLocation, sourceLat, sourceLng, destinationLat, destinationLng]);

    console.log('Source: ', source);
    console.log('Destination: ', destination);

    const handleRequestRide = async () => {

        const sourceDetails = {
            name: source,
            lat: sourceLat,
            lng: sourceLng
        };

        const destinationDetails = {
            name: destination,
            lat: destinationLat,
            lng: destinationLng
        };

        // Convert the JSON object to a string
        const sourceDetailsString = JSON.stringify(sourceDetails);
        const destinationDetailsString = JSON.stringify(destinationDetails);

        const basePrice = journeyDetails.distance / 1000 * 15;
        console.log('Base Price: ', basePrice);

        let requestId;
        try {
            requestId = await getTotalRequestCount();
            console.log('Request ID: ', requestId);
        } catch (error) {
            console.error('Failed to get total request count:', error);
        }

        await requestRide(sourceDetailsString, destinationDetailsString, basePrice).then(async () => {
            const userDocRef = doc(db, 'users', user.email);
            await updateDoc(userDocRef, {
                hasBooked: true,
                requestId: requestId
            }).then(() => {
                console.log('User details updated successfully');
            }).catch((error) => {
                console.error("Error updating user details: ", error);
            });

            navigate('/book');
        });

    }

    return (
        <>
            <div className='relative z-0 top-0 w-full mx-auto h-full'>
                <div id="map" className="absolute top-0 w-full h-full z-0"></div>

                <div className='relative z-10 pointer-events-none'>
                    <div className='w-[45vh] h-[100vh] relative overflow-scroll' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

                        <div className='flex flex-col h-full justify-between overflow-hidden p-8  '>
                            <div className='flex flex-col gap-4'>
                                <div className='flex flex-row justify-between z-10 pointer-events-auto'>

                                    <div className='flex flex-row gap-3'>

                                        <Button onClick={openDrawerRight} className='flex items-center justify-center w-10 h-10 bg-black rounded-lg'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 z-10 relative transform rotate-12">
                                                <path className='' strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                                            </svg>

                                            <Drawer
                                                placement="top"
                                                open={openRight}
                                                onClose={closeDrawerRight}
                                                className="p-8 h-3/7"
                                            >


                                                <div className=" gap-1 flex flex-col justify-between">
                                                    <div className='flex flex-row-reverse items-end'>

                                                        <IconButton variant="text" color="blue-gray" onClick={() => setOpenTop(false)}>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 52 52"
                                                                strokeWidth={2}
                                                                stroke="currentColor"
                                                                className="h-10 w-10"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M6 18L18 6M6 6l12 12"
                                                                />
                                                            </svg>
                                                        </IconButton>
                                                    </div>
                                                    <div className='flex flex-col items-start gap-1 overflow-y-scroll'>
                                                        <p className='text-lg font-medium'>Your driver is coming at 3:35</p>
                                                        <div className='w-full h-[3px] bg-gray-300 my-4'></div>
                                                    </div>
                                                    <div className='p-4 flex flex-row justify-between'>
                                                        <div className='flex flex-row gap-4 items-center justify-center'>
                                                            <Link to=""><Button className='w-20 h-20 bg-black rounded-xl'></Button></Link>
                                                            <div className='flex flex-col '>
                                                                <p className='text-xl '>{driver}</p>
                                                                <p className='text-base text-gray-700 '>{distanceee}m {'('} 5mins Away {')'}</p>
                                                                <div className='flex flex-row gap-1'>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-yellow-600">
                                                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                                                    </svg>
                                                                    <p className='text-gray-700'>4.9</p>
                                                                    <p className='text-gray-700'>{'('}531 reviews{')'}</p>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='w-full h-[3px] bg-gray-300 my-4'></div>

                                                </div>
                                            </Drawer>
                                        </Button>
                                    </div>
                                </div>
                                <div>
                                    {showPopup && (
                                        <div className='flex p-6 border border-1 bg-white rounded-lg '>
                                            <div className=" flex flex-col gap-1">
                                                <p className='leading-tight'>Time To Reach: {Math.ceil(journeyDetails.duration / 60)} minutes</p>
                                                <p className='leading-tight'>Distance to destination: <span className='font-medium'>{Math.ceil(journeyDetails.distance / 1000)}</span> km</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='flex flex-col mb-24 gap-4 pointer-events-auto'>
                                <div className="flex flex-row justify-between items-center">
                                    {
                                        sourceLat && sourceLng && destinationLat && destinationLng ? (
                                            <Button className='bg-black text-white p-4 pl-6 pr-6' onClick={handleRequestRide}>
                                                Book a Cab
                                            </Button>
                                        ) : (
                                            <Button variant='ghost' disabled className='text-white p-4 pl-6 pr-6 cursor-not-allowed'>
                                                Book a Cab
                                            </Button>
                                        )
                                    }
                                    <Button className='bg-black flex items-center justify-center p-4 rounded-lg'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64" />
                                        </svg>
                                    </Button>
                                </div>
                                <div className='flex flex-col gap-2'>

                                    <div className='flex flex-col border border-2 border-black bg-white p-4 rounded-xl gap-4'>
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
                                                            onClick={() => handleSelectOptionSource(setSource, setSourceList, item.name, item)}
                                                            className='p-2 hover:bg-gray-200 cursor-pointer'
                                                        >
                                                            {item.name}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        {/* destination field */}
                                    </div>
                                    <div className='flex flex-col border border-1 border-black bg-white p-4 rounded-xl gap-2'>

                                        <div className='flex flex-row items-center justify-stretch rounded-xl relative'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                            </svg>
                                            <input
                                                type="text"
                                                onChange={(e) => setDestination(e.target.value)}
                                                onFocus={() => handleInputFocus(setShowDestinationDropdown)}
                                                onBlur={() => handleInputBlur(setShowDestinationDropdown)}
                                                className='bg-transparent outline-none p-2 w-full'
                                                placeholder='Where to?'
                                                value={destination}
                                            />
                                            {showDestinationDropdown && destinationList.length > 0 && (
                                                <div className='absolute bg-white border border-gray-200 rounded shadow-lg bottom-full mb-2'>
                                                    {destinationList.map((item, index) => (
                                                        <div
                                                            key={index}
                                                            onClick={() => handleSelectOptionDestination(setDestination, setDestinationList, item.name, item)}
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
                        </div>
                        <div className='absolute z-10 bottom-0 w-full'>
                            <Navbar />
                        </div>
                    </div >
                </div>
            </div>
        </>
    )
}

export default Home
