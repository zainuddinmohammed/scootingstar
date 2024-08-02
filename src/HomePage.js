import React from 'react';
import './HomePage.css'
import './Background.css'
import { useNavigate } from 'react-router-dom';

import icon from './logo.png'

function HomePage() {

    const navigate = useNavigate(); // Create a navigate function

    const handleRedirectToOrder = () => {
        navigate('/order'); // Navigate back to the home page
    };

    return (
        <div className="background">

            <img src={icon} alt="profile" className="icon"/>

            <h1>Welcome to the Official Scooting Star Website!</h1>

            <hr className="line"/>

            <p>Here, you can book an order to get your event advertised around campus!</p>

            <br/>

            <button onClick={handleRedirectToOrder}>Book an Order!</button>


            <p>If you don't know what this is all about, then check out the Instagram account{' '}
                <a
                    href="https://www.instagram.com/scootingstar?igsh=amdvdDE0a2Mzc3hl"
                    className="button linkedin-button"
                    target="_blank" rel="noopener noreferrer"
                >
                    @scootingstar
                </a>
                !
            </p>

        </div>
    );
}

export default HomePage;