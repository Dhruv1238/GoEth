import React, { useEffect, useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapSearch = () => {
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [sourceChange, setSourceChange] = useState(false);
    const [destinationChange, setDestinationChange] = useState(false);
    const [addressList, setAddressList] = useState([]);
    const [destinationList, setDestinationList] = useState([]);
    const [userLocation, setUserLocation] = useState();

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
            getAddressList(source, setAddressList);
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

    return (
        <>
            <div>
                <label htmlFor="">Where from?</label>
                <input type="text"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                />
                <div className='text-white shadow-md w-full rounded-md'>
                    {addressList.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => { setSource(item.name); setAddressList([]) }}
                            className={source === item.name ? 'bg-blue-500' : ''}
                        >
                            {item.name}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <label htmlFor="">Where to?</label>
                <input type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                />
                <div className='text-white shadow-md w-full rounded-md'>
                    {destinationList.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => { setDestination(item.name); setDestinationList([]) }}
                            className={destination === item.name ? 'bg-blue-500' : ''}
                        >
                            {item.name}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                Map
                <div>
                    <Map
                        mapboxAccessToken={PUBLIC_KEY}
                        initialViewState={{
                            longitude: 72.9005454139102,
                            latitude: 19.072655410514404,
                            zoom: 14
                        }}
                        style={{ width: 600, height: 400 }}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                    >
                        <Marker
                            longitude={userLocation?.longitude || 72.9005454139102}
                            latitude={userLocation?.latitude || 19.072655410514404}
                        >
                            <img src="./marker.png" />
                        </Marker>
                    </Map>
                </div>
            </div>
        </>
    );
};

export default MapSearch;
