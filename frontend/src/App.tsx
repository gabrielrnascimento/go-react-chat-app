import './App.scss'
import {connect, sendMsg} from "./api";
import {useEffect, useState} from "react";
import Header from "./components/Header";
import {ChatHistory, ChatMessage} from "./components/ChatHistory";

function App() {

    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

    useEffect(() => {
        connect((msg: MessageEvent) => {
            console.log("new message")
            setChatHistory([...chatHistory, {data: msg.data}])
        })
    }, [chatHistory]);

    const send = () => {
      console.log("hello")
        sendMsg("hello")
    }

  return (
      <div>
          <Header />
          <ChatHistory chatHistory={chatHistory} />
          <button onClick={send}>Hit</button>
      </div>
  )
}

export default App
