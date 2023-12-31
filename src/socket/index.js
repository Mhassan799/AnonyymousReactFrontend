import {io} from 'socket.io-client'

const socketInit = ()=>{
    const options = {
        forceNew:true,
        reconnectionAttempts:Infinity,
        timeout:10000,
        transports:['websocket']
    };
    return io('http://localhost:5000',options)
}
export default socketInit

