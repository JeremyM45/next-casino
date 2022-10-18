import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function EndGameModal({newGameClear, changeShownGame, endGameText, playerHandValue, dealerHandValue, userName}) {
  return (
    <>
      <Modal
        show={true}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Round Over</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {endGameText}
          <p>{userName}'s Hand Value: {playerHandValue}</p>
          <p>Dealer's Hand Value: {dealerHandValue}</p>

        </Modal.Body>
        <Modal.Footer>
          <Button className='btn' onClick={() => changeShownGame('')}>Home</Button>
          <Button onClick={newGameClear} className="btn-warning">New Game</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
