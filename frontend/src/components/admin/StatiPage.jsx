import React from 'react'
import Sidebar from "./navs/sidebar";
import Navbar from "./navs/Navbar";
import Grid from '@mui/material/Grid';
import AdminDashboard from "./statistics/AdminDashboard";
import StatisticSexe from "./statistics/SataisticSexe";
import AgeStatisticsChart from './statistics/AgeStatisticsChart';
import StatisticSkill from "./statistics/StatisticSkill";



const StatiPage = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
            <StatisticSexe />
            <AdminDashboard />
            <StatisticSkill />        
          </div>
        <div className="chartContainer">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid container spacing={2}>
              <Grid item sm={8}>
                <AgeStatisticsChart />
              </Grid>
            </Grid>
          </div>

        
        </div>
      </div>
    </div>
  );
}

export default StatiPage