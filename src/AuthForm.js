import React from "react";
import $ from 'jquery';
import AppNavbar from './AppNavBar.js';
import ErrorHandler from './handler/ErrorHandler.js';
import ErrorNotifier from './handler/ErrorNotifiers.js';
import 'antd/dist/antd.css';
import 'ant-design-pro/dist/ant-design-pro.css';
import { Form, Icon, Input, Checkbox, message } from "antd";
import {Button} from 'react-bootstrap';
import loginImg from './login.png'

const FormItem = Form.Item;

var jwt = require('jsonwebtoken');


class AuthForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            login: "",
            password: "",
			autoLogin: true,
        }
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
		const target = event.target;
		const value = target.value
		const name = target.name

		this.setState({
			[name]: value
		});
	}

    handleSubmit(event) {
		let props = this.props;
		$.ajax({
			url: "/api/v1/auth",
			contentType: "application/json; charset=UTF-8",
			method: "post",
			data: JSON.stringify(this.state),
            statusCode: {
                200: function(data, textStatus, xhr){
                    localStorage.setItem('accessToken', data.accessToken);
                    localStorage.setItem('tokenType', data.tokenType);
                    localStorage.setItem('expiresIn', data.expiresIn);

					let decodedToken = jwt.decode(data.accessToken);
					console.log(decodedToken)
                    localStorage.setItem('login', decodedToken.sub);
                    localStorage.setItem('roles', decodedToken.roles);
                    localStorage.setItem('id', decodedToken.id);

					props.history.push('/');
                }
            },
			error: function(data){
                ErrorHandler.runError(data.responseJSON.message)
            }
		})
		event.preventDefault();
	}
  

    render(){
       
		return (
			<div>
				<AppNavbar/>
				<div className="lContainer">
			<div className="lItem">
				<div className="loginImage">
				  <img src={loginImg} width="300" style={{position: 'relative'}} alt="login"/>
				</div>
				<div className="loginForm">
				  <h2>Login</h2>
					<Form onSubmit={this.handleSubmit} className="login-form">
					<FormItem>
						<Input
						  prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)", margin:-15 }} />}
						  placeholder="Username"
						  onChange={this.handleChange}
						  name="login" value={this.state.login}
						  required
						/>
					</FormItem>
					<FormItem>
						<Input
						  prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)", margin:-15 }} />}
						  type="password"
						  name="password" value={this.state.password}
						  placeholder="Password"
						  onChange={this.handleChange}
						  required
						/>
					</FormItem>
					<FormItem>
					  <Button size="sm"
						type="primary"
						htmlType="submit"
						className="login-form-button"
					  	>Log in</Button>
						<a style={{ float:'right' }} href="/passwordRecovery">Забыли пароль?</a>
					</FormItem>
					
				  </Form>
				</div>
			</div>
			</div>
			</div>
		  );
		}
	  }

export default AuthForm