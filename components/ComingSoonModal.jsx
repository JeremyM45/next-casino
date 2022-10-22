import React from 'react'
import Modal from 'react-bootstrap/Modal';
import styles from '../styles/ComingSoon.module.css'

const ComingSoonModal = ({ setShowComingSoonModal }) => {
  return (
    <>
      <Modal
        show={true}
        centered
        onHide={() => setShowComingSoonModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title className={styles.title}>Coming Soon</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>
          This game is not finished yet

        </Modal.Body>
        
      </Modal>
    </>
  )
}

export default ComingSoonModal