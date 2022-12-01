import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import sytles from '../../styles/AccountForm.module.css'

const Signup = ({setError}) => {
  const{user, signUp, setDisplayName} = useAuth()
  const [data, setData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    displayName: ''
  })

  const passCheck = () => {
    if(data.password === data.passwordConfirm){
      return true
    }
    return false
  }
  
  const handleSignUp = async (e) => {
    e.preventDefault()
    const userName = data.displayName.trim()
    const password = data.password.trim()
    const email = data.email.trim()
    
    if(userName.length < 4){
      setError('User Name must be atleast 4 characters')
      return
    }
    if(password.length < 6){
      return setError('Password must be at least 6 characters')
    }
    if(!passCheck()){
      setError('Passwords do not match')
      return
    }
    try{
      await signUp(email, password, userName)
    } catch(err){
      setError(getSignupErrorMessageUiText(err.message))
    }
  }

  const getSignupErrorMessageUiText = (errorMessage) => {
    if(errorMessage === 'Firebase: Error (auth/invalid-email).'){
      return 'Invalid Email Address'
    }
    if(errorMessage === 'Firebase: Password should be at least 6 characters (auth/weak-password).'){
      return 'Password must be at least 6 characters'
    } else {
      return `Error Could Not Handle Request: ${errorMessage}`
    }
  }

  return (
    <Form onSubmit={handleSignUp}>
      <Form.Floating >
      <Form.Control 
          type='email'
          placeholder="email"
          required
          onChange={(e) => setData({
            ...data,
            email: e.target.value
          })
        }
        value={data.email}
        />
        <Form.Label>Email Address</Form.Label>
      </Form.Floating>

      <Form.Floating className={sytles.signupPasswords}>
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
      </Form.Floating>

      <Form.Floating className={sytles.signupPasswords}>
        <Form.Control 
            type='password'
            placeholder="confirm password"
            required
            onChange={(e) => setData({
              ...data,
              passwordConfirm: e.target.value
            })
          }
          />
        <Form.Label>Confirm Password</Form.Label>
      </Form.Floating>

      <Form.Floating className={sytles.signupPasswords}>
        <Form.Control 
            type='text'
            placeholder="User Name"
            required
            onChange={(e) => setData({
              ...data,
              displayName: e.target.value
            })
          }
          />
        <Form.Label>User Name</Form.Label>
      </Form.Floating>

      <div className="justify-content-center row row-cols-5">
        <Button type="submit" variant="success">Sign Up</Button>
      </div>
    </Form>
  )
}

export default Signup