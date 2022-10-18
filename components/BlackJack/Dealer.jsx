import { useEffect } from "react"
import Card from "./Card"
import { useQuery } from '@tanstack/react-query'

const Dealer = ({dealerHand, value, playerHandValue, updateHand, dealerState, handleDealerState}) => {
  
  async function getCard(){
    const res = await fetch('https://www.deckofcardsapi.com/api/deck/4qukdyp9mfw5/draw/?count=1')
    return await res.json()
  }
  
  const {refetch} = useQuery(['dealerHit'], getCard, {
    enabled: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      updateHand(data.cards[0])
    }
  })

  const shouldHit = () => {
    if(value >= 21){
      return false
    } else if(value < playerHandValue) {
      return true
    } else {
      return false
    }
    
  }

  useEffect(() => {
    if(dealerState === 'dealing' && shouldHit()){
      refetch()
    } else if(dealerState === 'dealing'){
      handleDealerState('done')
    }
  }, [dealerState])
  
  useEffect(() => {
    if(dealerState === 'dealing' && shouldHit()){
      refetch()
    } else if(dealerState === 'dealing'){
      handleDealerState('done')
    }
    if(dealerState === '' && value === 21) {
      handleDealerState('Black Jack')
    }
  }, [value])

  return (
    <div>
      <h1>Value: {value}</h1>
      {dealerHand?.map((card, index) => {
        return(
          <Card key={index} imgSrc={card.images.svg}/>
        )
      })}
    </div>
  )
}

export default Dealer