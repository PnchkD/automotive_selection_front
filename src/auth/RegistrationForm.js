import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import AppNavbar from '../app/AppNavBar.js'
import { Form, Icon, Input } from "antd";
import {Button} from 'react-bootstrap';
import loginImg from '../assets/registration.png'
import { singUp } from '../services/auth/AuthService.js';
const FormItem = Form.Item;

var history

class NameForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			login: '',
			password: '',
			email: '',
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		history = this.props.history;
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
		const sinfUpRequest = {
            firstName: this.state.firstName,
			lastName: this.state.lastName,
			login: this.state.login,
            password: this.state.password,
			email: this.state.email
        };

		singUp(sinfUpRequest)
			.then(() => {
				history.push("/auth")
			})

		event.preventDefault();
	}

	render() {
		return (

			<div>
				<AppNavbar/>
				<div className="lContainer">
			<div className="lItem">
				<div className="loginImage">
				  <img src={loginImg} width="150" style={{marginLeft:80, position: 'center'}} alt="registration"/>
				</div>
				<div className="loginForm">
				  <h2>Registration</h2>
					<Form onSubmit={this.handleSubmit} className="login-form">
					<FormItem>
						<Input
						  prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)", margin:-15 }} />}
						  placeholder="First name"
						  onChange={this.handleChange}
						  name="firstName" value={this.state.firstName}
						  required
						/>
						<Input
						  prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)", margin:-15 }} />}
						  placeholder="Last name"
						  onChange={this.handleChange}
						  name="lastName" value={this.state.lastName}
						  required
						/>
						<Input
						  prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)", margin:-15 }} />}
						  placeholder="Email"
						  onChange={this.handleChange}
						  name="email" value={this.state.email}
						  required
						/>
						<Input
						  prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)", margin:-15 }} />}
						  placeholder="Login"
						  onChange={this.handleChange}
						  name="login" value={this.state.login}
						  required
						/>
						<Input
						  prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)", margin:-15 }} />}
						  type="password"
						  name="password" value={this.state.password}
						  placeholder="Password"
						  onChange={this.handleChange}
						  required
						/>
					  <Button size="sm"
						type="primary"
						htmlType="submit"
						className="login-form-button"
					  >Sing up</Button>
					</FormItem>
				  </Form>
				</div>
			</div>
			</div>
			</div>
		);
	}
}

export default NameForm