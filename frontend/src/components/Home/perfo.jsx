import React from "react";
import { Fade } from "react-awesome-reveal";

const { useState, useEffect, useRef } = React;

function useInterval(callback, delay,max) {
  const savedCallback = useRef();
  
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    let id = setInterval(() => {
      savedCallback.current();
    }, delay);
    return () => clearInterval(id);
  }, [delay]);
}

const About = () => {

  const [cntJob, setCntjob]= useState(0);
  const [cntUser, setCntUser]= useState(0);
  const [cntRec, setCntRec]= useState(0);
  const max1= 100; const max2= 80 ;const max3= 56;

  useInterval(() => {
    if (cntJob <max1) {
      setCntjob(cntJob + 1);
    }  
  }, 60,max1);
  
  useInterval(() => {
    if (cntUser <max2) {
      setCntUser(cntUser + 1);
    }  
  }, 60,max2);
  
  useInterval(() => {
    if (cntRec <max3) {
      setCntRec(cntRec + 1);
    }  
  }, 60,max3);

  return (
    <Fade bottom>
    <div className="about-section-container">
      <div className="about-section-text-container">
        <p className="secondary-subheading">Our performance</p>       
      </div>
      <div className="perf">
        <h2>+ {cntUser}K</h2>
        <p>users</p>
      </div>
      <div className="perf">
        <h2>+{cntJob}K</h2>
        <p>Jobs</p>
      </div>
      <div className="perf">
        <h2>+{cntRec}K</h2>
        <p>Recruitements</p>
      </div>
    </div>
    </Fade>
  );
};

export default About;