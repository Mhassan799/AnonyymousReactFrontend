import React from 'react'
import styles from './Input.module.css'
const Input = ({place,value,onChange}) => {
    const divSet={
        marginTop:'20px'
    }
  return (
    <div>
        <input style={divSet} placeholder={place} onChange={onChange} value={value} className={styles.input} />
    </div>
  )
}

export default Input