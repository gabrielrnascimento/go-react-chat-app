import { connect, sendMessage } from '../../../api';
import React, { useEffect, useState } from 'react';
import { ChatHistory, ChatMessage } from '../../atoms/ChatHistory';
import Input from '../../atoms/ChatInput';

interface ChatProps {
    username: string;
}

function Chat({ username }: ChatProps) {
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
            sendMessage(event.currentTarget.value);
            event.currentTarget.value = '';
        }
    };

    return (
        <div>
            <ChatHistory chatHistory={chatHistory} username={username} />
            <Input
                onEnter={send}
                placeholder={'Type a message... Press Enter to send'}
            />
        </div>
    );
}

export default Chat;
