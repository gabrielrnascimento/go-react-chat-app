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

const sendMsg = (msg: string) => {
    console.log('sending msg: ', msg);
    socket.send(msg);
};

export { connect, sendMsg };
