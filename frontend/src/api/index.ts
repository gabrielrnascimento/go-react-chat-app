const socket = new WebSocket('ws://localhost:8080/ws');

const connect = (cb: (msg: MessageEvent) => void) => {
    console.log('Attempting Connection...');

    socket.onopen = () => {
        console.log('Successfully Connected');
    };

    socket.onmessage = (msg) => {
        cb(msg);
    };

    socket.onclose = (event) => {
        console.log('Socket Closed Connection: ', event);
    };

    socket.onerror = (error) => {
        console.log('Socket Error: ', error);
    };
};

const sendUsername = (username: string) => {
    console.log('sending username: ', username);
    const data = {
        type: 'username',
        content: username,
    };
    socket.send(JSON.stringify(data));
};

const sendMessage = (message: string) => {
    console.log('sending message: ', message);
    const data = {
        type: 'chat',
        content: message,
    };
    socket.send(JSON.stringify(data));
};

export { connect, sendMessage, sendUsername };
