import { Nav, NavItem, NavLink, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import styles from '../styles/Navbar.module.css'

export const Navbar = ({ changeShownGame }) => {
  const { user, logOut } = useAuth()
  return(
    <Nav variant='pills' className={`justify-content-center ${styles.frame}`}>
      <NavItem>
        <Button className={`btn-warning ${styles.button}`} onClick={() => changeShownGame('BlackJack')}>Black Jack</Button>
      </NavItem>
      <NavItem>
        <Button className={`btn ${styles.button}`} onClick={() => changeShownGame('')}>Home</Button>
      </NavItem>
      {user ? (
        <NavItem>
          <Button className={`btn-danger ${styles.button}`} varient="alert" onClick={() => {logOut()}}>Logout</Button>
        </NavItem>
      ) : null}
      
      
    </Nav>
  )
}