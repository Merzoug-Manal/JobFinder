import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import './adminDashboard.css';
const StatisticsChart = () => {
    const [offerData, setOfferData] = useState(null);
    const [demandData, setDemandData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const year = new Date().getFullYear();
            const months = Array.from({ length: 12 }, (_, i) => i + 1);
            const offerApiRequests = months.map(month =>
                axios.get(`http://localhost:8080/statistiques/offres/mois/${year}/${month}`)
            );

            const demandApiRequests = months.map(month =>
                axios.get(`http://localhost:8000/statistiques/demandes/mois/${year}/${month}`)
            );

            const offerResponses = await Promise.all(offerApiRequests);
            const offerData = offerResponses.map(response => response.data);
            setOfferData(offerData);

            const demandResponses = await Promise.all(demandApiRequests);
            const demandData = demandResponses.map(response => response.data);
            setDemandData(demandData);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className='diagrammeMois'>
            {offerData && demandData ? (
                <Line
                    data={{
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [
                            {
                                label: 'Job Offers',
                                data: offerData,
                                fill: false,
                                borderColor: '#6439ff',
                            },
                            {
                                label: 'Job Applications',
                                data: demandData,
                                fill: false,
                                borderColor: 'red',
                            },
                        ],
                    }}
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
export default StatisticsChart;
