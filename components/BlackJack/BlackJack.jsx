import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useQuery } from '@tanstack/react-query'
import Card from './Card'

const BlackJack = () => {
  const [cards, setCards] = useState([{}])
  const [showCard, setShowCard] = useState(false)

  function handleHit(){
    setShowCard(true)
  }
  function updateHand(card){
    setCards(currentCards => [...currentCards, card.cards[0]])
  }
  useEffect(() => {
    console.log(cards)
  }, [cards])

  return (
    <div>
      <Button onClick={handleHit} variant="success">Hit</Button>
      {showCard ? <Card updateHand={updateHand}/> : null}
    </div>
  )
}

export default BlackJack