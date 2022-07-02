import styled from 'styled-components';

const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items:center;
background-color: #131324;
.brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img{
        height: 8rem;
    }
}
h1{
    color:white;
    text-transform: uppercase;
}
form{
    display:flex;
    flex-direction:column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    box-shadow: 8px 8px rgb(50,50,50, 0.1);
    input{
        background-color: transparent;
        padding: 1rem;
        border: 0.1rem solid rgb(0,173,239);
        border-radius: 0.4rem;
        color: white;
        font-size: 1rem;
        &:focus{
            border: 0.1rem solid #997af0;
            outline: none;
        }
    }
    button{
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
    span {
        color: white;
        text-transform: capitalize;
        a{
            color: rgb(0,173,239);
            text-decoration: none;
            text-transform: uppercase;
            font-weight: bold;
        }
    }
}
`;


export default FormContainer;