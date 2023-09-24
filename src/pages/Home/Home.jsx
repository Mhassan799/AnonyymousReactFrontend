import React from 'react'
import Card from '../../components/Shared/Card/Card'
import styles from './Home.module.css'
import logo from '../../assets/logo.png'
import Button from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  const navigate = useNavigate()
  const onNext = ()=>{
  navigate('/authenticate')
}
  return (
    <div className={styles.cardWrapper}>
     <Card heading= 'Welcome to Anony!' icon = 'logo.png'>
      <div className={styles.para}>
      We’re working hard to get Codershouse ready for everyone! While we wrap up the finishing youches, we’re adding people gradually to make sure nothing breaks :)
      </div>
      <div className={styles.btnCover}>
      <Button text = 'Get userName' onNext={onNext} />
      </div>
      </Card>
    </div>
  )
}

export default Home