import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import AppNavbar from '../AppNavBar.js'
import $ from 'jquery';
import ErrorHandler from '../handler/ErrorHandler.js';
import ErrorNotifier from '../handler/ErrorNotifiers';
import NewPasswordScript from './NewPasswordScript.js';

var history

class NewPasswordForm extends React.Component {
    state ={
        code: '',
      }
      onCodeChange = (e) =>{
        this.setState({
            code: e.target.value
        })
      }  
     
      onSigninSubmit = (e) =>{
          const history = this.props.history;
          $.ajax({
              url: "/api/v1/auth/password_recovery/code/" + this.state.code,
              contentType: "application/json; charset=UTF-8",
              method: "get",
              success: function(data){
                  history.push('/passwordChange');
              },
              error: function(data){
                  ErrorHandler.runError(data.responseJSON.message)
              }
          })
          e.preventDefault();
      }
  
      render() {
        return(
            <div>
              <AppNavbar/>
              <NewPasswordScript 
                onSigninSubmit={this.onSigninSubmit} 
                code={this.state.code}      
                onCodeChange={this.onCodeChange} 
              />
            <ErrorNotifier/>
          </div>
        )
      }
}

export default NewPasswordForm