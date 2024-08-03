import React, { useEffect, useState } from 'react';
import Sidebar from './navs/sidebar';
import Navbar from './navs/Navbar';
import Widget from './widgets/widget';
import "./css/home.scss";
import "./css/dark.scss";
import DemTable from './table/DemTable';
import EmplTable from './table/EmplTable';
import Grid from '@mui/material/Grid';
import { Chart } from 'chart.js/auto';
import axios from 'axios';
import StatisticsChart from "./statistics/StatisticsChart";
 import AdminDashboard from "./statistics/AdminDashboard";
import StatisticSexe from "./statistics/SataisticSexe";
import AgeStatisticsChart from './statistics/AgeStatisticsChart';
import StatisticSkill from "./statistics/StatisticSkill";
import StatisticSecteur from "./statistics/OffreSect";


const AdminHome = () => {
  const [demandeursCount, setDemandeursCount] = useState(0);
  const [employeursCount, setEmployeursCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseDemandeurs = await axios.get('http://localhost:8000/statistiques/demandeurs');
        console.log('Réponse des demandeurs :', responseDemandeurs.data);
        const demandeursData = responseDemandeurs.data;
        setDemandeursCount(demandeursData);
       
        const responseEmployeurs = await axios.get('http://localhost:8080/statistiques/employeurs');
       
        const employeursData = responseEmployeurs.data;
        setEmployeursCount(employeursData);
       
        buildChart(demandeursData, employeursData);
      } catch (error) {
        console.log('Une erreur s\'est produite lors de la récupération des données :', error);
      }
    };

    fetchData();

  }, []);

  let chart = null;

  const buildChart = (demandeursCount, employeursCount) => {
    const chartData = {
      labels: ['Applicants', 'Employer'],
      datasets: [{
        data: [demandeursCount, employeursCount],
        backgroundColor: ['blue', '#8c6cff'],
        hoverBackgroundColor: ['blue', '#8c6cff']
      }]
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };

    const chartElement = document.getElementById('adminChart');

    if (chart) {
      chart.destroy();
    }

    chart = new Chart(chartElement, {
      type: 'pie',
      data: chartData,
      options: chartOptions
    });
  };

  return (
      <div className="home dark">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="widgets">
            <Widget type="demandeur" count={demandeursCount} />
            <Widget type="employeur" count={employeursCount} />
            <Widget type="jobOffer" />
          </div>
          <div className="chartContainer">
            <Grid container spacing={2}>
              <Grid item sm={6}>
                <canvas id="adminChart"></canvas>

              </Grid>

              <Grid item sm={6}>
                <StatisticsChart />

              </Grid>
              
            </Grid>
          </div>
        

          <div className="listContainer">
            <Grid container spacing={2}>
              <Grid item sm={6}>
                <DemTable />
              </Grid>
              <Grid item sm={6}>
                <EmplTable />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
  );
};

export default AdminHome;
