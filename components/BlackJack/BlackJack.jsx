import { useEffect, useState } from 'react'
import styles from '../../styles/BlackJack.module.css'
import { useQuery } from '@tanstack/react-query'
import Dealer from './Dealer'
import Player from './Player'
import { useAuth } from "../../context/AuthContext";
import EndGameModal from './EndGameModal'

const BlackJack = ({ changeShownGame }) => {
  const { user } = useAuth()
  const [canClick, setCanClick] = useState(true)
  const [playerHand, setPlayerHand] = useState([])
  const [dealerHand, setDealerHand] = useState([])
  const [playerHandValue, setPlayerHandValue] = useState(0)
  const [dealerHandValue, setDealerHandValue] = useState(0)
  const [hiddenCard, setHiddenCard] = useState({})
  const [playerState, setPlayerState] = useState('')
  const [dealerState, setDealerState] = useState('')
  const [endGameText, setEndGameText] = useState('')

  
  const clearData = () => {
    setPlayerHand([])
    setDealerHand([])
    setPlayerState('')
    setEndGameText('')
    setDealerState('')
    setPlayerHandValue(0)
    refetch()
    setCanClick(true)
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
      if(evaluateHand([d.cards[2], d.cards[3]]) === 21) {
        setDealerHand([d.cards[2], d.cards[3]])
      } else {
        setDealerHand([d.cards[2]])
        setHiddenCard(d.cards[3])
      }
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
    const aceList = hand.filter(e => e.value === 'ACE')
    if(value > 21 && aceList.length > 0){
      aceList.map(() => {
        if(value > 21){
          value -= 10
        }
      })
    }
    return value
  }

  const displayWinner = () => {
    let bust = ''
    if(playerHandValue > 21){bust = <h1>{user.email} Busts</h1>}
    if(dealerHandValue > 21){bust = <h1>Dealer Busts</h1>}
    if(playerState === 'Bust' || dealerHandValue > playerHandValue && dealerHandValue < 22){
      return (
      <>
        {bust}
        <h1>The Dealer Wins</h1>
      </>)
    } else if(playerHandValue > dealerHandValue && playerHandValue < 22 || playerHandValue < 22 && dealerHandValue > 21){
      return (
      <>
        {bust}
        <h1>{user.email} Wins</h1>
      </>)
    } else{
      return (
      <>
        {bust}
        <h1>Tie Game</h1>
      </>)
    }
  }

  useEffect(() => {
    setPlayerHandValue(evaluateHand(playerHand))
    setDealerHandValue(evaluateHand(dealerHand))
    
  }, [playerHand, dealerHand])

  useEffect(() => {
    if(dealerState === 'done' || dealerState === 'Black Jack'){
      setCanClick(false)
      setEndGameText(displayWinner())
    }
  }, [dealerState])

  useEffect(() => {
    if(playerState === 'Bust' || playerState === 'Black Jack'){
      updateDealerHand(hiddenCard)
      setCanClick(false)
      setEndGameText(displayWinner())
    } else if(playerState === 'Holding'){
      updateDealerHand(hiddenCard)
      setCanClick(false)
      handleDealerState('dealing')
    }
  }, [playerState])
  // className={`border border-secondary ${styles.game}`}
  // className={`border border-warning ${styles.dealer}`}
  // className={`border border-danger ${styles.player}`}
  return (
    <div className='mb-4'>
      {endGameText != '' ? (
        <EndGameModal 
          newGameClear={clearData} 
          changeShownGame={changeShownGame} 
          endGameText={endGameText}
          playerHandValue={playerHandValue}
          dealerHandValue={dealerHandValue}
          userName={user.email}
        /> ) : null}
        <div >
          <div >
            <Dealer 
              dealerHand={dealerHand} 
              value={dealerHandValue} 
              playerHandValue={playerHandValue} 
              dealerState={dealerState} 
              handleDealerState={handleDealerState} 
              updateHand={updateDealerHand} 
            />
          </div>
          <div >
            <Player 
              playerHand={playerHand}
              updateHand={updatePlayerHand}
              value={playerHandValue} 
              playerState={playerState} 
              updatePlayerState={handlePlayerState} 
              canClick={canClick}
              userName={user.email}
            />
          </div>
        </div>
    </div>
  )
}

export default BlackJack