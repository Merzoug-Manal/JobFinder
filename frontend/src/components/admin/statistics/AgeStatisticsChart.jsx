import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { Chart } from 'chart.js/auto';

const AgeStatisticsChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/statistiques/demandeurs/age');
            const data = response.data;

            const ageCategories = ['18-22', '23-27', '28-34', '35-44', '45+'];
            const categoryCounts = Array(ageCategories.length).fill(0);

            // Catégoriser les âges et compter les occurrences pour chaque catégorie
            Object.keys(data).forEach((age) => {
                const count = data[age];
                for (let i = 0; i < ageCategories.length; i++) {
                    const [minAge, maxAge] = ageCategories[i].split('-');
                    if (age >= minAge && age <= maxAge) {
                        categoryCounts[i] += count;
                        break;
                    }
                }
            });

            // Créer le jeu de données pour le graphique
            const chartData = {
                labels: ageCategories,
                datasets: [
                    {
                        label: 'Number of job seekers',
                        data: categoryCounts,
                        backgroundColor: '#6439ff',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            };

            // Détruire le graphique précédent s'il existe
            if (chartRef.current) {
                chartRef.current.destroy();
            }

            // Créer le nouveau graphique avec Chart.js
            const ctx = document.getElementById('ageStatisticsChart').getContext('2d');
            chartRef.current = new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            stepSize: 1,
                        },
                    },
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    return <canvas id="ageStatisticsChart"></canvas>;
};

export default AgeStatisticsChart;
