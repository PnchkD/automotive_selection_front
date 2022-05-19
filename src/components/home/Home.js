import React, { Component } from 'react';
import '../../app/App.css';
import AppNavbar from '../../app/AppNavBar';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import { USER_ROLES, ROLE_ADMIN, ROLE_USER } from '../../constants/constants';
import UserHomePage from './UserHomePage.js'
class Home extends Component {
  
  render() {
    let newItems;

    if(localStorage.getItem(USER_ROLES)!= null && localStorage.getItem(USER_ROLES).includes(ROLE_USER)) {
      newItems = <UserHomePage />
    }  else if(localStorage.getItem(USER_ROLES)!= null && localStorage.getItem(USER_ROLES).includes(ROLE_ADMIN)){
      newItems = <Container fluid className='p-0 m-0'>
      <div className='bg-image w-100' style={{ backgroundColor: 'lightblue' }}>
      <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', height: 913 }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
          <div className='text-white'>
          <h1 className='mb-1'>HELLO!</h1>
              <Link className='btn btn-outline-light btn-lg' to='/admin/users' role='button'>
                  Manage users
              </Link>
          </div>
          </div>
      </div>
      </div>
  </Container>
  } else {
    newItems = <Container fluid className='p-0 m-0'>
        <div className='bg-image w-100' style={{ backgroundColor: 'lightblue' }}>
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', height: 913 }}>
            <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white'>
                <h1 className='mb-1'>HELLO!</h1>
                <Link className='btn btn-outline-light btn-lg' tag={Link} to='/auth' role='button'>
                  Sing in
                </Link>
                <Link className='btn btn-outline-light btn-lg' tag={Link} to='/auth/registration' role='button'>
                  Registration
                </Link>
            </div>
            </div>
        </div>
        </div>
    </Container>
  }
    return (
      <div>
        <AppNavbar/>
          {newItems}
      </div>
    );
  }
}

export default Home;