import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useState } from 'react'

const Card = ({updateHand}) => {
  
  async function getCard(){
    const res = await fetch('https://www.deckofcardsapi.com/api/deck/4qukdyp9mfw5/draw/?count=1')
    return await res.json()
  }

  const {data, status, isSuccess} = useQuery(['card'], getCard, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      updateHand(data)
    }
  })

  if(status === 'loading'){return <div>Loading</div>}
  if(status === 'error'){return <div>Error</div>}

  return (
    <>
      <Image height={400} width={300} src={data.cards[0].images.svg}/>
    </>
  )
}

export default Card