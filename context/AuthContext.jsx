import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useContext, useEffect, useState, createContext } from "react";
import { auth } from '../config/firebase'

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
  async function signUp(email, password) { 
    await createUserWithEmailAndPassword(auth, email, password) 
  }
  async function logOut() {
    setUser(null)
    await signOut(auth)
  }

  return (
    <AuthContext.Provider value={{user, logIn, signUp, logOut}}>
      {children}
    </AuthContext.Provider>
  )
}