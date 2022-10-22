import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useQuery } from '@tanstack/react-query'
import Card from './Card'
import styles from '../../styles/BlackJack.module.css'

const Player = ({playerHand, updateHand, value, playerState, updatePlayerState, canClick, userName}) => {
  const [playerStateText, setPlayerStateText] = useState()
  const [canHit, setCanHit] = useState(true)
  async function getCard(){
    const res = await fetch('https://www.deckofcardsapi.com/api/deck/4qukdyp9mfw5/draw/?count=1')
    return await res.json()
  }
  
  const {refetch} = useQuery(['playerHit'], getCard, {
    enabled: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      updateHand(data.cards[0])
      setCanHit(true)
    }
  })
  
  const handleHit = () => {
    setCanHit(false)
    if(playerState === '' && canHit){
      refetch()
    }
  }

  const handleHold = () => {
    updatePlayerState('Holding')
    setPlayerStateText(<h2 className='text-primary'>Holding</h2>)
  }

  const bustCheck = () => {
    
    if(value > 21) {
      updatePlayerState('Bust')
      setPlayerStateText(<h2 className='text-danger'>Bust</h2>)
    }
  }

  const blackJackCheck = () => {
    if(value === 21) {
      updatePlayerState('Black Jack')
      setPlayerStateText(<h2 className='text-warning'>Black Jack</h2>)
    }
  }
  
  useEffect(() => {
    if(playerState === '')
    {
      setPlayerStateText('')
    }
    bustCheck()
    blackJackCheck()
  }, [value])
  return (
    <div className='container text-center text-warning'>
      <div className='row' >
        <div className='col-12'>
          <h1>Value: {value}</h1>
        </div>
      </div>
      
      <div className={`${styles.playerHand} justify-content-center row`}>
        {playerHand?.map((card, index) => {
          if(playerHand.length > 4){return <div className='col-2 col-sm-auto' key={index}><Card imgSrc={card.images.png}/></div>}
          return(
            <div className='col-3 col-sm-auto' key={index}>
              <Card imgSrc={card.images?.png}/>
            </div>
          )
        })}
      </div>
      {canClick ? (
        <div className={styles.playerButtons}>
          <Button className={`${styles.playerButtonHold}`} onClick={handleHold} variant="danger">Hold</Button>
          <Button className={`${styles.playerButtonHit}`} onClick={handleHit} variant="success">Hit</Button>
        </div>
      ) : (
        <div>
          {playerStateText}
        </div>
      )}
      <div className='col-12'>
          <h1>{userName}</h1>
        </div>
    </div>
  )
}

export default Player