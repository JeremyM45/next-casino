import { useEffect, useState } from "react"
import Card from "./Card"
import { useQuery } from '@tanstack/react-query'

const Dealer = ({dealerHand, value, playerHandValue, updateHand, dealerState, handleDealerState}) => {
  async function getCard(){
    const res = await fetch('https://www.deckofcardsapi.com/api/deck/4qukdyp9mfw5/draw/?count=1')
    return await res.json()
  }

  const {refetch, isLoading} = useQuery(['dealerHit'], getCard, {
    enabled: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      updateHand(data.cards[0])
    }
  })

  const shouldHit = () => {
    if(value >= 21){
      return false
    } else if(value < playerHandValue || value < 16 && value === playerHandValue) {
      return true
    } else {
      return false
    }
  }

  useEffect(() => {
    if((dealerState === 'dealing' || dealerState === 'dealt same val') && dealerHand.length != 1 && value < 21 && shouldHit() ){
      refetch()
    } else if((dealerState === 'dealing' || dealerState === 'dealt same val')){
      handleDealerState('done')
    }
    if(dealerState === '' && value === 21) {
      handleDealerState('Black Jack')
    }
  }, [value])
  
  useEffect(() => {
    if(dealerState === 'dealt same val' && dealerHand.length != 1 && value < 21 && shouldHit() ){
      refetch()
    }
  }, [dealerState])
  
  return (
    <div className='container text-center text-danger'>
      <div className='row'>
        
        <div className='col-12'>
          <h1>Dealer</h1>
        </div>
        
      </div>
      <div className="justify-content-center row">
        {dealerHand?.map((card, index) => {
          if(dealerHand.length > 4){return <div className='col-2 col-sm-auto' key={index}><Card imgSrc={card.images.png}/></div>}
          return(
            <div className='col-3 col-sm-auto' key={index} >
              <Card imgSrc={card.images?.png}/>
            </div>
            
          )
        })}
        {dealerHand.length === 1 ? <div className='col-3 col-sm-auto'><Card imgSrc={'/card-back-red.webp'}/></div> : null}
      </div>
      <div className='col-12'>
        <h1>Value: {value}</h1>
      </div>
      
    </div>
  )
}

export default Dealer