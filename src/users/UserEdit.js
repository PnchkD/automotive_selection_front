import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from '../AppNavBar.js';
import ErrorHandler from '../handler/ErrorHandler.js';
import ErrorNotifier from '../handler/ErrorNotifiers.js';
import $ from "jquery";

let thisObj

class UserEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        thisObj = this
    }

    async componentDidMount() {
        $.ajax({
			url: `/user-management/users/${thisObj.props.match.params.id}`,
			method: "GET",
			headers:{
				'Authorization': localStorage.getItem("tokenType") + " " + localStorage.getItem("accessToken")
			},
			success: function(data){
				thisObj.setState({ user: data, isLoading: false });
			},
			error: function(data){
				ErrorHandler.runError(data)
			}
		})
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        let value = target.value;
        let user = { ...this.state.user };

        if(name === 'enabled'){
            value = target.checked
        }

        user[name] = value;
        this.setState({ user: user });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const { user: user } = this.state;
                
		$.ajax({
			url: '/user-management/users/' + user.id,
			method: "PUT",
            data: JSON.stringify(user),
			headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
				'Authorization': localStorage.getItem("tokenType") + " " + localStorage.getItem("accessToken")
			},
			success: function(data){
				thisObj.setState({ users: data.users, isLoading: false });
                thisObj.props.history.push('/user-management/users');
                ErrorHandler.runSuccess(data)
			},
			error: function(data){
				ErrorHandler.runError(data)
			}
		})
    }

    render() {
        const { user: user } = this.state;
        const title = <h2 className='text-white'>Edit User {user.id}</h2>;

        return <div>
            <AppNavbar />
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup className="mt-3">
                        <Label className='text-white' for="email">Email</Label>
                        <Input type="text" name="email" id="email" value={user.email || ''}
                            onChange={this.handleChange} autoComplete="email" />
                    </FormGroup>
                    <FormGroup className="mt-3">
                        <Label className='text-white' for="firstName">First Name</Label>
                        <Input type="text" name="firstName" id="firstName" value={user.firstName || ''}
                            onChange={this.handleChange} autoComplete="firstName" />
                    </FormGroup>
                    <FormGroup className="mt-3">
                        <Label className='text-white' for="lastName">Last Name</Label>
                        <Input type="text" name="lastName" id="lastName" value={user.lastName || ''}
                            onChange={this.handleChange} autoComplete="lastName" />
                    </FormGroup>
                    <FormGroup className="mt-3">
                        <Label className='text-white' for="enabled">Enabled</Label>
                        <Input type="checkbox" name="enabled" id="enabled" checked={user.enabled}
                            onChange={this.handleChange} autoComplete="enabled" />
                    </FormGroup>
                    <FormGroup className="mt-3">
                        <Label className='text-white' for="eventState">Role</Label>
                        <div className='text-white' onChange={this.handleChange}>
                            <Input type="radio" name="role" value='AGENT' standalone checked={user.role == "AGENT"} />
                            Agent
                        </div>
                        <div className='text-white' onChange={this.handleChange}>
                            <Input type="radio" name="role" value='USER' standalone checked={user.role == "USER"} />
                            User
                        </div>
                    </FormGroup>
                    <FormGroup className="mt-3">
                        <Button className='btn btn-outline-light btn-lg' color="primary" type="submit">Save</Button>{' '}
                        <Button className='btn btn-outline-light btn-lg' color="secondary" tag={Link} to="/user-management/users">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(UserEdit);