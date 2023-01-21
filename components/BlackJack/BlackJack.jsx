import { useEffect, useState } from 'react'
import styles from '../../styles/BlackJack.module.css'
import { useQuery } from '@tanstack/react-query'
import Dealer from './Dealer'
import Player from './Player'
import { useAuth } from "../../context/AuthContext";
import EndGameModal from './EndGameModal'
import {doc, getDoc, onSnapshot, updateDoc} from 'firebase/firestore'
import {db} from '../../config/firebase'

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
  const [whoBust, setWhoBust] = useState('')
  const [blackJackStats, setBlackJackStats] = useState({})
  const [error, setError] = useState('');
  
  const userStatsRef = doc(db, 'users', `${user?.uid}`)

  useEffect(() => {
    if(user.uid)
    { 
      onSnapshot(userStatsRef, (doc) => {
        setBlackJackStats({
          wins: doc.data().blackJackWins,
          loses: doc.data().blackJackLosses,
          games: doc.data().blackJackGames,
          ties: doc.data().blackJackTies,
        })
      })
    }
  }, [user?.uid])

  const clearData = () => {
    setPlayerHand([])
    setDealerHand([])
    setDealerHandValue(0)
    setPlayerHandValue(0)
    setPlayerState('')
    setEndGameText('')
    setDealerState('')
    setWhoBust('')
    refetch()
    setCanClick(true)
    
  }

  async function dealCards(){
    const res = await fetch(`https://www.deckofcardsapi.com/api/deck/${process.env.NEXT_PUBLIC_REACT_DECK_ID}/draw/?count=4`)
    return await res.json()
  }

  async function shuffleCards(){
    const res = await fetch(`https://www.deckofcardsapi.com/api/deck/${process.env.NEXT_PUBLIC_REACT_DECK_ID}/shuffle/`)
    return await res.json()
  }

  const {refetch, isError} = useQuery(['deal'], dealCards, {
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
    },
  })
  const updatePlayerHand = (value) => {
    setPlayerHand(currentHand => [...currentHand, value])
  }

  const updateDealerHand = (value) => {
    setDealerHand(currentHand => [...currentHand, value])
    if(evaluateHand(dealerHand) === evaluateHand([...dealerHand, value])){
      setDealerState('dealt same val')
    }
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
    if(playerHandValue > 21){setWhoBust(`${user.displayName} Busts`)}
    if(dealerHandValue > 21){setWhoBust('Dealer Busts')}
    if(playerState === 'Bust' || dealerHandValue > playerHandValue && dealerHandValue < 22){
      updateLose()
      return 'The Dealer Wins'
    } else if(playerHandValue > dealerHandValue && playerHandValue < 22 || playerHandValue < 22 && dealerHandValue > 21){
      updateWin()
      return `${user.displayName} Wins`
    } else{
      updateTie()
      return 'Tie Game'
    }
  }

  const updateWin = async () => {
    await updateDoc(userStatsRef, {
      blackJackWins: blackJackStats.wins + 1,
      blackJackGames: blackJackStats.games + 1 
    })
  }

  const updateLose = async () => {
    await updateDoc(userStatsRef, {
      blackJackLosses: blackJackStats.loses + 1,
      blackJackGames: blackJackStats.games + 1 
    })
  }

  const updateTie = async () => {
    await updateDoc(userStatsRef, {
      blackJackTies: blackJackStats.ties + 1,
      blackJackGames: blackJackStats.games + 1 
    })
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

  if(!user){
    return
  }

  return (
    <div>
      <div className={styles.stats}>
        <p className={styles.stat}>Wins: <span className={styles.statWins}>{blackJackStats.wins}</span></p>
        <p className={styles.stat}>Loses: <span className={styles.statLoses}>{blackJackStats.loses}</span></p>
        <p className={styles.stat}>Ties: <span className={styles.statTies}>{blackJackStats.ties}</span></p>
        <p className={styles.stat}>Total Games: <span className={styles.statTotalGames}>{blackJackStats.games}</span></p>
      </div>
      {error && <h1 className={styles.errorMessage}>{error}</h1>}
      {endGameText != '' ? (
        <EndGameModal 
          newGameClear={clearData} 
          changeShownGame={changeShownGame} 
          endGameText={endGameText}
          playerHandValue={playerHandValue}
          dealerHandValue={dealerHandValue}
          userName={user.displayName}
          whoBust={whoBust}
        /> ) : null}
        <div className={`${styles.game} container`}>
          <div className=''>
            <div className={`${styles.dealer} col-12`}>
              <Dealer 
                dealerHand={dealerHand} 
                value={dealerHandValue} 
                playerHandValue={playerHandValue} 
                dealerState={dealerState} 
                handleDealerState={handleDealerState} 
                updateHand={updateDealerHand} 
              />
            </div>
          </div>
          
          <div className='row-12'>
            <div className={`${styles.playerCard} col-12`} >
              <Player 
                playerHand={playerHand}
                updateHand={updatePlayerHand}
                value={playerHandValue} 
                playerState={playerState} 
                updatePlayerState={handlePlayerState} 
                canClick={canClick}
                userName={user.displayName}
              />
            </div>
          </div>
          
        </div>
    </div>
  )
}

export default BlackJack