import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BiPowerOff } from 'react-icons/bi';
import LogoutContainer from '../styled-components/LogoutContainer';

const Logout = () => {

    const navigate = useNavigate();

    const handleClick = async () => {
        localStorage.clear();
        navigate('/login');
    }

    return (
        <LogoutContainer
            onClick={handleClick}
        >
            <BiPowerOff />
        </LogoutContainer>
    );
};

export default Logout;