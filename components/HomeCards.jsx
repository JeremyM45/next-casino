import Image from 'next/image'
import React from 'react'
import styles from '../styles/HomeCards.module.css'

const HomeCards = ({imgSrc, title, description, handelShowGameChange}) => {
  return (
    <div className={styles.card} onClick={() => handelShowGameChange(title)}>
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