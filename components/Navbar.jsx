
import { useAuth } from "../context/AuthContext";
import styles from '../styles/Navbar.module.css'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

export const NavBar = ({ changeShownGame }) => {
  const { user, logOut } = useAuth()
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Casino</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
          <NavItem>
            <Button className={`btn-warning ${styles.button}`} onClick={() => changeShownGame('BlackJack')}>Black Jack</Button>
          </NavItem>
          <NavItem>
            <Button className={`btn ${styles.button}`} onClick={() => changeShownGame('')}>Home</Button>
          </NavItem>
          {user && (
            <NavItem>
              <Button className={`btn-danger ${styles.button}`} varient="alert" onClick={() => {logOut()}}>Logout</Button>
            </NavItem>)}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}