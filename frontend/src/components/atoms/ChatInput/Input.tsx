import React from 'react';
import './ChatInput.scss';

interface ChatInputProps {
    onEnter: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    placeholder: string;
}

export const Input = (props: ChatInputProps) => {
    return (
        <div className="ChatInput">
            <input onKeyDown={props.onEnter} placeholder={props.placeholder} />
        </div>
    );
};
