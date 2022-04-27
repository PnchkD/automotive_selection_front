import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home.js';
import AuthForm from './AuthForm.js';
import RegistrationForm from './RegistrationForm.js';
import UserList from './users/UserList.js';
import AdminPage from './admin/AdminPage.js';
import PersonalPage from './users/PersonalPage.js';
import UserEdit from './users/UserEdit.js'
import PasswordRecoveryHandler from './users/PasswordRecoveryHandler.js'
import NewPasswordForm from './users/NewPasswordForm.js'
import EnterNewPasswordForm from './users/EnterNewPasswordForm.js'


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
          <Route path='/admin' exact={true} component={AdminPage}/>
          <Route path='/users/me' exact={true} component={PersonalPage}/>
          <Route path='/users/me/:id' exact={true} component={UserEdit}/>
          <Route path='/passwordRecovery' exact={true} component={PasswordRecoveryHandler}/>
          <Route path='/recoveryCode' exact={true} component={NewPasswordForm}/>
          <Route path='/passwordChange' exact={true} component={EnterNewPasswordForm}/>
          
        </Switch>
     </Router>
      )
  } 
}

export default App;
