import axios from 'axios'
//api instance
const api = axios.create({
    baseURL:'http://localhost:5000',
    headers:{
        'Content-Type':'application/json',
        'Accept':'application/json'
    }
});
export const sendOtp= async(data)=>api.post('/api/sendOtp',data)
export const verifyOtp= async(data)=>api.post('/api/verifyOtp',data)
export const activate= async(data)=>api.post('/api/activate',data)
export const createRoom= async(data)=>api.post('/api/createRoom',data)
export const getAllRooms= async(data)=>api.post('/api/getAllRooms',data)




//api routes
