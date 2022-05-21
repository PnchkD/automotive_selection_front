import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { USER_ID, USER_LOGIN, ACCESS_TOKEN, USER_TOKEN_TYPE, USER_EXPIRES_IN, USER_ROLES, ROLE_ADMIN, ROLE_USER, ROLE_AUTOPICKER } from '../constants/constants';
import { UserOutlined, HomeOutlined } from '@ant-design/icons';

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

    if(localStorage.getItem(USER_ROLES)!=null && 
                          localStorage.getItem(USER_ROLES).includes(ROLE_ADMIN) && 
                          localStorage.getItem(USER_ROLES).includes(ROLE_USER) &&
                          localStorage.getItem(USER_ROLES).includes(ROLE_AUTOPICKER)){ 
        navItems = <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink tag={Link} to="/users/me"><UserOutlined /></NavLink>
            </NavItem>
            <NavItem>
                <NavLink  style={{paddingTop:13}}  tag={Link} to="/users/requests">My requests</NavLink>
            </NavItem>
            <NavItem>
                <NavLink  style={{paddingTop:13}} tag={Link} to="/admin/users">Users</NavLink>
            </NavItem>
            <NavItem>
                <NavLink  style={{paddingTop:13}} tag={Link} to="/autopicker/requests">Requests</NavLink>
            </NavItem>
            <NavItem>
                <NavLink  style={{paddingTop:13}} tag={Link} to="/autopicker/tickets">Tickets</NavLink>
            </NavItem>
            <NavItem>
                <NavLink style={{paddingTop:13}} onClick={this.logout} tag={Link} to="/auth">Log Out</NavLink>
            </NavItem>
        </Nav>
    } else if(localStorage.getItem(USER_ROLES)!=null && 
                      localStorage.getItem(USER_ROLES).includes(ROLE_ADMIN) &&
                      localStorage.getItem(USER_ROLES).includes(ROLE_USER) &&
                      !localStorage.getItem(USER_ROLES).includes(ROLE_AUTOPICKER)){ 
        navItems = <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink tag={Link} to="/users/me"><UserOutlined /></NavLink>
            </NavItem>            
            <NavItem>
                <NavLink  style={{paddingTop:13}}  tag={Link} to="/users/requests">My requests</NavLink>
            </NavItem>
            <NavItem>
                <NavLink  style={{paddingTop:13}}  tag={Link} to="/admin/users">Users</NavLink>
            </NavItem>
            <NavItem>
                  <NavLink  style={{paddingTop:13}}  onClick={this.logout} tag={Link} to="/auth">Log Out</NavLink>
                </NavItem>
        </Nav>
    }  else if(localStorage.getItem(USER_ROLES)!=null && 
                      localStorage.getItem(USER_ROLES).includes(ROLE_ADMIN) &&
                      !localStorage.getItem(USER_ROLES).includes(ROLE_USER) &&
                      !localStorage.getItem(USER_ROLES).includes(ROLE_AUTOPICKER)){ 
        navItems = <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink  style={{paddingTop:13}}  tag={Link} to="/admin/users">Users</NavLink>
            </NavItem>
          <NavItem>
              <NavLink  style={{paddingTop:13}}  onClick={this.logout} tag={Link} to="/auth">Log Out</NavLink>
          </NavItem>
    </Nav>
    } else if(localStorage.getItem(USER_ROLES)!=null && 
                      !localStorage.getItem(USER_ROLES).includes(ROLE_ADMIN) &&
                      localStorage.getItem(USER_ROLES).includes(ROLE_USER) &&
                      !localStorage.getItem(USER_ROLES).includes(ROLE_AUTOPICKER)){ 
          navItems = <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink tag={Link} to="/users/me"><UserOutlined /></NavLink>
            </NavItem>
            <NavItem>
                <NavLink  style={{paddingTop:13}}  tag={Link} to="/users/requests">My requests</NavLink>
            </NavItem>
            <NavItem>
          <NavLink  style={{paddingTop:13}}  onClick={this.logout} tag={Link} to="/auth">Log Out</NavLink>
            </NavItem>
          </Nav>
    } else if(localStorage.getItem(USER_ROLES)!=null && 
                      !localStorage.getItem(USER_ROLES).includes(ROLE_ADMIN) &&
                      localStorage.getItem(USER_ROLES).includes(ROLE_USER) &&
                      localStorage.getItem(USER_ROLES).includes(ROLE_AUTOPICKER)){ 
          navItems = <Nav className='ml-auto' navbar>
          <NavItem>
            <NavLink tag={Link} to="/users/me"><UserOutlined /></NavLink>
          </NavItem>
          <NavItem>
              <NavLink  style={{paddingTop:13}}  tag={Link} to="/users/requests">My requests</NavLink>
          </NavItem>
          <NavItem>
              <NavLink style={{paddingTop:13}} tag={Link} to="/autopicker/requests">Requests</NavLink>
          </NavItem>
          <NavItem>
              <NavLink style={{paddingTop:13}} tag={Link} to="/autopicker/tickets">Tickets</NavLink>
          </NavItem>
          <NavItem>
              <NavLink style={{paddingTop:13}} tag={Link} to="/autopicker/cars">Cars</NavLink>
          </NavItem>
          <NavItem>
            <NavLink style={{paddingTop:13}} onClick={this.logout} tag={Link} to="/auth">Log Out</NavLink>
            </NavItem>
          </Nav>
    } else if(localStorage.getItem(USER_ROLES)!=null && 
                      !localStorage.getItem(USER_ROLES).includes(ROLE_ADMIN) &&
                      !localStorage.getItem(USER_ROLES).includes(ROLE_USER) &&
                      localStorage.getItem(USER_ROLES).includes(ROLE_AUTOPICKER)){ 
        navItems = <Nav className="ml-auto" navbar>
        <NavItem>
            <NavLink tag={Link} to="/users/me"><UserOutlined /></NavLink>
        </NavItem>
        <NavItem>
          <NavLink  style={{paddingTop:13}}  tag={Link} to="/autopicker/requests">Requests</NavLink>
        </NavItem>
        <NavItem>
          <NavLink  style={{paddingTop:13}} tag={Link} to="/autopicker/tickets">Tickets</NavLink>
        </NavItem>
        <NavItem>
          <NavLink  style={{paddingTop:13}} tag={Link} to="/autopicker/cars">Cars</NavLink>
        </NavItem>
        <NavItem>
          <NavLink style={{paddingTop:13}}  onClick={this.logout} tag={Link} to="/auth">Log Out</NavLink>
        </NavItem>
        </Nav>
    } else {
        navItems = <Nav className="ml-auto" navbar>
        <NavItem>
            <NavLink  style={{paddingTop:13}} tag={Link} to="/auth">Login</NavLink>
        </NavItem>
        <NavItem>
            <NavLink  style={{paddingTop:13}} tag={Link} to="/auth/registration">Sing up</NavLink>
        </NavItem>
    </Nav>
    }


    return <Navbar color="dark" dark expand="md">
      <NavbarBrand style={{marginLeft:10}} tag={Link} to="/"><HomeOutlined /></NavbarBrand>
      <NavbarToggler onClick={this.toggle}/>
      <Collapse isOpen={this.state.isOpen} navbar>
          {navItems}
      </Collapse>
    </Navbar>;
  }
}

export default AppNavbar