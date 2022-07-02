import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ChatContainer from '../styled-components/ChatContainer';
import { allUsersRoute, host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import Messaging from '../components/Messaging';
import { io } from 'socket.io-client';


const Chat = () => {

    const socket = useRef();

    const [contacts, setContacts] = useState([]);

    const [currentUser, setCurrentUser] = useState(undefined);

    const [currentChat, setCurrentChat] = useState(undefined);

    const navigate = useNavigate();

    useEffect(() => {
        const getCurrentUser = async () => {
            const user = localStorage.getItem('user');
            if (!user)
                navigate('/login');
            else {
                const data = await JSON.parse(user);
                setCurrentUser(data);
            }
        };
        getCurrentUser();
    }, [navigate]);

    useEffect(() => {
        if (currentUser) {
            socket.current = io(host);
            socket.current.emit('add-user', currentUser._id);
        }
    }, [currentUser]);

    useEffect(() => {
        const getContacts = async () => {
            if (currentUser) {
                if (currentUser.isAvatarImageSet) {
                    const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                    setContacts(data.data);
                }
                else {
                    navigate('/setAvatar');
                }
            }
        };
        getContacts();
    }, [currentUser, navigate]);

    const handleChatChange = chat => {
        setCurrentChat(chat);
    };

    return (
        <ChatContainer>
            <div className='container'>
                <Contacts
                    contacts={contacts}
                    currentUser={currentUser}
                    changeChat={handleChatChange}
                />
                {
                    currentChat === undefined ? (
                        <Welcome
                            currentUser={currentUser}
                        />
                    ) : (
                        <Messaging
                            currentChat={currentChat}
                            currentUser={currentUser}
                            socket={socket}
                        />
                    )
                }
            </div>
        </ChatContainer>
    )
};

export default Chat;