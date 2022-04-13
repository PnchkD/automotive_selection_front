import React from "react";
import $ from 'jquery';
import { Label } from 'reactstrap';
import AppNavbar from './AppNavBar.js';
import ErrorHandler from './handler/ErrorHandler.js';
import ErrorNotifier from './handler/ErrorNotifiers.js';

var jwt = require('jsonwebtoken');


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
                ErrorHandler.runError(data)
            }
		})
		event.preventDefault();
	}

    render(){
        
		return (
			<div>
				<AppNavbar/>
				<div class="container">
					<form onSubmit={this.handleSubmit}>				
						<div class="form-group mb-2">
							<Label className='text-white'>Login</Label>
							<input type="text" class="form-control"
								name="login" value={this.state.login} onChange={this.handleChange} />
						</div>

						<div class="form-group mb-2">
							<Label className='text-white'>Password</Label>
							<input type="password" class="form-control"
								name="password" value={this.state.password} onChange={this.handleChange} />
						</div>

						<input className='btn btn-outline-light' type="submit" value="Log in" />
					</form>
				</div>
                <ErrorNotifier />
			</div>
        )
    }
}

export default AuthForm