import { Nav, NavItem, NavLink, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

export const Navbar = ({ changeShownGame }) => {

  return(
    <Nav variant='pills' className="justify-content-center">
      <NavItem>
        <Button varient="alert" onClick={() => changeShownGame('BlackJack')}>Black Jack</Button>
      </NavItem>
      <NavItem>
        <Button varient="alert" onClick={() => changeShownGame('')}>Home</Button>
      </NavItem>
    </Nav>
  )
}