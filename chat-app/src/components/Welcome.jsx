import React from 'react';
import WelcomeContainer from '../styled-components/WelcomeContainer';

const Welcome = ({ currentUser }) => {
    return (
        <WelcomeContainer>
            <img
                src="https://media.giphy.com/media/Icv4aj5jxTiPFMdbV7/giphy.gif"
                alt="Welcome robot"
            />
            <h1>
                Welcome, {currentUser && <span>{currentUser.username + " "}</span>}!
            </h1>
            <h3>Please select a chat to Start Messaging.</h3>
        </WelcomeContainer>
    );
};


export default Welcome;