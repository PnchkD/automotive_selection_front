import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../AppNavBar.js';
import { Link } from 'react-router-dom';
import ErrorHandler from '../handler/ErrorHandler.js';
import ErrorNotifier from '../handler/ErrorNotifiers.js';
import $ from "jquery";
import { CheckBox } from 'react-native-web';

class UserList extends Component {

	constructor(props) {
		super(props);
		this.state = { users: [], isLoading: true };
		this.userBan = this.userBan.bind(this);
		this.userConfirm = this.userConfirm.bind(this);
		this.toogleRole = this.toogleRole.bind(this);
		this.clickRole = this.clickRole.bind(this);
	}

	async componentDidMount() {
		const response = await fetch("/api/v1/admin/users", {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': localStorage.getItem("tokenType") + " " + localStorage.getItem("accessToken")
			}
		});
		const body = await response.json();
		this.setState({ users: body.usersDTO, isLoading: false });
	}

	async userBan(id, ban) {
		$.ajax({
			url: '/api/v1/admin/users/' + ban + '/' + id,
			contentType: "application/json; charset=UTF-8",
			method: "patch",
            headers:{
				'Authorization': localStorage.getItem("tokenType") + " " + localStorage.getItem("accessToken")
			},
			success: function(data){
				ErrorHandler.runSuccess(data.message);
			},
			error: function(data){
				ErrorHandler.runError(data.responseJSON.message);
			}
		}).then(() => {
			this.componentDidMount();
		});
	}

	async userConfirm(id) {
		$.ajax({
			url: '/api/v1/admin/users/confirm/' + id,
			contentType: "application/json; charset=UTF-8",
			method: "patch",
            headers:{
				'Authorization': localStorage.getItem("tokenType") + " " + localStorage.getItem("accessToken")
			},
			success: function(data){
				ErrorHandler.runSuccess(data.message);
			},
			error: function(data){
				ErrorHandler.runError(data.responseJSON.message);
			}
		}).then(() => {
			this.componentDidMount();
		});
	}
	
	toogleRole(e) {
		let block = e.currentTarget.parentElement.parentElement.querySelector('.editRoles');
		if(block.style.display == 'none') {
			block.style.display = 'block';
		} else {
			block.style.display = 'none';
		}
	}

	clickRole(e) {
		e.preventDefault();
		let data = new FormData(e.currentTarget);
		let id =data.get('USER_ID')
		let role = data.getAll('ROLE');
		let sendRoles = {
			roles: role
		}
		
		$.ajax({
			url: '/api/v1/admin/users/role/' + id,
			contentType: "application/json; charset=UTF-8",
			method: "patch",
			data: JSON.stringify(sendRoles),
            headers:{
				'Authorization': localStorage.getItem("tokenType") + " " + localStorage.getItem("accessToken")
			},
			success: function(data){
				ErrorHandler.runSuccess(data.message);
			},
			error: function(data){
				ErrorHandler.runError(data.responseJSON.message);
			}
		}).then(() => {
			this.componentDidMount();
		});
	}


	render() {
		const { users, isLoading } = this.state;
		if (isLoading) {
			return <p>Loading...</p>;
		}

		const userList = users.map(user => {
			const roles = user.roles.map(role => role.role)
			const ban = user.bannedDate == null ? "ban" : "unban"
			user.showRoles = false;
			
			return <tr key={user.id} style={{height: 150}} >
				<td>{user.firstName}</td>
				<td>{user.lastName}</td>
				<td>{user.email}</td>
				<td>{roles.join(" ")}</td>
				<td>{user.dateOfLastLogin}</td>
				<td>{user.dateOfApproved}</td>
				<td>{user.bannedDate}</td>
				<td>{user.isMailConfirmed}</td>
				<td>			
					<ButtonGroup>
						<Button size="sm" style={{marginRight: 8} } color="primary" onClick={() => this.userBan(user.id, ban)}>{ban}</Button>
						<Button size="sm" style={{marginRight: 8} } color="primary" onClick={() => this.userConfirm(user.id)}>Confirm</Button>
						<Button size="sm" style={{marginRight: 8} } color="primary" onClick={this.toogleRole}>Change roles</Button>						
					</ButtonGroup>
					<form onSubmit={this.clickRole} className='editRoles' style={{display: 'none'}}>
						<input name="ROLE" type="checkbox" value="USER"/><span>USER</span>
						<input name="ROLE" type="checkbox" value="ADMIN"/><span>ADMIN</span>
						<input type="hidden" name="USER_ID" value={user.id}/>
						<button size="sm" color="danger" >submit</button>
					</form>
				</td>
			</tr>
		});

		return (
			<div>
				<AppNavbar />
				<Container fluid>
					<h3 className='text-white'>User list</h3>
					<Table className="mt-4">
						<thead>
							<tr>
								<th width="10%">First name</th>
								<th width="10%">Last name</th>
								<th width="10%">Email</th>
								<th width="10%">Roles</th>
								<th width="10%">Date of last login</th>
								<th width="10%">Date of approved</th>
								<th width="10%">Banned date</th>
								<th width="10%">Mail confirmed</th>
								<th width="20%"></th>
							</tr>
						</thead>
						<tbody>
							{userList}
						</tbody>
					</Table>
				</Container>
				<ErrorNotifier/>
			</div>
		);
	}
}

export default UserList;