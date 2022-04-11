import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import AppNavbar from './AppNavBar.js'
import $ from 'jquery';
import ErrorHandler from './handler/ErrorHandler.js';
import ErrorNotifier from './handler/ErrorNotifiers.js';

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
			url: "/api/v1/auth/registration",
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
				<div class="container">
					<form onSubmit={this.handleSubmit}>

						<div class="form-group mb-2">
							<label class="form-label">First Name</label>
							<input type="text" class="form-control"
								name="firstName" value={this.state.firstName} onChange={this.handleChange} />
						</div>

						<div class="form-group mb-2">
							<label class="form-label">Last Name</label>
							<input type="text" class="form-control"
								name="lastName" value={this.state.lastName} onChange={this.handleChange} />
						</div>

						<div class="form-group mb-2">
							<label class="form-label">Login</label>
							<input type="text" class="form-control"
								name="login" value={this.state.login} onChange={this.handleChange} />
						</div>
						
						<div class="form-group mb-2">
							<label class="form-label">Email</label>
							<input type="text" class="form-control"
								name="email" value={this.state.email} onChange={this.handleChange} />
						</div>

						<div class="form-group mb-2">
							<label class="form-label">Password</label>
							<input type="password" class="form-control"
								name="password" value={this.state.password} onChange={this.handleChange} />
						</div>

						<div className="d-grid gap-2">
							<input className='btn btn-outline-light btn-lg' type="submit" value="Register" />
						</div>
					</form>
				</div>
                <ErrorNotifier />
			</div>
		);
	}
}

export default NameForm