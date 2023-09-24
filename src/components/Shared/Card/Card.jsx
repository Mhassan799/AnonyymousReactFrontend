import React from 'react'
import styles from './Card.module.css'
import logo from '../../../assets/logo.png'
import { Link } from 'react-router-dom'
const Card = ({heading,icon,children}) => {
  let imageSec = logo
  imageSec = '/src/assets/'
 
  return (
    <div className={styles.card}>
      <div className={styles.cover}>
      <Link to='/'><img src={`${imageSec}${icon}`} alt="" /></Link>
      <span className={styles.text}>{heading}</span>
      
      </div>
      {children}
    </div>
  )
}

export default Card