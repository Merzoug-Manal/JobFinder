import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminDashboard.css';

const StatisticSecteur = () => {
    const [selectedSecteur, setSelectedSecteur] = useState('');
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetchData();
    }, [selectedSecteur]);

    const fetchData = async () => {
        if (selectedSecteur) {
            try {
                const url = `http://localhost:8080/statistiques/offres/secteur/${selectedSecteur}`;
                const response = await axios.get(url);
                setCount(response.data);
                console.log(response.data);
                console.log(count);
            } catch (error) {
                console.log(error);
            }
        } else {
            setCount(0);
        }
    };

    const handleSkillChange = (e) => {
        setSelectedSecteur(e.target.value);
    };


    return (
      <div className="widget stati">
        <div className="left">
          <span>Job Offers by Sector</span>
          <select
            className="staticSelect"
            value={selectedSecteur}
            onChange={handleSkillChange}
          >
            <option value="">Sector Of Activity</option>
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
        <div className="right">
          <div className="result"> {count}</div>
        </div>
      </div>
    );
};

export default StatisticSecteur;
