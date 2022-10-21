import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col, Container } from 'react-bootstrap';
import styles from '../../styles/EndGameModal.module.css'

export default function EndGameModal({newGameClear, changeShownGame, endGameText, playerHandValue, dealerHandValue, userName, whoBust}) {
  return (
    <>
      <Modal
        show={true}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title className={styles.modalTitle}>{whoBust === '' ? <h2 className={styles.modalTitleStatment}>Round Over</h2> : <h2 className={styles.modalBustStatment}>{whoBust}</h2>}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.modalBody}>
            <p className={styles.modalBodyWinnerStatment}>{endGameText}</p>
          </div>
          
          <Container>
            <Row>
              <Col  xs={10}>Dealer's Hand:</Col>
              <Col>{endGameText != 'Tie Game' ? <p className={styles.modalBodyDealerHandValue}>{dealerHandValue}</p> : <p>{dealerHandValue}</p> }</Col>
            </Row>
            <Row>
              <Col xs={10}>{userName}'s Hand:</Col>
              <Col >
                {endGameText === `${userName} Wins` && <p className={styles.modalBodyPlayerWinPlayerHandValue}>{playerHandValue}</p>}
                {endGameText === 'The Dealer Wins' && <p className={styles.modalBodyPlayerLosePlayerHandValue}>{playerHandValue}</p>}
                {endGameText === 'Tie Game' && <p>{playerHandValue}</p>}
              </Col>
            </Row>
          </Container>

        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
          <Button className={styles.modalButtons} onClick={() => changeShownGame('')}>Home</Button>
          <Button onClick={newGameClear} className="btn-warning">New Game</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
