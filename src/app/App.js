import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../components/home/Home.js';
import AuthForm from '../components/auth/AuthForm.js';
import RegistrationForm from '../components/auth/RegistrationForm.js';
import UserList from '../components/users/UserList.js';
import PersonalPage from '../components/users/PersonalPage.js';
import PersonalRequests from '../components/users/PersonalRequests';
import RecoveryCodeSender from '../components/users/RecoveryCodeSender.js'
import RecoveryCodeConfirmer from '../components/users/RecoveryCodeConfirmer.js'
import NewPasswordForm from '../components/users/NewPasswordForm.js'
import CarList from '../components/cars/CarList.js'
import CarPage from '../components/cars/CarPage.js'
import RequestList from '../components/requests/RequestList.js'
import DepartureList from '../components/departures/DepartureList.js'

class App extends Component {
  state = {
    isLoading: true,
    users: []
  }

    render() {
      return (
        <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/auth' exact={true} component={AuthForm}/>
          <Route path='/auth/registration' exact={true} component={RegistrationForm}/>
          <Route path='/admin/users' exact={true} component={UserList}/>
          <Route path='/users/me' exact={true} component={PersonalPage}/>
          <Route path='/users/requests' exact={true} component={PersonalRequests}/>
          <Route path='/passwordRecovery' exact={true} component={RecoveryCodeSender}/>
          <Route path='/recoveryCode' exact={true} component={RecoveryCodeConfirmer}/>
          <Route path='/passwordChange' exact={true} component={NewPasswordForm}/>
          <Route path='/autopicker/cars' exact={true} component={CarList}/>
          <Route path='/autopicker/cars/:id' exact={true} component={CarPage}/>
          <Route path='/autopicker/requests' exact={true} component={RequestList}/>
          <Route path='/autopicker/departures' exact={true} component={DepartureList}/>
        </Switch>
     </Router>
      )
  } 
}

export default App;
