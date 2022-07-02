import styled from 'styled-components';

const WelcomeContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    img {
        height: 15rem;
    }
    h1{
        font-weight: 600;
        font-size: 2rem;
    }
    span {
        color: rgb(247,148,29);
        font-weight: 900;
    }
    h3 {
        color: rgb(180,180,180);
    }
`;


export default WelcomeContainer;