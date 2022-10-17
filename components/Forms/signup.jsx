import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";

const Signup = ({ handleShowSignIn, handleClose }) => {
  const{user, signUp} = useAuth()
  
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const handleSignUp = async (e) => {
    e.preventDefault()
    try{
      await signUp(data.email, data.password)
      handleClose()
    } catch(err){
      console.log(err)
    }
  }

  return (
    <Container>
      <h1>Sign Up</h1>
      <Form onSubmit={handleSignUp}>
        <Form.Group>
          <Form.Label>Email Address</Form.Label>
          <Form.Control 
            type='email'
            placeholder="email@example.com"
            required
            onChange={(e) => setData({
              ...data,
              email: e.target.value
            })
          }
          value={data.email}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type='password'
            required
            onChange={(e) => setData({
              ...data,
              password: e.target.value
            })
          }
          />
        </Form.Group>
        
        <Button type="submit" variant="primary">Sign Up</Button>
        <Button onClick={handleShowSignIn} variant="primary">Log In</Button>
      </Form>
    </Container>
  )
}

export default Signup