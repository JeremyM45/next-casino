import Image from 'next/image'
import React, { useState } from 'react'
import styles from '../styles/HomeCards.module.css'
import { useAuth } from '../context/AuthContext'
import ComingSoonModal from './ComingSoonModal'

const HomeCards = ({imgSrc, title, description, handelShowGameChange, setAccountFormVisable, comingSoon, setShowComingSoonModal}) => {
  const { user } = useAuth()

  function handleClick(){
    if(user){
      if(comingSoon){
        return setShowComingSoonModal(true)
      }
      return handelShowGameChange(title)
    } else {
      return setAccountFormVisable(true)
    }
  }
  return (
    <div className={`${styles.card}`} onClick={() => handleClick()}>
      <div className={styles.cardTextContainer}>
        <div className='col-12'>
          <h1 className={styles.title}>{title}</h1>
        </div>
        <div >
          <p className={styles.description}>{description}</p>
        </div>
        <div>
          {comingSoon && <h2 className={styles.comingSoonText}>Coming Soon</h2>}
        </div>
        
        
      </div>
      
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