import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import Login from "./login";
import Signup from "./signup";
import React from 'react'
import styles from '../../styles/AccountForm.module.css'

const AccountForm = ({ handleShowAccountForm, isSignup, setIsSignup }) => {
  const{user, logIn, signUp} = useAuth();
  const [error, setError] = useState('');

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
          {error != '' && <h2 className="text-danger">{error}</h2>}
          {isSignup ? <Signup setError={setError}/> : <Login setError={setError}/> }
        </Modal.Body>
        <Modal.Footer>
          <div className={`${styles.modalFooter}`}>
            {isSignup ? (
              <div className={styles.modalFooterStatment}>
                <p>Already have an account?</p>
                <Button onClick={() => (setIsSignup(false), setError(''))}  variant="primary" className={styles.modalFooterButtonLogin}>Log In</Button>
              </div>
            ) : (
              <div className={styles.modalFooterStatment}>
                <p>Don't have an account?</p>
                <Button onClick={() => (setIsSignup(true), setError(''))} variant="success" className={styles.modalFooterButtonSignup}>Sign Up</Button>
              </div>
            )}
          </div>
        </Modal.Footer>
      </Modal>
      
    </div>
  )
}

export default AccountForm