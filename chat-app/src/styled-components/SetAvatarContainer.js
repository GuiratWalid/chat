import styled from 'styled-components';

const SetAvatarContainer = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-color: #131324;
    height: 100vh;
    width: 100vw;
    .loader{
        max-inline-size: 100%;
    }
    .title-container{
        h1{
            color: white;
        }
    }
    .avatars{
        display:flex;
        gap: 2rem;
        .avatar{
            border: 0.4rem solid transparent;
            padding: 0.4 rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;
            img{
                height: 6rem;
            }
        }
        .selected {
            border: 0.4rem solid rgb(100,210,255);
            padding: 4px;
        }
    }
    .submit-btn{
        background-color: rgb(247,148,29);
        color: white;
        padding: 1rem 3rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        transition: 0.5s ease-in-out;
        &:hover{
            background-color: rgb(250,185,105);
        }
    }
`;


export default SetAvatarContainer;