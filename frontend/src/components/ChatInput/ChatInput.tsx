import React from 'react';
import './ChatInput.scss';

interface ChatInputProps {
    send: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const ChatInput = (props: ChatInputProps) => {
    return (
        <div className="ChatInput">
            <input
                onKeyDown={props.send}
                placeholder={'Type a message... Press Enter to send'}
            />
        </div>
    );
};
