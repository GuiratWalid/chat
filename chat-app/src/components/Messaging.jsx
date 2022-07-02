import { useState, useEffect, useRef } from 'react';
import MessagingContainer from '../styled-components/MessagingContainer';
import ChatInput from './ChatInput';
import Logout from './Logout';
import Messages from './Messages';
import axios from 'axios';
import { getAllMessagesRoute, sendMessageRoute } from '../utils/APIRoutes';


const Messaging = ({ currentChat, currentUser, socket }) => {

    const [messages, setMessages] = useState([]);

    const [arrivalMessage, setArrivalMessage] = useState(null);

    const scrollRef = useRef();

    useEffect(() => {
        const getAllMessages = async () => {
            const response = await axios.post(getAllMessagesRoute, {
                from: currentUser._id,
                to: currentChat._id,
            });
            setMessages(await response.data);
        };
        getAllMessages();
    }, [currentChat]);

    const handleSendMsg = async msg => {
        await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg,
        });
        socket.current.emit('send-msg', {
            to: currentChat._id,
            from: currentUser._id,
            message: msg,
        });

        const msgs = [...messages];
        msgs.push({
            fromSelf: true,
            message: msg,
        });
        setMessages(msgs);
    };

    useEffect(() => {
        if (socket.current) {
            socket.current.on('msg-receive', msg => {
                console.log(msg);
                setArrivalMessage({
                    fromSelf: false,
                    message: msg,
                });
            });
        }
    }, []);

    useEffect(() => {
        arrivalMessage && setMessages(prev => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({
            behaviour: 'smooth',

        })
    }, [messages]);

    return (
        <MessagingContainer>
            <div className='chat-header'>
                <div className='user-details'>
                    <div className='avatar'>
                        <img
                            src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                            alt="Avatar"
                        />
                    </div>
                    <div className='username'>
                        <h3>
                            {currentChat.username}
                        </h3>
                    </div>
                </div>
                <Logout />
            </div>
            <Messages
                messages={messages}
                scrollRef={scrollRef}
            />
            <ChatInput handleSendMsg={handleSendMsg} />
        </MessagingContainer>
    );
};


export default Messaging;