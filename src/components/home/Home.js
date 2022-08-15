import React, { Component } from 'react';
import '../../app/App.css';
import AppNavbar from '../../app/AppNavBar';
import { USER_ROLES, ROLE_ADMIN, ROLE_USER, ROLE_AUTOPICKER } from '../../constants/constants';
import UserHomePage from './UserHomePage.js'
import UserList from '../users/UserList';
import RequestList from '../requests/RequestList';


class Home extends Component {

  render() {
    return (
      <div>
         <UserHomePage />
      </div>
    );
  }
}

export default Home;