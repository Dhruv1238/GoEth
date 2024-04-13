import React from 'react';

// Function to calculate the score for a single driver
function calculateScore(driver, passenger) {
    let bid_score = 1 / driver.bid_range * 0.25;
    let arrival_score = 1 / driver.estimated_arrival_time * 0.5;
    let rating_score = driver.rating * 0.2;
    let vehicle_score = driver.vehicle_type === passenger.vehicle_preference ? 0.25 : 0.1;
    let bid_overlap_score = Math.min(driver.bid_range, passenger.bid_range) / Math.max(driver.bid_range, passenger.bid_range) * 0.15;

    let overall_score = bid_score + arrival_score + rating_score + vehicle_score + bid_overlap_score;
    return overall_score;
}

// DriverMatcher component
const DriverMatcher = ({ passenger, drivers }) => {
    // Initialize objects to store ranked drivers for the passenger
    let rankedDrivers = [];

    // Calculate scores and rank drivers for the passenger
    drivers.forEach(driver => {
        let score = calculateScore(driver, passenger);
        rankedDrivers.push({ driver, score });
    });

    // Sort drivers by score in descending order
    rankedDrivers.sort((a, b) => b.score - a.score);

    return (
        <div>
            <h2>Ranked Drivers for Passenger {passenger.id}:</h2>
            <ul>
                {rankedDrivers.map((driverObj, index) => (
                    <li key={index}>
                        Rank {index + 1}: Driver {driverObj.driver.id}, ETA: {driverObj.driver.estimated_arrival_time} minutes, Score: {driverObj.score.toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DriverMatcher;
