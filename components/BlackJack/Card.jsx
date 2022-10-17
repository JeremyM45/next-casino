import Image from 'next/image'


const Card = ({imgSrc}) => {

  return (
    <>
      <Image height={400} width={300} src={imgSrc}/>
    </>
  )
}

export default Card