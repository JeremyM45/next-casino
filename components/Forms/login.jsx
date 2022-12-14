import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import styles from '../../styles/AccountForm.module.css'

const Login = ({setError}) => {
  const{user, logIn} = useAuth()
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const handleLogIn = async (e) => {
    e.preventDefault()
    try{
      await logIn(data.email, data.password)
    } catch(err){
      setError(getSigninErrorMessageUiText(err.message))
    }
  }
  
  const getSigninErrorMessageUiText = (errorMessage) => {
    if(errorMessage === 'Firebase: Error (auth/user-not-found).'){
      return 'Invalid email or password'
    }
    else {
      return `Error: ${errorMessage}`
    }
  }
  
  return (
    <Form onSubmit={handleLogIn}>
      <Form.Floating className={styles.loginEmail}>
        <Form.Control 
          type='email'
          placeholder="email"
          required
          onChange={(e) => setData({
            ...data,
            email: e.target.value
          })}
          value={data.email}
        />
        <Form.Label>Email Address</Form.Label>
      </Form.Floating>

      <Form.Floating className={styles.loginPassword}>
      <Form.Control 
          type='password'
          placeholder="password"
          required
          onChange={(e) => setData({
            ...data,
            password: e.target.value
          })
        }
        />
        <Form.Label>Password</Form.Label>
        
      </Form.Floating >
      <div className="justify-content-center row row-cols-6">
        <Button className={styles.loginButton} type="submit" variant="primary">Log In</Button>
      </div>
      
    </Form>
  )
}

export default Login