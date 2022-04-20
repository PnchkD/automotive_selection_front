import React, { Component } from 'react';
import { Button } from 'reactstrap';
import AppNavbar from '../AppNavBar.js';
import { Link } from 'react-router-dom';
import ErrorHandler from '../handler/ErrorHandler.js';
import ErrorNotifier from '../handler/ErrorNotifiers.js';
import $ from "jquery";
import {  Card,Checkbox, List, Divider, Col } from 'antd';
import { Image } from 'react-bootstrap';

class UserList extends Component {

	constructor(props) {
		super(props);
		this.state = { users: [], isLoading: true };
		this.userBan = this.userBan.bind(this);
		this.userConfirm = this.userConfirm.bind(this);
		this.toogleRole = this.toogleRole.bind(this);
		this.clickRole = this.clickRole.bind(this);
		this.showSortMenu = this.showSortMenu.bind(this);
		this.showSearchMenu = this.showSearchMenu.bind(this);
		this.sortBy = this.sortBy.bind(this);
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
		let id = data.get('USER_ID')
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
		e.currentTarget.style.display='none';
	}

	showSortMenu() {
		document.getElementById("sortDropdown").classList.toggle("show");
	}

	showSearchMenu() {
		document.getElementById("searchDropdown").classList.toggle("show");
	}


	async sortBy(name) {
		let inputDesc = document.getElementById("descCheck");
		let desc = inputDesc.checked ? 'true' : 'false';
		const response = await fetch('/api/v1/admin/users?sortBy=' + name + '&desc=' + desc, {
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

	async searchBy() {
		let firstNameInput = document.getElementById("firstNameInput");
		let lastNameInput = document.getElementById("lastNameInput");
		let emailInput = document.getElementById("emailInput");

		let firstName = firstNameInput.value;
		let lastName = lastNameInput.value;
		let email = emailInput.value;
		const response = await fetch('/api/v1/admin/users/search?search=firstName:' + firstName + ',lastName:' + lastName + ',email:' + email, {
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
			const inputAdmin = user.roles.includes("ADMIN") ? 'true' : 'false';
			const inputUser = user.roles.includes("USER") ? 'true' : 'false';
			const roles = user.roles.map(role => role.role)
			const ban = user.bannedDate == null ? "ban" : "unban"
			user.showRoles = false;
			var re = new RegExp("[0-9][0-9][0-9][0-9][\s-][0-9][0-9][\s-][0-9][0-9]");
			const userAvatar = user.avatar==null ? "https://th.bing.com/th/id/R.d2c893f55930c7cb5bfe41538be295d7?rik=RCCbETsRGcm2iQ&pid=ImgRaw&r=0" : user.avatar
		return <div className="site-card-border-less-wrapper">
			<Card style={{boxShadow:'0px 8px 16px 8px rgba(0,0,0,0.2)'}} bordered={true} >
				<Col span={7}>
					<Image
					width={320}
					src={userAvatar}
    			/>
				</Col>
				<Col span={7}>
					<p><b>First name</b>: {user.firstName}</p>
					<p><b>Last name</b>: {user.lastName}</p>
					<p><b>Email</b>: {user.email}</p>
					<p><b>Roles</b>: {roles.join(" ")}</p>
					<p><b>Date of last login</b>: {re.exec(user.dateOfLastLogin)}</p>
					<p><b>Date of approved</b>: {re.exec(user.dateOfApproved)}</p>
					<p><b>Banned date</b>: {re.exec(user.bannedDate)}</p>
					<p><b>Date of confirmed mail</b>: {re.exec(user.isMailConfirmed)}</p>
					</Col>
					<Col span={6} style={{float:'right'}}>
						<Button size="sm" style={{marginRight: 8, width:100} } color="danger" onClick={() => this.userBan(user.id, ban)}>{ban}</Button>
						<Button size="sm" style={{marginRight: 8, width:100}  } color="primary" onClick={() => this.userConfirm(user.id)}>Confirm</Button>
						<Button size="sm" style={{marginRight: 8, width:100}  } color="primary" onClick={this.toogleRole}>Change roles</Button>						
						<form onSubmit={this.clickRole} className='editRoles' style={{  display: 'none'}}>
							<p><Checkbox defaultChecked={inputUser} style={{marginTop: 20, marginLeft:20}} name="ROLE" value="USER">USER</Checkbox></p>
							<p><Checkbox defaultChecked={inputAdmin} style={{marginTop: 20, marginLeft:20}} name="ROLE" value="ADMIN">ADMIN</Checkbox></p>
							<input type="hidden" name="USER_ID" value={user.id}/>
							<Button style={{marginBottom: 20, marginLeft:20}} size="sm" color="danger">submit</Button>
						</form>
					</Col>
			</Card>
		</div>
		});

		return (
			<div>
				<AppNavbar />
					 <Divider style={{fontSize:40}} orientation="left">Users</Divider>
					 <div style={{ marginLeft:30}}>
									<Button onClick={() => this.showSortMenu()} style={{ marginRight:20}} color="primary">Sort by</Button>
										<div id="sortDropdown" className="dropdown-content">
											<a href="#" onClick={() => this.sortBy('firstName')}>First name</a>
											<a href="#" onClick={() => this.sortBy('lastName')}>Last name</a>
											<a href="#" onClick={() => this.sortBy('email')}>Email</a>
											<span><input id="descCheck" style={{marginRight: 8}} name="descending" type="checkbox" value="descending"/>descending</span>
										</div>
										<Button onClick={() => this.showSearchMenu()} color="primary">Search by</Button>
										<div id="searchDropdown" className="dropdown-content">
											<span>First name<input id="firstNameInput" style={{marginLeft: 10}} name="firstName" type="text"/></span>
											<span>Last name<input id="lastNameInput" style={{marginLeft: 10}} name="lastName" type="text"/></span>
											<span>Email<input id="emailInput" style={{marginLeft: 10}} name="email" type="text"/></span>
											<Button onClick={() => this.searchBy()} className="searchbtn" color="danger">search</Button>
										</div>
								</div>
						<List
						dataSource={userList}
						renderItem={user => (
							<List.Item>
								{user}
							</List.Item>
						)}
						/>
				<ErrorNotifier/>
			</div>
		);
	}
}

export default UserList;