import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import Login from "./login";
import Signup from "./signup";
import React from 'react'
import sytles from '../../styles/AccountForm.module.css'

const AccountForm = ({ handleShowAccountForm, isSignup, setIsSignup }) => {
  const{user, logIn, signUp} = useAuth()
  
  const [error, setError] = useState();
  return (
    <div>
      <Modal
        show={true}
        backdrop="static"
        keyboard={false}
        onHide={handleShowAccountForm}
      >
        <Modal.Header closeButton >
          <Modal.Title>{isSignup ? 'Signup' : 'Login'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          {isSignup ? <Signup /> : <Login /> }
        </Modal.Body>
        <Modal.Footer>
          {isSignup ? (
            <>
              <p>Already have an account?</p>
              <Button onClick={() => setIsSignup(false)} variant="primary">Log In</Button>
            </>
          ) : (
            <>
              <p>Don't have an account?</p>
              <Button onClick={() => setIsSignup(true)} variant="success">Sign Up</Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
      
    </div>
  )
}

export default AccountForm