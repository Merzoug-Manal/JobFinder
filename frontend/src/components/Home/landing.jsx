import React from 'react'
import './home.css';
import Home from './Home';
import Steps from './steps';
import About from './perfo';
import Contact from './contact';
import Footer from './footer';
// import Card from './card';

const landing = () => {
  return (
    <div className="Landing">
        <Home/>
        <About/>
        <Steps/>
        <Contact/>    
        <Footer/>    
    </div>
  )
}

export default landing