import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import AppNavbar from '../AppNavBar.js'
import $ from 'jquery';
import ErrorHandler from '../handler/ErrorHandler.js';
import ErrorNotifier from '../handler/ErrorNotifiers';
import { Form, Input, Divider } from 'antd';
import {Button} from 'react-bootstrap';
import { LockOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
const FormItem = Form.Item;


let history;

class PasswordRecoveryHandler extends React.Component {
    constructor(props) {
      super(props);
        this.state = {
          login: ''
        }
      this.onLoginChange = this.onLoginChange.bind(this);
      this.onSigninSubmit = this.onSigninSubmit.bind(this);

      history = this.props.history;
    }  
 
    onLoginChange(e) {
      this.setState({
          login: e.target.value
      })
    }  
   
    onSigninSubmit(e) {
        $.ajax({
          url: "http://localhost:8080/api/v1/auth/password_recovery?login=" + this.state.login,
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
    
      return (
        	<div>
          <AppNavbar/>
            <div className="lContainer">
              <div className="ReqItem">
                  <div className="pasReqForm">
                    <LockOutlined />
                    <Divider style={{fontSize:20}}>Password recovery</Divider>
                    <Form onSubmit={this.onSigninSubmit} >
                    <FormItem>
                      <Input
                        id="login"
                        label="Login"
                        name="login"
                        autoComplete="login"
                        autoFocus
                        placeholder="Login"
                        onChange={this.onLoginChange}
                        value={this.state.login}
                        required
                      />
                      <Button size="sm"
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                      >Sing up</Button>
                      <Link style={{float:'left'}} to='/auth'>Sing in</Link>
                      <Link style={{float:'right'}} to='/auth/registration'>Registration</Link>
                    </FormItem>
                    </Form>
                  </div>
              </div>
            </div>
        <ErrorNotifier/>
        </div>
      );
    }
  }
  
  export default PasswordRecoveryHandler;