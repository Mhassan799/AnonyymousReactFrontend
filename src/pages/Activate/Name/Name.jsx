import React, { useState } from 'react'
import Card from '../../../components/Shared/Card/Card'
import Input from '../../../components/TextInput/Input'
import Button from '../../../components/Button/Button'
import styles from './Name.module.css'
import { setName } from '../../../store/activate'
import { useDispatch,useSelector } from 'react-redux'
const Name = ({onNext}) => {
    const {Name} = useSelector((state)=>state.auth)
console.log(Name)
    const dispatch = useDispatch()
    const [fname,setFName] = useState(Name)
const next = () =>{
    dispatch(setName(fname))
    onNext()

}
  return (
    <div className={styles.cardWrapper}>
        <Card heading='What’s your full name?' icon='smart.png'>
            <Input place='Enter your name' value={fname} onChange={(e)=>{setFName(e.target.value)}}  />
        <div className={styles.btnCover}>
        <Button text='Next' onNext={next} />

        </div>
        </Card>
    </div>
  )
}

export default Name