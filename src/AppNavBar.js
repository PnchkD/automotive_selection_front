import React, { Component } from 'react';
import { Alert, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const roleUser = "ROLE_USER"
const roleAdmin = "ROLE_ADMIN"

class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {isOpen: false};

    this.toggle = this.toggle.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout() {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("tokenType")
    localStorage.removeItem("expiresIn")
    
    localStorage.removeItem("login")
    localStorage.removeItem("id")
    localStorage.removeItem("role")

    }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    let navItems;

    if(localStorage.getItem("roles") === roleAdmin){ 
        navItems = <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink padding = "10px" href="/admin">Admin Console</NavLink>
            </NavItem>
            <NavItem>
                    <NavLink onClick={this.logout} href="/auth">Log Out</NavLink>
                </NavItem>
        </Nav>
    } else if(localStorage.getItem("roles") === roleUser){
        navItems = <Nav className="ml-auto" navbar>
        <NavItem>
            <NavLink href="/users/me">Me</NavLink>
        </NavItem>
        <NavItem>
                    <NavLink onClick={this.logout} href="/auth">Log Out</NavLink>
        </NavItem>
    </Nav>
    } else {
        navItems = <Nav className="ml-auto" navbar>
        <NavItem>
            <NavLink href="/auth">Login</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="/auth/registration">Registration</NavLink>
        </NavItem>
    </Nav>
    }


    return <Navbar color="dark" dark expand="md">
      <NavbarBrand tag={Link} to="/">  Home</NavbarBrand>
      <NavbarToggler onClick={this.toggle}/>
      <Collapse isOpen={this.state.isOpen} navbar>
          {navItems}
      </Collapse>
    </Navbar>;
  }
}

export default AppNavbar