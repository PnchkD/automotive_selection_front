import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../AppNavBar.js';
import { Link } from 'react-router-dom';

class UserList extends Component {

	constructor(props) {
		super(props);
		this.state = { users: [], isLoading: true };
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

	render() {
		const { users, isLoading } = this.state;
		if (isLoading) {
			return <p>Loading...</p>;
		}

		const userList = users.map(user => {
			const roles = user.roles.map(role => role.role)
			const ban = user.bannedDate == null ? "ban" : "unban"
			return <tr key={user.id}>
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
						<Button size="sm" style={{marginRight: 8} } color="primary" tag={Link} to={"/users/" + ban + "/" + user.id}>{ban}</Button>
						<Button size="sm" style={{marginRight: 8} } color="primary" tag={Link} to={"/users/me/" + user.id}>Confirm</Button>
						<Button size="sm" style={{marginRight: 8} } color="primary" tag={Link} to={"/users/me/" + user.id}>Edit</Button>
					</ButtonGroup>
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
			</div>
		);
	}
}

export default UserList;