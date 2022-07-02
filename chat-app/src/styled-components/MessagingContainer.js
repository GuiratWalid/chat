import styled from 'styled-components';

const MessagingContainer = styled.div`
    padding-top: 1rem;
    display: grid;
    grid-template-rows: 10% 75% 15%;
    gap: 0.1rem;
    overflow: hidden;
    @media screen and (min-width: 720px) and (max-width: 1080px){
        grid-auto-rows: 15% 70% 15%;
    }
    .chat-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding 0 2rem;
        .user-details {
            padding-top: 15px;
            display: flex;
            align-items: center;
            gap 1rem;
            .avatar {
                img {
                    height: 3rem;
                }
            }
            .username {
                h3 {
                    color: white;
                }
            }
        }
    }
`;


export default MessagingContainer;