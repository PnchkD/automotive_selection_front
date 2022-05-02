import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import AppNavbar from '../../app/AppNavBar.js'
import ErrorNotifier from '../../handler/ErrorNotifiers';
import { Form, Input, Divider } from 'antd';
import {Button} from 'react-bootstrap';
import { MailOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { confirmRecoveryCode } from '../../services/auth/AuthService.js';
const FormItem = Form.Item;

var history

class NewPasswordForm extends React.Component {
      constructor(props) {
        super(props);
          this.state = {
            code: ''
          }
        this.onCodeChange = this.onCodeChange.bind(this);
        this.onSigninSubmit = this.onSigninSubmit.bind(this);

        history = this.props.history;
      }  

      onCodeChange(e) {
        this.setState({
            code: e.target.value
        })
      }  
     
      onSigninSubmit(e) {
        confirmRecoveryCode(this.state.code)
          .then(() => {
            history.push('/passwordChange');
          })
        e.preventDefault();
      }
  
      render() {
        return(	<div>
          <AppNavbar/>
            <div className="lContainer">
              <div className="ReqItem">
                  <div className="pasReqForm">
                    <MailOutlined style={{backgroundColor: 'rgb(255, 180, 210)', borderRadius:15}}/>
                    <Divider style={{fontSize:20}}>Check your email</Divider>
                    <Form onSubmit={this.onSigninSubmit} >
                    <FormItem>
                      <Input
                        id="code"
                        label="Code"
                        name="code"
                        autoComplete="code"
                        autoFocus
                        placeholder="Enter recovery code"
                        onChange={this.onCodeChange}
                        value={this.state.code}
                        required
                      />
                      <Button size="sm"
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                      >Confirm code</Button>
                      <Link style={{float:'left'}} to='/auth'>Back</Link>
                      <Link style={{float:'right'}} to='/auth/registration'>Sing up</Link>
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

export default NewPasswordForm