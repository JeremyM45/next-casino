import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useQuery } from '@tanstack/react-query'
import Card from './Card'


const Player = ({playerHand, updateHand, value, playerState, updatePlayerState, onHolding}) => {

  async function getCard(){
    const res = await fetch('https://www.deckofcardsapi.com/api/deck/4qukdyp9mfw5/draw/?count=1')
    return await res.json()
  }
  
  const {refetch} = useQuery(['playerHit'], getCard, {
    enabled: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      updateHand(data.cards[0])
    }
  })
  
  const handleHit = () => {
    if(playerState === ''){
      refetch()
    }
  }

  const handleHold = () => {
    updatePlayerState('Holding')
    onHolding()
  }

  const bustCheck = () => {
    if(value > 21) updatePlayerState('Bust')
  }

  const blackJackCheck = () => {
    if(value === 21) updatePlayerState('Black Jack')
  }
  
  useEffect(() => {
    bustCheck()
    blackJackCheck()
  }, [value])

  return (
    <div>
      <h1>Value: {value}</h1>
      <h2>{playerState}</h2>
      {playerState === '' ? <Button onClick={handleHold} variant="danger">Hold</Button> : <></>}
      <Button onClick={handleHit} variant="success">Hit</Button>
      
      {playerHand?.map((card, index) => {
        return(
          <Card key={index} imgSrc={card.images.svg}/>
        )
      })}
    </div>
  )
}

export default Player