
import { useAuth } from "../context/AuthContext";
import styles from '../styles/Navbar.module.css'
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export const NavBar = ({ changeShownGame, setAccountFormVisable, setIsSignup }) => {
  const { user, loading, logOut } = useAuth()
  // if(loading) return(
  //   <Navbar collapseOnSelect='true' expand="lg" bg="dark" variant="dark" className={styles.frame}>
  //     <Nav.Link eventKey="1">
  //       <Navbar.Brand className={styles.brand} onClick={() => changeShownGame('')}>Casino</Navbar.Brand>
  //     </Nav.Link>
  //     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  //       <Navbar.Collapse id="responsive-navbar-nav">
          
  //         <Nav className={`${styles.nav}`}>
  //             <Nav.Link eventKey="1">
  //               <Button className={styles.buttonBlackJack} variant="outline-warning" onClick={() => {user ? changeShownGame('Black Jack') : setAccountFormVisable(true)}}>Black Jack</Button>
  //             </Nav.Link>
  //             <Nav.Link eventKey="2">
  //               <Button className={styles.buttonThreeCard} variant="outline-primary" onClick={() => {user ? changeShownGame('Three Card Poker') : setAccountFormVisable(true)}}>Three Card Poker</Button>
  //             </Nav.Link>
  //             <Nav.Link eventKey="3">
  //               <Button className={styles.buttonRoulette} variant="outline-danger" onClick={() => {user ? changeShownGame('Roulette') : setAccountFormVisable(true)}}>Roulette</Button>
  //             </Nav.Link>
  //             <Nav.Link eventKey="4">
  //               <Button className={styles.buttonSnailRace} variant="outline-success" onClick={() => {user ? changeShownGame('Snail Race') : setAccountFormVisable(true)}}>Snail Race</Button>
  //             </Nav.Link>
  //           </Nav>
  //       </Navbar.Collapse>
  //   </Navbar>
  // )
  return (
    <Navbar collapseOnSelect='true' expand="lg" bg="dark" variant="dark" className={styles.frame}>
      <Nav.Link eventKey="1">
        <Navbar.Brand className={styles.brand} onClick={() => changeShownGame('')}>Casino</Navbar.Brand>
      </Nav.Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          
          <Nav className={`${styles.nav}`}>
            <div className={styles.accountButtons}>
            {user ? (
              <Nav.Link eventKey="1">
                <Button className={`btn-danger ${styles.button}`} varient="alert" onClick={() => {logOut()}}>Logout</Button>
              </Nav.Link>) : (
                  <Nav.Link eventKey='1'>
                    <Button className={`${styles.button}`} varient="primary" onClick={() => (setIsSignup(false), setAccountFormVisable(true))}>Login</Button>
                    <Button className={`${styles.button}`}  variant="success" onClick={() => (setIsSignup(true), setAccountFormVisable(true))}>Signup</Button>
                  </Nav.Link>

              )}
            </div>
              <Nav.Link eventKey="1">
                <Button className={styles.buttonBlackJack} variant="outline-warning" onClick={() => {user ? changeShownGame('Black Jack') : setAccountFormVisable(true)}}>Black Jack</Button>
              </Nav.Link>
              <Nav.Link eventKey="2">
                <Button className={styles.buttonThreeCard} variant="outline-primary" onClick={() => {user ? changeShownGame('Three Card Poker') : setAccountFormVisable(true)}}>Three Card Poker</Button>
              </Nav.Link>
              <Nav.Link eventKey="3">
                <Button className={styles.buttonRoulette} variant="outline-danger" onClick={() => {user ? changeShownGame('Roulette') : setAccountFormVisable(true)}}>Roulette</Button>
              </Nav.Link>
              <Nav.Link eventKey="4">
                <Button className={styles.buttonSnailRace} variant="outline-success" onClick={() => {user ? changeShownGame('Snail Race') : setAccountFormVisable(true)}}>Snail Race</Button>
              </Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}