import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";

const Login = ({ handleShowLogin, handleClose }) => {
  const{user, logIn} = useAuth()
  const router = useRouter()
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const handleLogIn = async (e) => {
    e.preventDefault()
    try{
      
      await logIn(data.email, data.password)
      handleClose()
    } catch(err){
      console.log(err)
    }
  }
  
  
  return (
    <Container>
      <h1>Log In</h1>
      <Form onSubmit={handleLogIn}>
        <Form.Group controlId="formBasicEmail">
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
        
        <Button type="submit" variant="primary">Log In</Button>
        <Button onClick={handleShowLogin} variant="success">Sign Up</Button>
      </Form>
    </Container>
  )
}

export default Login