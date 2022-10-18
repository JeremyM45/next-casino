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
    } else if(value < playerHandValue || value < 16 && value === playerHandValue) {
      return true
    } else {
      return false
    }
    
  }
  
  useEffect(() => {
    console.log(value)
    if(dealerState === 'dealing' && dealerHand.length != 1 && shouldHit() && value < 21){
      refetch()
    } else if(dealerState === 'dealing'){
      handleDealerState('done')
    }
    if(dealerState === '' && value === 21) {
      handleDealerState('Black Jack')
    }
  }, [value])

  return (
    <div className='text-center'>
      <h1>Dealer</h1>
      <h1>Value: {value}</h1>
      <div className="justify-content-center row row-cols-4 gx-1">
        {dealerHand?.map((card, index) => {
          return(
            <div key={index}>
              <Card imgSrc={card.images.png}/>
            </div>
            
          )
        })}
        {dealerHand.length === 1 ? <div><Card imgSrc={'/card-back-red.webp'}/></div> : null}
      </div>
    </div>
  )
}

export default Dealer