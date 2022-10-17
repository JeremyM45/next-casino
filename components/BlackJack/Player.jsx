import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useQuery } from '@tanstack/react-query'
import Card from './Card'


const Player = ({playerHand, updateHand, value}) => {

  const [bust, setBust] = useState(false);
  const [blackJack, setBlackJack] = useState(false);
  const [holding, setHolding] = useState(false);

  console.log(playerHand)

  async function getCard(){
    const res = await fetch('https://www.deckofcardsapi.com/api/deck/4qukdyp9mfw5/draw/?count=1')
    return await res.json()
  }
  
  const {refetch} = useQuery(['hit'], getCard, {
    enabled: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log('test 2')
      updateHand(data.cards[0])
    }
  })
  
  const handleHit = () => {
    if(!bust && !blackJack && !holding){
      refetch()
    }
  }

  const handleHold = () => {
    setHolding(true)
  }

  const bustCheck = () => {
    if(value > 21) setBust(true)
  }

  const blackJackCheck = () => {
    if(value === 21) setBlackJack(true)
  }
  
  useEffect(() => {
    bustCheck()
    blackJackCheck()
    console.log(value)
  }, [value])

  return (
    <div>
      <h1>Value: {value}</h1>
      {bust ? <h1 className='text-danger text-center'>BUST</h1> : null}
      {blackJack ? <h1 className='text-warning text-center'>BLACK JACK</h1> : null}
      {holding ? <h1 className='text-primary text-center'>Holding</h1> : <Button onClick={handleHold} variant="danger">Hold</Button>}
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