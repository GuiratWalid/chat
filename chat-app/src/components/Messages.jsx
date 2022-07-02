import React from 'react';
import MessagesContainer from '../styled-components/MessagesContainer';
import { v4 as uuidv4 } from 'uuid';


const Messages = ({ messages, scrollRef }) => {


    return (
        <MessagesContainer>
            {
                messages !== [] &&
                messages.map((message, index) => {
                    return (
                        <div
                            ref={scrollRef}
                            key={uuidv4()}
                        >
                            <div className={`message ${message.fromSelf ? 'sended' : 'received'}`}>
                                <div className="content">
                                    <p>
                                        {message.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </MessagesContainer>
    );
};

export default Messages;