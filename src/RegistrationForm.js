import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import AppNavbar from './AppNavBar.js'
import $ from 'jquery';
import ErrorHandler from './handler/ErrorHandler.js';
import ErrorNotifier from './handler/ErrorNotifiers.js';
import { Form, Icon, Input, Checkbox, message } from "antd";
import {Button} from 'react-bootstrap';
import loginImg from './registration.png'
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
		$.ajax({
			url: "http://localhost:8080/api/v1/auth/registration",
			contentType: "application/json; charset=UTF-8",
			method: "post",
			data: JSON.stringify(this.state),
			success: function(data){
				history.push("/auth")
			},
			error: function(data){
                ErrorHandler.runError(data)
            }
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