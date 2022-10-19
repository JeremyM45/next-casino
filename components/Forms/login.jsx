import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import Modal from 'react-bootstrap/Modal';

const Login = ({ handleShowLogin, handleClose }) => {
  const{user, logIn} = useAuth()
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
    <Modal
        show={true}
        backdrop="static"
        keyboard={false}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleLogIn}>
        <Form.Floating  controlId="formBasicEmail">
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
          
        </Form.Floating >

        <Form.Floating >
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
        <Button type="submit" variant="primary">Log In</Button>
        
      </Form>

        </Modal.Body>
        <Modal.Footer>
          <p>Don't have an account?</p>
          <Button onClick={handleShowLogin} variant="success">Sign Up</Button>
        </Modal.Footer>
      </Modal>
  )
}

export default Login