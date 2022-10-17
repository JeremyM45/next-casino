import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useQuery } from '@tanstack/react-query'
import Card from './Card'

const BlackJack = () => {

  const [hand, setHand] = useState([])
  
  async function getCard(){
    const res = await fetch('https://www.deckofcardsapi.com/api/deck/4qukdyp9mfw5/draw/?count=1')
    return await res.json()
  }

  const {refetch} = useQuery(['card'], getCard, {
    enabled: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setHand(currentCardsInHand => [...currentCardsInHand, data.cards[0]])
    }
  })

  useEffect(() => {
    console.log(hand)
  }, [hand])

  return (
    <div>
      <Button onClick={refetch} variant="success">Hit</Button>
      {hand.map((card, index) => {
        return(
          <Card key={index} imgSrc={card.images.svg}/>
        )
      })}
    </div>
  )
}

export default BlackJack