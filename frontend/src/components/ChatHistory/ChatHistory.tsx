import React from 'react';
import Message from '../Message';
import './ChatHistory.scss';

export interface ChatMessage {
    type: number;
    body: string;
    user: string;
}

interface ChatHistoryProps {
    chatHistory: ChatMessage[];
}

export const ChatHistory: React.FC<ChatHistoryProps> = ({ chatHistory }) => {
    return (
        <div className="ChatHistory">
            <h2>Chat History</h2>
            <div className="messages">
                {chatHistory.map((message, index) => (
                    <Message
                        key={index}
                        content={message.body}
                        user={message.user}
                    />
                ))}
            </div>
        </div>
    );
};
