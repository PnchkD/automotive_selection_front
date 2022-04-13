import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavBar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

const roleUser = "ROLE_USER"
const roleAdmin = "ROLE_ADMIN"

class Home extends Component {
  
  render() {
    let newItems;

    if(localStorage.getItem("roles") === roleUser) {
      newItems = <Container fluid className='p-0 m-0'>
      <div className='bg-image w-100' style={{ backgroundColor: 'lightblue' }}>
      <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', height: 913 }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
          <div className='text-white'>
          <h1 className='mb-1'>HELLO!</h1>
              <Link className='btn btn-outline-light btn-lg' to='/users/me' role='button'>
              PersonalPage
              </Link>
          </div>
          </div>
      </div>
      </div>
  </Container>
    }  else if(localStorage.getItem("roles") === roleAdmin){
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
                <Link className='btn btn-outline-light btn-lg' to='/auth' role='button'>
                Sing in
                </Link>
                <Link className='btn btn-outline-light btn-lg' to='/auth/registration' role='button'>
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