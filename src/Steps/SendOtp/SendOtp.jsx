import React, { useEffect, useState } from 'react'
import Card from '../../components/Shared/Card/Card'
import Input from '../../components/TextInput/Input'
import styles from './SendOtp.module.css'
import Button from '../../components/Button/Button'
import { verifyOtp } from '../../http'
import {useSelector} from 'react-redux'
import {setAuth} from '../../store/Auth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const SendOtp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [otp,setotp] = useState('')
  const {phone,hash} = useSelector((state)=>state.auth.otp)

  const sumbit =async ()=>{
    try{

//  phone !==""?console.log(phone +":"+hash ):console.log("Not recieve !")
       const {data} = await verifyOtp({otp,phone,hash})
      //  console.log(data)
       localStorage.setItem('user',JSON.stringify(data.user))
      //console.log(data.token)
      localStorage.setItem('token',JSON.stringify(data.token))

      dispatch(setAuth({ user: data }));

      navigate('/activate')
    }
    catch(e)
    {
      console.log(e)
    }
  }

  
  return (
    <div className={styles.cardWrapper}>
    <Card heading='Enter Otp Here' icon='lock.png'>
    <Input place='Otp Here' value={otp} onChange={(e)=>{setotp(e.target.value)}} />

      <span className={styles.para}>Didn’t receive? Tap to resend</span>
      <div className={styles.btnCover}><Button text='Next' onNext={sumbit} /></div>
      </Card>
    </div>
  )
}

export default SendOtp