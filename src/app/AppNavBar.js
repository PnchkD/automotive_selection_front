import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { USER_ID, USER_LOGIN, ACCESS_TOKEN, USER_TOKEN_TYPE, USER_EXPIRES_IN, USER_ROLES, ROLE_ADMIN, ROLE_USER } from '../constants/constants';

class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {isOpen: false};

    this.toggle = this.toggle.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout() {
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(USER_TOKEN_TYPE)
    localStorage.removeItem(USER_EXPIRES_IN)
    
    localStorage.removeItem(USER_LOGIN)
    localStorage.removeItem(USER_ID)
    localStorage.removeItem(USER_ROLES)

    }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    let navItems;

    if(localStorage.getItem(USER_ROLES)!=null && localStorage.getItem(USER_ROLES).includes(ROLE_ADMIN) && localStorage.getItem(USER_ROLES).includes(ROLE_USER)){ 
        navItems = <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink tag={Link} to="/users/me">Me</NavLink>
            </NavItem>
            <NavItem>
                <NavLink padding = "10px" tag={Link} to="/admin/users">Users</NavLink>
            </NavItem>
            <NavItem>
                    <NavLink onClick={this.logout} tag={Link} to="/auth">Log Out</NavLink>
                </NavItem>
        </Nav>
    } else if(localStorage.getItem(USER_ROLES)!=null && localStorage.getItem(USER_ROLES).includes(ROLE_ADMIN)){ 
        navItems = <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink padding = "10px" tag={Link} to="/admin/users">Users</NavLink>
            </NavItem>
            <NavItem>
                  <NavLink onClick={this.logout} tag={Link} to="/auth">Log Out</NavLink>
                </NavItem>
        </Nav>
    } else if(localStorage.getItem(USER_ROLES)!=null && localStorage.getItem(USER_ROLES).includes(ROLE_USER)){
        navItems = <Nav className="ml-auto" navbar>
        <NavItem>
            <NavLink tag={Link} to="/users/me">Me</NavLink>
        </NavItem>
        <NavItem>
              <NavLink onClick={this.logout} tag={Link} to="/auth">Log Out</NavLink>
        </NavItem>
    </Nav>
    } else {
        navItems = <Nav className="ml-auto" navbar>
        <NavItem>
            <NavLink tag={Link} to="/auth">Login</NavLink>
        </NavItem>
        <NavItem>
            <NavLink tag={Link} to="/auth/registration">Sing up</NavLink>
        </NavItem>
    </Nav>
    }


    return <Navbar color="dark" dark expand="md">
      <NavbarBrand style={{marginLeft:10}} tag={Link} to="/">  Home</NavbarBrand>
      <NavbarToggler onClick={this.toggle}/>
      <Collapse isOpen={this.state.isOpen} navbar style={{float:'right'}}>
          {navItems}
      </Collapse>
    </Navbar>;
  }
}

export default AppNavbar