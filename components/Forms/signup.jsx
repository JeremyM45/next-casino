import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import sytles from '../../styles/AccountForm.module.css'

const Signup = ({setError}) => {
  const{user, signUp} = useAuth()
  const [data, setData] = useState({
    email: '',
    password: '',
    passwordConfirm: ''
  })

  const passCheck = () => {
    if(data.password === data.passwordConfirm){
      return true
    }
    return false
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    if(data.password.length < 6){
      setError('Password must be atleast 6 characters')
      return
    }
    if(!passCheck()){
      setError('Passwords do not match')
      return
    }
    try{
      await signUp(data.email, data.password)
    } catch(err){
      setError('invalid email')
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
      <div className="justify-content-center row row-cols-5">
        <Button type="submit" variant="success">Sign Up</Button>
      </div>
    </Form>
  )
}

export default Signup