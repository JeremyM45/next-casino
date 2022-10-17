import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useQuery } from '@tanstack/react-query'
import Dealer from './Dealer'
import Player from './Player'

const BlackJack = () => {

  const [playerHand, setPlayerHand] = useState([])
  const [dealerHand, setDealerHand] = useState([])
  const [playerHandValue, setPlayerHandValue] = useState(0)
  const [dealerHandValue, setDealerHandValue] = useState(0)
  const [endText, setEndText] = useState('')
  
  const clearData = () => {
    setPlayerHand([])
    setDealerHand([])
    setPlayerHandValue(0)
    setEndText('')
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
      setDealerHand([d.cards[2], d.cards[3]])
    }
  })
  
  const updateHand = (value) => {
    setPlayerHand(currentHand => [...currentHand, value])
  }

  const evaluateHand = (hand) => {
    const value = 0
    hand.map((card) => {
      if(card.value === 'JACK' || card.value === 'QUEEN' || card.value === 'KING') {
        value += 10
      }
      else if(card.value === 'ACE') {
        value += 11
      } else {
        value += parseInt(card.value)
      }
    })
    if(value > 21 && hand.filter(e => e.value === 'ACE').length > 0){
      value -= 10
    }
    return value
  }

  useEffect(() => {
    
    setPlayerHandValue(evaluateHand(playerHand))
    setDealerHandValue(evaluateHand(dealerHand))
  }, [playerHand, dealerHand])

  useEffect(() => {
    console.log(playerHandValue)
  }, [playerHandValue])

  return (
    <div className='mb-4'>
      <Button onClick={clearData} className="btn">New Game</Button>
      <Dealer dealerHand={dealerHand} value={dealerHandValue}/>
      <Player playerHand={playerHand} updateHand={updateHand} value={playerHandValue} endText={endText} updateEndText={setEndText}/>
      
    </div>
  )
}

export default BlackJack