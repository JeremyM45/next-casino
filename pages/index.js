import Head from 'next/head'
import { NavBar } from '../components/Navbar';
import { Button } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import BlackJack from '../components/BlackJack/BlackJack'
import AccountForm from '../components/Forms/AccountForm';
import HomeCards from '../components/HomeCards';
import ComingSoonModal from '../components/ComingSoonModal'


export default function Home() {
  const { user, loading } = useAuth()

  const [accountFormVisable, setAccountFormVisable] = useState(false)
  const [shownGame, setShownGame] = useState('')
  const [isSignup, setIsSignup] = useState(false)
  const [showComingSoonModal , setShowComingSoonModal] = useState(false)

  function handleShowLogIn(){
    setLogInVisiable(true)
    setSignUpVisable(false)
  }

  function handelShowGameChange(newShownGame){
    setShownGame(newShownGame)
  }

  if(loading){
    return(
      <>
        <div className={styles.container}>

        </div>
      </>
    )
  }
  return (
    <>
      <Head>
        <title>Casino</title>
        <meta name="Casino" content="Casino games without betting" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
      <NavBar changeShownGame={handelShowGameChange} setIsSignup={setIsSignup} setAccountFormVisable={setAccountFormVisable} setShowComingSoonModal={setShowComingSoonModal}/>
        <main className='container'>
          {shownGame === 'Black Jack' && <BlackJack changeShownGame={handelShowGameChange} />}
          {shownGame === '' && (
            <div className={styles.homeCardsContainer}>
              <div className={styles.homeCards}>
                <div className='row'>
                  <div className={`${styles.homeCard} col-auto`}>
                    <HomeCards 
                      imgSrc='/blackjack.webp' 
                      title='Black Jack' 
                      description='Play to 21' 
                      handelShowGameChange={handelShowGameChange} 
                      setAccountFormVisable={setAccountFormVisable}
                      comingSoon={false}
                      setShowComingSoonModal={setShowComingSoonModal}
                    />
                  </div>
                  <div className={`${styles.homeCard} col-auto`}>
                    <HomeCards 
                      imgSrc='/three-card-poker.webp'
                      title='Three Card Poker' 
                      description='Get the best hand' 
                      handelShowGameChange={handelShowGameChange} 
                      setAccountFormVisable={setAccountFormVisable}
                      comingSoon={true}
                      setShowComingSoonModal={setShowComingSoonModal}
                    />
                  </div>
                </div>
                <div className='row '>
                  <div className={`${styles.homeCard} col-auto`}>
                    <HomeCards 
                      imgSrc='/roulette.webp' 
                      title='Roulette' 
                      description="Guess where the ball's gonna land...?" 
                      handelShowGameChange={handelShowGameChange} 
                      setAccountFormVisable={setAccountFormVisable}
                      comingSoon={true}
                      setShowComingSoonModal={setShowComingSoonModal}
                    />
                  </div>
                  <div className={`${styles.homeCard} col-auto`}>
                    <HomeCards 
                      imgSrc='/snail-race.webp' 
                      title='Snail Race' 
                      description='Guess which snail is the fastest' 
                      handelShowGameChange={handelShowGameChange} 
                      setAccountFormVisable={setAccountFormVisable}
                      comingSoon={true}
                      setShowComingSoonModal={setShowComingSoonModal}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {!user && (
            <>
              {accountFormVisable ?  <AccountForm handleShowAccountForm={setAccountFormVisable} setIsSignup={setIsSignup} isSignup={isSignup} />: null}
            </>
          )}
          {showComingSoonModal && <ComingSoonModal setShowComingSoonModal={setShowComingSoonModal}/>}
          
        </main>
      </div>
  </>
  )
}
