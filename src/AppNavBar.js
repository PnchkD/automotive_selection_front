import React, { Component } from 'react';
import { Alert, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { alignPropType } from 'react-bootstrap/esm/types';

const roleUser = "USER"
const roleAdmin = "ADMIN"

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
    localStorage.removeItem("roles")

    }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    let navItems;

    if(localStorage.getItem("roles")!=null && localStorage.getItem("roles").includes(roleAdmin) && localStorage.getItem("roles").includes(roleUser)){ 
        navItems = <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink tag={Link} to="/users/me">Me</NavLink>
            </NavItem>
            <NavItem>
                <NavLink padding = "10px" tag={Link} to="/admin/users">Users</NavLink>
            </NavItem>
            <NavItem>
                    <NavLink onClick={this.logout} to="/auth">Log Out</NavLink>
                </NavItem>
        </Nav>
    } else if(localStorage.getItem("roles")!=null && localStorage.getItem("roles").includes(roleAdmin)){ 
        navItems = <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink padding = "10px" tag={Link} to="/admin/users">Users</NavLink>
            </NavItem>
            <NavItem>
                  <NavLink onClick={this.logout} tag={Link} to="/auth">Log Out</NavLink>
                </NavItem>
        </Nav>
    } else if(localStorage.getItem("roles")!=null && localStorage.getItem("roles").includes(roleUser)){
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