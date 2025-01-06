import './App.css'
import {connect, sendMsg} from "./api";
import {useEffect} from "react";

function App() {
    useEffect(() => {
        connect()
    }, []);

    const send = () => {
      console.log("hello")
        sendMsg("hello")
    }

  return (
      <div>
          <button onClick={send}>Hit</button>
      </div>
  )
}

export default App
