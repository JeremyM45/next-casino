import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";

const Signup = ({ handleShowSignIn, handleClose }) => {
  const{user, signUp} = useAuth()
  const [error, setError] = useState();
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
    if(passCheck()){
      try{
        await signUp(data.email, data.password)
        handleClose()
      } catch(err){
        console.log(err)
      }
    } else {
      setError('Passwords do not match')
    }
    
  }

  return (
    <Modal
      show={true}
      backdrop="static"
      keyboard={false}
      >
      <Modal.Header>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control 
              type='password'
              required
              onChange={(e) => setData({
                ...data,
                passwordConfirm: e.target.value
              })
            }
            />
          </Form.Group>
          {error ? <h4 className="text-danger text-bold">{error}</h4> : null}
          <Button type="submit" variant="success">Sign Up</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <p>Already have an account?</p>
        <Button onClick={handleShowSignIn} variant="primary">Log In</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Signup