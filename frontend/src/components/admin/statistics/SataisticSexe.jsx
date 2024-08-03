import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminDashboard.css';

const StatisticSexe = () => {
    const [dataType, setDataType] = useState('');
    const [selectedSexe, setSelectedSexe] = useState('');
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetchData();
    }, [dataType, selectedSexe]);

    const fetchData = async () => {
        if (dataType && selectedSexe) {
            try {
                let url = '';

                if (dataType === 'demandeur') {
                    url = `http://localhost:8000/statistiques/demandeurs/sexe/${selectedSexe}`;
                } else {
                    url = `http://localhost:8000/statistiques/demandes-emploi/sexe/${selectedSexe}`;
                }
                const response = await axios.get(url);
                setCount(response.data);
            } catch (error) {
                console.log(error);
            }
        }else {
            setCount(0);
        }
    };

    const handleDataTypeChange = (e) => {
        setDataType(e.target.value);
        setSelectedSexe('');
    };

    const handleWilayaChange = (e) => {
        setSelectedSexe(e.target.value);
    };

    return (
      <div className="widget stati">
        <div className="left">
        <span>Data by gender</span>
          <select className='staticSelect' value={dataType} onChange={handleDataTypeChange}>
            <option value="">Type of Data</option>
            <option value="demandeur">Applicants</option>
            <option value="demande">Job Application</option>
          </select>
          <select className='staticSelect' value={selectedSexe} onChange={handleWilayaChange}>
            <option value="">Select Sexe</option>
            <option value="Femelle">Female</option>
            <option value="Male">Male</option>
          </select>
        </div>
        <div className="right">
          <div className="result"> {count}</div>
        </div>
      </div>
    );
};

export default StatisticSexe;
