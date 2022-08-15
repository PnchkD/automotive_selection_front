import React from "react";
import AppNavbar from '../../app/AppNavBar.js';
import ErrorHandler from '../../handler/ErrorHandler.js';
import 'antd/dist/antd.css';
import 'ant-design-pro/dist/ant-design-pro.css';
import { Form, Icon, Input, Divider, message } from "antd";
import {Button} from 'react-bootstrap';
import loginImg from '../../assets/login.png'
import jwt from 'jwt-decode'
import { Link } from "react-router-dom";
import { ACCESS_TOKEN, USER_ID, USER_TOKEN_TYPE, USER_LOGIN, USER_EXPIRES_IN, USER_ROLES, ISSUED_AT, ROLE_ADMIN, ROLE_AUTOPICKER, ROLE_USER } from '../../constants/constants.js';
import {login} from "../../services/auth/AuthService";
import SocialLogin from "./SocialLogin.js";
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
				if(data != null) {
					localStorage.setItem(ACCESS_TOKEN, data.accessToken);
					localStorage.setItem(USER_TOKEN_TYPE, data.tokenType);
					localStorage.setItem(USER_EXPIRES_IN, data.expiresIn);

					let decodedToken = jwt(data.accessToken);
					localStorage.setItem(USER_LOGIN, decodedToken.sub);
					localStorage.setItem(USER_ROLES, decodedToken.roles);
					localStorage.setItem(USER_ID, decodedToken.id);
					localStorage.setItem(ISSUED_AT, decodedToken.iat);

					if(localStorage.getItem(USER_ROLES)!= null && localStorage.getItem(USER_ROLES).includes(ROLE_USER)) {
						props.history.push('/');
					} else if(localStorage.getItem(USER_ROLES)!= null && localStorage.getItem(USER_ROLES).includes(ROLE_ADMIN)) {
						props.history.push('/admin/users');
					} else if(localStorage.getItem(USER_ROLES)!= null && localStorage.getItem(USER_ROLES).includes(ROLE_AUTOPICKER)) {
						props.history.push('/autopicker/requests');
					} else {
						props.history.push('/');
					}
				} else {
					message.error('Wrong data!')
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
						<h2 style={{textAlign:'center', marginLeft:-25}}>Login</h2>
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
								htmltype="submit"
								className="login-form-button"
								>Log in</Button>
								<Link style={{ float:'right' }} to="/passwordRecovery" role={'link'}>Forgot password?</Link>
							</FormItem>
							
						</Form>
						<Divider style={{color:'#c3c3c3', paddingRight: "30px"}}>Or</Divider>
						<SocialLogin/>
						</div>
					</div>
				</div>
			</div>
		  );
		}
	  }

export default AuthForm