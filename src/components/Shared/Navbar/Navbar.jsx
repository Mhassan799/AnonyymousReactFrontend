import React, { useState } from 'react'
import Logo from '../../../assets/logo.png'
import styles from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import dp from '../../../assets/banda.png'
import forward from '../../../assets/arrow_forward.png'
import { setAuth } from '../../../store/Auth'
import { useDispatch } from 'react-redux'
const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authdata = localStorage.getItem('isAuth')
  let isAuth
  if(authdata){
    isAuth = JSON.parse(authdata)

  }
  const storeData = localStorage.getItem('user')
  let user;
  if(storeData)
  {
    user = JSON.parse(storeData)
  }

  const logout = ()=>{
    localStorage.removeItem('user')
    dispatch(setAuth(''))
    localStorage.removeItem('isAuth')

    navigate('/')


  }
  return (
   
    <div className={styles.main}>
       <Link to='/'>
        <div className={styles.coverN}>
       
        <img src={Logo} alt="" />
        <span className={styles.logoText}>Anony</span>
        
        </div>
        </Link>
        <div>
         {isAuth && (
  <div className={styles.sbMain}>
    
    <div className={styles.dpCover}>
   <img className={styles.Dp} src={user?user.img : dp} />
    </div>
    <button className={styles.btnCover} onClick={logout}><img className={styles.imgBtn} src={forward} alt="" /></button>
    </div>
)}
        </div>
        
      
        
    </div>
  

  )
}

export default Navbar
