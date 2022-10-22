
import { useAuth } from "../context/AuthContext";
import styles from '../styles/Navbar.module.css'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';
import Link from "next/link";

export const NavBar = ({ changeShownGame, setAccountFormVisable, setIsSignup }) => {
  const { user, logOut } = useAuth()
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Casino</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link eventKey="1">
                <Button className={`btn-warning ${styles.button}`} onClick={() => changeShownGame('Black Jack')}>Black Jack</Button>
              </Nav.Link>
              <Nav.Link eventKey="1">
                <Button className={`btn ${styles.button}`} onClick={() => changeShownGame('')}>Home</Button>
              </Nav.Link>
              {user ? (
                <Nav.Link eventKey="1">
                  <Button className={`btn-danger ${styles.button}`} varient="alert" onClick={() => {logOut()}}>Logout</Button>
                </Nav.Link>) : (
                  <Nav.Link eventKey='1'>
                    <Button  varient="primary" onClick={() => (setIsSignup(false), setAccountFormVisable(true))}>Login</Button>
                    <Button  variant="success" onClick={() => (setIsSignup(true), setAccountFormVisable(true))}>Signup</Button>
                  </Nav.Link>
                )
              }
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}