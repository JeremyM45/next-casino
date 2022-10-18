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
  const [playerTurn, setPlayerTurn] = useState(true)
  const [playerState, setPlayerState] = useState('')
  const [dealerState, setDealerState] = useState('')
  const [turnOver, setTurnOver] = useState(false)
  const [endGameText, setEndGameText] = useState('')
  
  
  const clearData = () => {
    setPlayerHand([])
    setDealerHand([])
    setPlayerState('')
    setEndGameText('')
    setDealerState('')
    setPlayerTurn(true)
    setTurnOver(false)
    setPlayerHandValue(0)
    refetch()
  }

  async function dealCards(){
    const res = await fetch('https://www.deckofcardsapi.com/api/deck/4qukdyp9mfw5/draw/?count=4')
    return await res.json()
  }

  async function shuffleCards(){
    const res = await fetch('https://www.deckofcardsapi.com/api/deck/4qukdyp9mfw5/shuffle/')
    return await res.json()
  }

  const {refetch} = useQuery(['deal'], dealCards, {
    refetchOnWindowFocus: false,
    onSuccess: async (d) => {
      setPlayerHand([d.cards[0], d.cards[1]])
      setDealerHand([d.cards[2], d.cards[3]])
      console.log(d.remaining)
      if(d.remaining < 52){
        await shuffleCards()
      }
    }
  })
  
  const updatePlayerHand = (value) => {
    setPlayerHand(currentHand => [...currentHand, value])
  }

  const updateDealerHand = (value) => {
    setDealerHand(currentHand => [...currentHand, value])
  }

  const updateTurn = () => {
    setPlayerTurn(false);
  }

  const handleTurnOver = () => {
    setTurnOver(true)
  }

  const handlePlayerState = (newPlayerState) => {
    setPlayerState(newPlayerState)
  }

  const handleDealerState = (newDealerState) => {
    setDealerState(newDealerState)
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

  const displayWinner = () => {
    if(playerState === 'Bust' || dealerHandValue > playerHandValue && dealerHandValue < 22){
      return (<h1>Dealer Wins</h1>)
    } else if(playerHandValue > dealerHandValue && playerHandValue < 22 || playerHandValue < 22 && dealerHandValue > 21){
      return (<h1>Player Wins</h1>)
    } else{
      return (<h1>Tie Game</h1>)
    }
  }

  useEffect(() => {
    setPlayerHandValue(evaluateHand(playerHand))
    setDealerHandValue(evaluateHand(dealerHand))
    
  }, [playerHand, dealerHand])

  useEffect(() => {
    if(dealerState === 'done' || dealerState === 'Black Jack'){
      console.log('test')
      setEndGameText(displayWinner())
    }
  }, [dealerState])

  useEffect(() => {
    if(playerState === 'Bust' || playerState === 'Black Jack'){
      setEndGameText(displayWinner())
    } else if(playerState === 'Holding'){
      console.log('test state')
      handleDealerState('dealing')
    }
  }, [playerState])


  return (
    <div className='mb-4'>
      <Button onClick={clearData} className="btn">New Game</Button>
      {endGameText != '' ? endGameText : null}
      <Dealer 
        dealerHand={dealerHand} 
        value={dealerHandValue} 
        playerHandValue={playerHandValue} 
        dealerState={dealerState} 
        handleDealerState={handleDealerState} 
        updateHand={updateDealerHand} 
      />
      <Player 
        playerHand={playerHand}
        updateHand={updatePlayerHand}
        value={playerHandValue} 
        playerState={playerState} 
        updatePlayerState={handlePlayerState} 
        onHolding={updateTurn}
      />
    </div>
  )
}

export default BlackJack