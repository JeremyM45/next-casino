import { Nav, NavItem, NavLink, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

export const Navbar = ({ changeShownGame }) => {

  return(
    <Nav variant='pills' className="justify-content-center">
      <NavItem>
        <Button className="btn-warning" onClick={() => changeShownGame('BlackJack')}>Black Jack</Button>
      </NavItem>
      <NavItem>
        <Button className="btn" onClick={() => changeShownGame('')}>Home</Button>
      </NavItem>
    </Nav>
  )
}