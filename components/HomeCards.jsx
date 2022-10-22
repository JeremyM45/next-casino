import Image from 'next/image'
import React from 'react'
import styles from '../styles/HomeCards.module.css'
import { useAuth } from '../context/AuthContext'

const HomeCards = ({imgSrc, title, description, handelShowGameChange, setAccountFormVisable}) => {
  const { user } = useAuth()
  
  return (
    <div className={styles.card} onClick={() =>{user ? handelShowGameChange(title) : setAccountFormVisable(true)}}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
      <Image 
        src={imgSrc} 
        layout='fill' 
        objectFit='fill'
        className={styles.image}
      />
    </div>
  )
}

export default HomeCards