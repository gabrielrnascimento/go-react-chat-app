import { connect, sendMsg } from '../../../api';
import React, { useEffect, useState } from 'react';
import { ChatHistory, ChatMessage } from '../../atoms/ChatHistory';
import ChatInput from '../../atoms/ChatInput';

function Chat() {
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

    useEffect(() => {
        connect((msg: MessageEvent) => {
            try {
                const parsedMessage = JSON.parse(msg.data);
                setChatHistory([...chatHistory, parsedMessage]);
            } catch (e) {
                console.error('Failed to parse incoming message: ', e);
            }
        });
    }, [chatHistory]);

    const send = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            sendMsg(event.currentTarget.value);
            event.currentTarget.value = '';
        }
    };

    return (
        <div>
            <ChatHistory chatHistory={chatHistory} />
            <ChatInput send={send} />
        </div>
    );
}

export default Chat;
