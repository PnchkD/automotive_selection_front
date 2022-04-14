import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import AppNavbar from '../AppNavBar.js'
import $ from 'jquery';
import ErrorHandler from '../handler/ErrorHandler.js';
import ErrorNotifier from '../handler/ErrorNotifiers.js';
import EnterNewPasswordScript from './EnterNewPasswordScript.js';

var history

class EnterNewPasswordForm extends React.Component {
    state ={
        login: '',
        newPassword: '',
        confirmedPassword: ''
      }

      onLoginChange = (e) =>{
        this.setState({
            login: e.target.value
        })
      }  

      onNewPasswordChange = (e) =>{
        this.setState({
            newPassword: e.target.value
        })
      }  

      onConfirmedPasswordChange = (e) =>{
        this.setState({
            confirmedPassword: e.target.value
        })
      }  
     
      onSigninSubmit = (e) =>{
          const history = this.props.history;
          $.ajax({
              url: "/api/v1/auth/password_recovery",
              contentType: "application/json; charset=UTF-8",
              method: 'PUT',
              data: JSON.stringify(this.state),
              success: function(data){
                  history.push('/auth');
              },
              error: function(data){
                  ErrorHandler.runError(data)
              }
          })
          e.preventDefault();
      }
  
      render() {
        return(
            <div>
              <AppNavbar/>
              <EnterNewPasswordScript 
                onSigninSubmit={this.onSigninSubmit} 
                login={this.state.login}
                newPassword={this.state.newPassword}
                confirmedPassword={this.state.confirmedPassword}
                onLoginChange={this.onLoginChange} 
                onNewPasswordChange={this.onNewPasswordChange}
                onConfirmedPasswordChange={this.onConfirmedPasswordChange}
              />
          </div>
        )
      }
}

export default EnterNewPasswordForm