import Image from 'next/image'


const Card = ({imgSrc}) => {

  return (
    <>
      <Image height={150} width={100} src={imgSrc}/>
    </>
  )
}

export default Card