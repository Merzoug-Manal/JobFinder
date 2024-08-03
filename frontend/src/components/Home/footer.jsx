import React from 'react'
import logomini from '../../assets/logo-mini.png'
import { BsTwitter } from 'react-icons/bs'
import { SiLinkedin } from 'react-icons/si'
import { BsFacebook } from 'react-icons/bs'

const footer = () => {
  return (
    <div className='container'>
    <div className='footer-wrapper'>
        <div className='footer-section-one'>
            <div className='footer-logo-container'>
                <img src={logomini} alt="" />
            </div>
            <div className='footer-icons'>
                <BsTwitter/>
                <BsFacebook/>
                <SiLinkedin/>
            </div>
        </div>
        <div className='footer-section-two'>
        <div className="footer-section-columns">
          <span>Qualtiy</span>
          <span>Help</span>
          <span>Share</span>
          <span>Carrers</span>
          <span>Testimonials</span>
          <span>Work</span>
        </div>
        <div className="footer-section-columns">
          <span>244-5333-7783</span>
          <span>hello@job.com</span>
          <span>press@job.com</span>
          <span>contact@job.com</span>
        </div>
        <div className="footer-section-columns">
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </div>

        </div>

    </div>
    </div>
  )
}

export default footer