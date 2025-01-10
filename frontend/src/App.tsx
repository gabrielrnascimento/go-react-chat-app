import './App.scss';
import Header from './components/atoms/Header';
import { useState } from 'react';
import Input from './components/atoms/ChatInput';
import Chat from './components/molecules/Chat/Chat.tsx';
import { sendUsername } from './api';

function App() {
    const [username, setUsername] = useState<string>('');

    const send = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setUsername(event.currentTarget.value);
            sendUsername(event.currentTarget.value);
        }
    };

    return (
        <div>
            <Header />
            {username ? (
                <Chat username={username} />
            ) : (
                <Input
                    onEnter={send}
                    placeholder={'Type your username and press Enter'}
                />
            )}
        </div>
    );
}

export default App;
