import React from "react";
import "./ChatHistory.scss";

export interface ChatMessage {
    data: string;
}

interface ChatHistoryProps {
    chatHistory: ChatMessage[];
}

export const ChatHistory: React.FC<ChatHistoryProps> = ({ chatHistory }) => {
    return (
        <div className="ChatHistory">
            <h2>Chat History</h2>
            {chatHistory.map((msg, index) => (
                <p key={index}>{msg.data}</p>
            ))}
        </div>
    );
};
