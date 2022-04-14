import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import AppNavbar from '../AppNavBar.js'
import $ from 'jquery';
import ErrorHandler from '../handler/ErrorHandler.js';
import ErrorNotifier from '../handler/ErrorNotifiers';
import PasswordRecoveryLogin from './PasswordRecoveryLogin.js';


class PasswordRecoveryHandler extends React.Component {
    state ={
      login: '',
    }
    onLoginChange = (e) =>{
      this.setState({
          login: e.target.value
      })
    }  
   
    onSigninSubmit = (e) =>{
        const history = this.props.history;
		$.ajax({
			url: "/api/v1/auth/password_recovery?login=" + this.state.login,
			contentType: "application/json; charset=UTF-8",
			method: "get",
            success: function(data){
                history.push('/recoveryCode');
            },
            error: function(data){
                ErrorHandler.runError(data.responseJSON.httpCode, data.responseJSON.description)
            }
		})
		e.preventDefault();
    }

    render() {
      return(
          <div>
            <AppNavbar/>
            <PasswordRecoveryLogin 
            onSigninSubmit={this.onSigninSubmit} 
            login={this.state.login}      
            onLoginChange={this.onLoginChange} 
            />
				  <ErrorNotifier/>
        </div>
      )
    }
  }
  
  export default PasswordRecoveryHandler;