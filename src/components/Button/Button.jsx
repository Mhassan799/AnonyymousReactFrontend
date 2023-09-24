import React from 'react'
import styles from './Button.module.css'
import forwarArrow from '../../assets/arrow_forward.png'
const Button = ({text,onNext}) => {
  return (
    <div>
        <div className={styles.btnCover}>
        <button onClick={onNext} className={styles.button}><span>{text}</span>< img src={forwarArrow} alt="" className={styles.arrow} /></button>
      </div>
    </div>
  )
}

export default Button