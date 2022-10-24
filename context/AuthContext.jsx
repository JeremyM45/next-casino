import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { useContext, useEffect, useState, createContext } from "react";
import { auth, db } from '../config/firebase'
import {doc, setDoc} from 'firebase/firestore'

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext)


export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user){
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        })
      } else {setUser(null)}
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])
  
  async function logIn(email, password) { 
    await signInWithEmailAndPassword(auth, email, password)
  }
  async function signUp(email, password, newDisplayName) { 
    await createUserWithEmailAndPassword(auth, email, password).then((res) => {
      updateProfile(res.user, {
        displayName: newDisplayName
      })
      setDoc(doc(db, 'users', res.user.uid), {
        blackJackWins: 0,
        blackJackLosses: 0,
        blackJackGames: 0,
        blackJackTies: 0,
        threeCardPokerkWins: 0,
        threeCardPokerkLosses: 0,
        threeCardPokerkGames: 0,
        threeCardPokerkTies: 0,
        snailRaceWins: 0,
        snailRaceLosses: 0,
        snailRaceGames: 0,
        snailRaceTies: 0,
      })
    })
    logOut()
    logIn(email, password)
  }
  
  async function logOut() {
    setUser(null)
    await signOut(auth)
  }
  return (
    <AuthContext.Provider value={{loading, user, logIn, signUp, logOut}}>
      {children}
    </AuthContext.Provider>
  )
}