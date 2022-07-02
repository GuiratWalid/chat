import { useState, useEffect } from 'react';
import Logo from '../assets/Logo.png';
import ContactsContainer from '../styled-components/ContactsContainer';


const Contacts = ({ contacts, currentUser, changeChat }) => {

    const [user, setUser] = useState({
        username: undefined,
        image: undefined,
    });

    const [selectedContact, setSelectedContact] = useState(undefined);

    useEffect(() => {
        if (currentUser)
            setUser({
                username: currentUser.username,
                image: currentUser.avatarImage,
            });
    }, [currentUser]);

    const changeCurrentChat = (index, contact) => {
        setSelectedContact(index);
        changeChat(contact);
    };


    return (
        <>
            {
                user.username && user.image && (
                    <ContactsContainer>
                        <div className='brand'>
                            <img
                                src={Logo}
                                alt="Logo"
                            />
                            <h3>
                                الأصدقاء
                            </h3>

                        </div>
                        <div className='contacts'>
                            {
                                contacts.map((contact, index) => (
                                    <div
                                        onClick={() => changeCurrentChat(index, contact)}
                                        key={index}
                                        className={`contact ${index === selectedContact ? 'selected' : ''}`}
                                    >
                                        <div className='avatar'>
                                            <img
                                                src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                                alt="Avatar"
                                            />
                                        </div>
                                        <div className='username'>
                                            <h3>
                                                {contact.username}
                                            </h3>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='current-user'>
                            <div className='avatar'>
                                <img
                                    src={`data:image/svg+xml;base64,${user.image}`}
                                    alt="Avatar"
                                />
                            </div>
                            <div className='username'>
                                <h2>
                                    {user.username}
                                </h2>
                            </div>
                        </div>
                    </ContactsContainer>
                )
            }
        </>
    );
};

export default Contacts;