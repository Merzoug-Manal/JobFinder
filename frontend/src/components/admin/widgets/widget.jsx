import React, { useEffect, useState } from 'react';
import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ContactPageIcon from "@mui/icons-material/ContactPage";
import BusinessIcon from "@mui/icons-material/Business";
import axios from 'axios';

const Widget = ({ type }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let apiUrl = '';
                if (type === "demandeur") {
                    apiUrl = 'http://localhost:8000/statistiques/demandeurs';
                } else if (type === "employeur") {
                    apiUrl = 'http://localhost:8080/statistiques/employeurs';
                } else if (type === "jobOffer") {
                    apiUrl = 'http://localhost:8080/statistiques/nombreOffresEmploi';
                }

                const response = await axios.get(apiUrl);
                const countData = response.data;
                setCount(countData);
            } catch (error) {
                console.log('Une erreur s\'est produite lors de la récupération des données :', error);
            }
        };

        fetchData();
    }, [type]);

    let diff = 14;

    let data;
    switch (type) {
        case "demandeur":
            data = {
                title: "Applicants",
                isMoney: false,
                link: "See all Applicants",
                icon: (
                    <ContactPageIcon
                        className="icon"
                        style={{
                            color: "crimson",
                            backgroundColor: "rgba(255, 0, 0, 0.2)",
                        }}
                    />
                ),
            };
            break;
        case "employeur":
            data = {
                title: "Employers",
                isMoney: false,
                link: "See all Employers",
                icon: (
                    <BusinessIcon
                        className="icon"
                        style={{
                            backgroundColor: "rgba(218, 165, 32, 0.2)",
                            color: "goldenrod",
                        }}
                    />
                ),
            };
            break;
        case "jobOffer":
            data = {
                title: "Job Offers",
                isMoney: false,
                link: "See all Job Offers",
                icon: (
                    <WorkOutlineIcon
                        className="icon"
                        style={{
                            backgroundColor: "rgba(128, 0, 128, 0.2)",
                            color: "purple",
                        }}
                    />
                ),
            };
            break;
        default:
            break;
    }

    return (
        <div className="widget">
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">{count}</span>
                <span className="link">{data.link}</span>
            </div>
            <div className="right">
                <div className="percentage positive">
                    <KeyboardArrowUpIcon />
                    {diff}%
                </div>
                {data.icon}
            </div>
        </div>
    );
};

export default Widget;
