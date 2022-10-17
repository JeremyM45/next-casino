import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useQuery } from '@tanstack/react-query'
import Card from './Card'
import Player from './Player'

const BlackJack = () => {

  const [playerHand, setPlayerHand] = useState([])
  const [playerHandValue, setPlayerHandValue] = useState(0)
  
  const clearData = () => {
    setPlayerHand([])
    setPlayerHandValue(0)
    refetch()
  }
  async function dealCards(){
    const res = await fetch('https://www.deckofcardsapi.com/api/deck/4qukdyp9mfw5/draw/?count=4')
    
    return await res.json()
  }

  const {refetch} = useQuery(['deal'], dealCards, {
    refetchOnWindowFocus: false,
    onSuccess: (d) => {
      console.log('test')
      setPlayerHand([d.cards[0], d.cards[1]])
    }
  })
  
  const updateHand = (value) => {
    setPlayerHand(currentHand => [...currentHand, value])
  }

  const evaluateHand = () => {
    const value = 0
    playerHand.map((card) => {
      if(card.value === 'JACK' || card.value === 'QUEEN' || card.value === 'KING') {
        value += 10
      }
      else if(card.value === 'ACE') {
        value += 11
      } else {
        value += parseInt(card.value)
      }
    })
    if(value > 21 && playerHand.filter(e => e.value === 'ACE').length > 0){
      value -= 10
    }
    setPlayerHandValue(value)
  }

  useEffect(() => {
    evaluateHand()
  }, [playerHand])

  useEffect(() => {
    console.log(playerHandValue)
  }, [playerHandValue])

  return (
    <div className='mb-4'>
      <Button onClick={clearData} className="btn">New Game</Button>
      <Player playerHand={playerHand} updateHand={updateHand} value={playerHandValue}/>
    </div>
  )
}

export default BlackJack