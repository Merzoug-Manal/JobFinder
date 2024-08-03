import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminDashboard.css';

const StatisticFunction = () => {
    const [selectedFunction, setSelectedFunction] = useState('');
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetchData();
    }, [selectedFunction]);

    const fetchData = async () => {
        if (selectedFunction) {
            try {
                const url = `http://localhost:8080/statistiques/employeurs/FunctionEntreprise/${FunctionEntreprise}`;
                const response = await axios.get(url);
                setCount(response.data);
            } catch (error) {
                console.log(error);
            }
        } else {
            setCount(0);
        }
    };

    const handleSkillChange = (e) => {
        setSelectedFunction(e.target.value);
    };


    return (
        <div className="card">
            <div className="card-body">
                <div className="select-container">
                    <select  value={selectedFunction} onChange={handleSkillChange}>
                        <option value="">Entreprise Function</option>
                        <option value="it">Information Technology</option>
                        <option value="finance">Finance</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="education">Education</option>
                        <option value="engineering">Engineering</option>
                        <option value="marketing">Marketing</option>
                        <option value="sales">Sales</option>
                        <option value="hospitality">Hospitality</option>
                        <option value="retail">Retail</option>
                        <option value="manufacturing">Manufacturing</option>
                        <option value="transportation">Transportation</option>
                        <option value="construction">Construction</option>
                        <option value="media">Media</option>
                        <option value="government">Government</option>
                        <option value="nonprofit">Nonprofit</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="result"> {count}</div>
            </div>
        </div>
    );
};

export default  StatisticFunction;
