import React from 'react'
import DriverMatcher from '../components/Algorithm'

export default function Test() {

    const passenger = {
        id: 1,
        vehicle_preference: "NON-AC",
        bid_range: 100 // Example bid range for the passenger
    };

    const drivers = [
        { id: 1, rating: 8.7, vehicle_type: "AC", bid_range: 120, estimated_arrival_time: 8 },
        { id: 2, rating: 9.5, vehicle_type: "NON-AC", bid_range: 50, estimated_arrival_time: 13 },
        { id: 3, rating: 7.2, vehicle_type: "AC", bid_range: 150, estimated_arrival_time: 5 },
        { id: 4, rating: 6.8, vehicle_type: "NON-AC", bid_range: 80, estimated_arrival_time: 10 },
        { id: 5, rating: 9.0, vehicle_type: "AC", bid_range: 100, estimated_arrival_time: 7 }
    ];

    return (
        <>
            <DriverMatcher passenger={passenger} drivers={drivers} />
        </>
    )
}
