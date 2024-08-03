import React from 'react'
import user from '../../assets/user.png'
import dollar from '../../assets/dollar.png'
import file from "../../assets/file.png";
import {Zoom} from "react-awesome-reveal";




const steps = () => {
    const stepInfos = [
        {   
            id: 0,
            icon: user,
            title: "Create an account",
            text: "Fill in your personnal data to register in the website",
        },
        {
            id: 1,
            icon: file,
            title: "Create your CV",
            text: "Complete your skills and create your CV.",
        },
        {
            id: 2,
            icon: dollar,
            title: "Find a job" ,
            text: "Search for your dream job depending on your skills.",
        },
    ];
  return (
    <div className='work-section-wrapper'>
        <div className='work-section-top'>
            <h1 className='primary-subheading'> How it works </h1>
        </div>
        <div className='work-section-bottom' >
            {stepInfos.map(data => 
             <Zoom>
                <div className='work-section-info' key={data.id}> 
                    <div className='info-boxes-img-container'> 
                        <img src={data.icon} alt="" />
                    </div>
                    <h2>{data.title}</h2>
                    <p>{data.text}</p>
                </div>
             </Zoom>
            )}
        </div>
    </div>
  )
};

export default steps;