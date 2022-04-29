import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import AppNavbar from '../app/AppNavBar.js'
import $ from 'jquery';
import ErrorHandler from '../handler/ErrorHandler.js';
import ErrorNotifier from '../handler/ErrorNotifiers.js';
import { Form, Icon, Input, Divider } from 'antd';
import {Button} from 'react-bootstrap';
import { LockOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { API_BASE_URL } from '../constants/constants.js';
import { changePassword } from '../services/auth/AuthService.js';
const FormItem = Form.Item;

var history
class EnterNewPasswordForm extends React.Component {
      constructor(props) {
        super(props);
          this.state = {
            login: '',
            newPassword: '',
            confirmedPassword: ''
          }
        this.onLoginChange = this.onLoginChange.bind(this);
        this.onNewPasswordChange = this.onNewPasswordChange.bind(this);
        this.onConfirmedPasswordChange = this.onConfirmedPasswordChange.bind(this);
        this.onSigninSubmit = this.onSigninSubmit.bind(this);

        history = this.props.history;
      }    

      onLoginChange(e) {
        this.setState({
            login: e.target.value
        })
      }  

      onNewPasswordChange(e) {
        this.setState({
            newPassword: e.target.value
        })
      }  

      onConfirmedPasswordChange(e) {
        this.setState({
            confirmedPassword: e.target.value
        })
      }  
     
      onSigninSubmit(e) {
        changePassword(this.state)
          .then(() => {
            history.push('/auth');
          })
          e.preventDefault();
      }
  
      render() {
        return(<div>
          <AppNavbar/>
            <div className="lContainer">
              <div className="ReqItem">
                  <div className="pasReqForm">
                    <LockOutlined />
                    <Divider style={{fontSize:20}}>Enter new password</Divider>
                    <Form onSubmit={this.onSigninSubmit} >
                    <FormItem>
                      <Input
                        prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)", margin:-15 }} />}
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
                      <Input
                      	prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)", margin:-15 }} />}
                        name="newPassword"
                        label="New password"
                        type="password"
                        id="newPassword"
                        autoComplete="newPassword"
                        placeholder="New password"
                        onChange={this.onNewPasswordChange}
                        value={this.state.newPassword}
                        required
                      />
                      <Input
                      	prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)", margin:-15 }} />}
                        name="confirmedPassword"
                        label="Confirmed password"
                        type="password"
                        id="confirmedPassword"
                        autoComplete="confirmedPassword"
                        placeholder="Confirmed password"
                        onChange={this.onConfirmedPasswordChange}
                        value={this.state.confirmedPassword}
                        required
                      />
                      <Button size="sm"
                        type="primary"
                        htmlType="submit"
                        className="login-form-button">
                      Confirm password
                    </Button>
                      <Link style={{float:'left'}} to='/auth'>Sing in</Link>
                      <Link style={{float:'right'}} to='/auth/registration'>Registration</Link>
                    </FormItem>
                    </Form>
                  </div>
              </div>
            </div>
        <ErrorNotifier/>
        </div>
        )
      }
}

export default EnterNewPasswordForm