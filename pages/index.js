import Head from 'next/head'
import { Navbar } from '../components/Navbar';
import { Button } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import styles from '../styles/Home.module.css'
import Login from '../components/Forms/login'
import Signup from '../components/Forms/signup'
import { useState } from 'react'
import BlackJack from '../components/BlackJack/BlackJack'

export default function Home() {
  const { user, logOut } = useAuth()
  const [logInVisable, setLogInVisiable] = useState(false)
  const [signUpVisable, setSignUpVisable] = useState(false)
  const [shownGame, setShownGame] = useState('')

  function handleShowLogIn(){
    setLogInVisiable(true)
    setSignUpVisable(false)
  }

  function handleShowSignUp(){
    setSignUpVisable(true)
    setLogInVisiable(false)
  }
  
  function handleClose(){
    setSignUpVisable(false)
    setLogInVisiable(false)
  }

  function handelShowGameChange(newShownGame){
    setShownGame(newShownGame)
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar changeShownGame={handelShowGameChange}/>
      <div className={styles.container}>
        <main className={styles.main}>
          {user ? (
            <>
              {shownGame === 'BlackJack' ? <BlackJack /> : null}
              <Button varient="alert" onClick={() => {logOut()}}>Logout</Button>
            </>
            
          ) : (
            <>
              {logInVisable || signUpVisable ? null : 
                <>
                  <Button  varient="primary" onClick={handleShowLogIn}>Login</Button>
                  <Button  variant="success" onClick={handleShowSignUp}>Signup</Button>
                </>
              }
              {logInVisable ? <Login handleShowLogin={handleShowSignUp} handleClose={handleClose} /> : null}
              {signUpVisable ? <Signup handleShowSignIn={handleShowLogIn} handleClose={handleClose}/> : null}
            </>
            
          )}
        </main>
      </div>
    <footer className={styles.footer}>

    </footer>
  </>
  )
}
