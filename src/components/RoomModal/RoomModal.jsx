import React, { useState } from 'react'
import Input from '../TextInput/Input'
import { createRoom } from '../../http'
import {useSelector} from 'react-redux'
import Card from '../Shared/Card/Card'
import Button from '../Button/Button'
import styles from './RoomModal.module.css'
import globe from '../../assets/Globe.png'
import Lock from '../../assets/lock.png'
import Users from '../../assets/Users.png'
import close from '../../assets/close.png'
const RoomModal = ({onClose  , onRoomCreated}) => {
    // const{token } = useSelector((state)=>state.auth)
    // const [show,setShow] = useState(true)
    const storeData = localStorage.getItem('token')
    let token;
    if(storeData)
    {
      token = JSON.parse(storeData)
    }
    const [roomType,setRoomType] = useState('open')
    const [topic,setTopic] = useState('')
    const change = async()=>{
        const res = await createRoom({roomType,topic,token})
        console.log(res)

          // Assuming 'res.data.roomId' contains the new room's ID
    // Adjust as per the structure of your API response
    const newRoomId = res.data.roomId;
    
    // Call the passed callback with the new room's ID
    if (newRoomId) {
        onClose(); // Close the modal after creating the room
        onRoomCreated(newRoomId); 
    } else {
        console.error("New room ID was not received from the API.");
    }
    }
  return (
    <div>
   <Card>
   <button onClick={onClose} className={styles.IconBtn}><img className={styles.closeIcon} src={close} alt="" /></button>

<div className={styles.wrap}>
<div value={roomType} className={styles.dsign}><img className={styles.img} src={globe} alt="" /><span className={styles.type}>Open</span></div>
 <div className={styles.dsign}><img className={styles.img} src={Users} alt="" /><span className={styles.type}>Social</span></div>
 <div className={styles.dsign}><img className={styles.img1} src={Lock} alt="" /><span className={styles.type}>Private</span></div>
</div>

   <Input value={topic} onChange={(e)=>{setTopic(e.target.value)}} />
        <div className={styles.btnCover}>
        <Button onNext={change} text="let's go" />
        </div>
   </Card>
    </div>
  )
}

export default RoomModal