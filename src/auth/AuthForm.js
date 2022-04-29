import React from "react";
import $ from 'jquery';
import AppNavbar from '../app/AppNavBar.js';
import ErrorHandler from '../handler/ErrorHandler.js';
import 'antd/dist/antd.css';
import 'ant-design-pro/dist/ant-design-pro.css';
import { Form, Icon, Input } from "antd";
import {Button} from 'react-bootstrap';
import loginImg from '../assets/login.png'
import jwt from 'jwt-decode'
import { Link } from "react-router-dom";
import { ACCESS_TOKEN, USER_ID, API_BASE_URL, USER_TOKEN_TYPE, USER_LOGIN, USER_EXPIRES_IN, USER_ROLES } from '../constants/constants.js';
import {login} from "../services/auth/AuthService";
const FormItem = Form.Item;

class AuthForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            login: "",
            password: ""
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
		const loginRequest = {
            login: this.state.login,
            password: this.state.password,
			autoLogin: true
        };
		let props = this.props;
		
		login(loginRequest)
			.then(data => {
				localStorage.setItem(ACCESS_TOKEN, data.accessToken);
				localStorage.setItem(USER_TOKEN_TYPE, data.tokenType);
				localStorage.setItem(USER_EXPIRES_IN, data.expiresIn);

				let decodedToken = jwt(data.accessToken);
				console.log(decodedToken)
				localStorage.setItem(USER_LOGIN, decodedToken.sub);
				localStorage.setItem(USER_ROLES, decodedToken.roles);
				localStorage.setItem(USER_ID, decodedToken.id);

				props.history.push('/');
			}).catch(data => {
				ErrorHandler.runError(data.responseJSON.message);
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
						<Link style={{ float:'right' }} to="/passwordRecovery" role={'link'}>Забыли пароль?</Link>
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