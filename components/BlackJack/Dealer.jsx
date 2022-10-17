import Card from "./Card"

const Dealer = ({dealerHand, value}) => {
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