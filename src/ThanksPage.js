import React from 'react';

import { useNavigate } from 'react-router-dom';

import './ThanksPage.css'
import './Background.css'

import icon from './logo.png'

function ThanksPage() {

    const navigate = useNavigate(); // Create a navigate function

    const handleBackToHome = () => {
        navigate('/'); // Navigate back to the home page
    };

    return (
        <div className="background">

            <img src={icon} alt="profile" className="icon"/>

            <h1>Your Order Has Been Submitted!</h1>

            <hr className="line"/>

            <h2>Thank You For Your Request!</h2>
            <p>I will reach out to you soon for confirmation and payment details</p>

            <br/><br/><br/><br/><br/><br/><br/><br/>

            <button onClick={handleBackToHome}>Back to Home Page</button>

        </div>
    );
}

export default ThanksPage;