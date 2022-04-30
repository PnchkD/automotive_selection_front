import React, { Component } from 'react';
import { Button } from 'reactstrap';
import AppNavbar from '../app/AppNavBar.js';
import ErrorHandler from '../handler/ErrorHandler.js';
import ErrorNotifier from '../handler/ErrorNotifiers.js';
import {  Card,Checkbox, List, Divider, Col, Layout, Input,  Menu } from 'antd';
import { Image } from 'react-bootstrap';
import { USER_BASE_AVATAR, ROLE_ADMIN, ROLE_USER } from '../constants/constants'
import { loadUsers, userBan, userConfirm, changeRoles, searchBy } from '../services/user/UserService';
import { CheckOutlined, LockOutlined, UserSwitchOutlined } from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
const { Header, Footer, Sider, Content } = Layout;

class UserList extends Component {

	constructor(props) {
		super(props);
		this.state = { users: [], isLoading: true };
		this.userBan = this.userBan.bind(this);
		this.userConfirm = this.userConfirm.bind(this);
		this.toogleRole = this.toogleRole.bind(this);
		this.roleChange = this.roleChange.bind(this);
		this.showSortMenu = this.showSortMenu.bind(this);
		this.showSearchMenu = this.showSearchMenu.bind(this);
	}

	async componentDidMount() {
		loadUsers()
			.then(data => {
				this.setState({ users: data.usersDTO, isLoading: false });
			})
	}

	userBan(id, ban) {

		const banRequest = {
			userId: id,
			userBan: ban
		}

		userBan(banRequest)
			.then(data => {
				ErrorHandler.runSuccess(data.message);
			}).then(() => {
				this.componentDidMount();
			})
	}

	userConfirm(id) {

		const confirmRequest = {
			userId: id,
		}

		userConfirm(confirmRequest)
			.then(data => {
				ErrorHandler.runSuccess(data.message);
			}).then(() => {
				this.componentDidMount();
			})
	}

	roleChange(e) {
		e.preventDefault();
		let data = new FormData(e.currentTarget);

		const rolesRequest = {
			roles: data.getAll('ROLE')
		}

		changeRoles(rolesRequest, data.get('USER_ID'))
			.then(data => {
				ErrorHandler.runSuccess(data.message);
			}).then(() => {
				this.componentDidMount();
			})

		e.currentTarget.style.display='none';
	}
	
	toogleRole(e) {
		let block = e.currentTarget.parentElement.parentElement.querySelector('.editRoles');
		if(block.style.display == 'none') {
			block.style.display = 'block';
		} else {
			block.style.display = 'none';
		}
	}

	showSortMenu() {
		document.getElementById("sortDropdown").classList.toggle("show");
	}

	showSearchMenu() {
		document.getElementById("searchDropdown").classList.toggle("show");
	}

	async searchBy(name) {
		let inputDesc = document.getElementsByName('descending');
		let desc = inputDesc.checked ? 'true' : 'false';
		let firstNameInput = document.getElementById("firstNameInput");
		let lastNameInput = document.getElementById("lastNameInput");
		let emailInput = document.getElementById("emailInput");

		let firstName = firstNameInput.value;
		let lastName = lastNameInput.value;
		let email = emailInput.value;

		searchBy(name, desc, firstName, lastName, email)
			.then(data => {
				this.setState({ users: data.usersDTO, isLoading: false });
			})
	}



	render() {
		const { users, isLoading } = this.state;
		if (isLoading) {
			return <p>Loading...</p>;
		}

		const userList = users.map(user => {
			const inputAdmin = user.roles.includes(ROLE_ADMIN) ? 'true' : 'false';
			const inputUser = user.roles.includes(ROLE_USER) ? 'true' : 'false';
			const roles = user.roles.map(role => role.role)
			const ban = user.bannedDate == null ? "ban" : "unban"
			user.showRoles = false;
			var re = new RegExp("[0-9][0-9][0-9][0-9][\s-][0-9][0-9][\s-][0-9][0-9]");
			const userAvatar = user.avatar==null ? USER_BASE_AVATAR : user.avatar
		return <div className="site-card-border-less-wrapper">
			<Card style={{boxShadow:'0px 0px 16px 8px rgba(0,0,0,0.2)'}} actions={[
                                        <CheckOutlined key="edit" onClick={this.showDataModal}/>,
                                        <LockOutlined key="setting" onClick={this.showPasswordModal}/>,
										<UserSwitchOutlined onClick={this.toogleRole}/>
                                        ]}>
				<Col span={7}>
					<Image className='user-avatar'
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
						<form onSubmit={this.roleChange} className='editRoles' style={{  display: 'none'}}>
							<p><Checkbox  style={{marginTop: 20, marginLeft:20}} name="ROLE" value="USER">USER</Checkbox></p>
							<p><Checkbox  style={{marginTop: 20, marginLeft:20}} name="ROLE" value="ADMIN">ADMIN</Checkbox></p>
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
				<Layout>
					<Content  style={{
							padding: '0 50px',
						}}>
						<Divider style={{fontSize:40}} orientation="left">Users</Divider>
						<Layout
							style={{
							padding: '24px 0',
							}}>
							<Sider>
								<Menu mode="inline">
									<SubMenu key="1" title="Search by">
										<Menu.Item key='2'>
											<Input id="firstNameInput" placeholder="First name" name="firstName" type="text"/>
										</Menu.Item>
										<Menu.Item key='3'>
											<Input id="lastNameInput" placeholder="Last name" name="lastName" type="text"/>
										</Menu.Item>
										<Menu.Item key='4'>
											<Input id="emailInput" placeholder="Email" name="email" type="text"/>
										</Menu.Item>
										<Menu.Item key='5'>
											<Button onClick={() => this.searchBy('id')} color="danger">search</Button>
										</Menu.Item>
									</SubMenu>
									<SubMenu key="6" title="Sort by">
										<Menu.Item key="7">
											<a href="#" onClick={() => this.searchBy('firstName')}>First name</a>
										</Menu.Item>
										<Menu.Item key="8">
											<a href="#" onClick={() => this.searchBy('lastName')}>Last name</a>
										</Menu.Item>
										<Menu.Item key="9">
											<a href="#" onClick={() => this.searchBy('email')}>Email</a>
										</Menu.Item>
										<Menu.Item key="10">
											<span><Checkbox style={{marginRight:8}} id="descCheck" name="descending" type="checkbox"/>Descending</span>
										</Menu.Item>
									</SubMenu>
								</Menu>
						</Sider> 
			
							<Content>
								<List
								dataSource={userList}
								renderItem={user => (
									<List.Item>
										{user}
									</List.Item>
								)}
								/>
							</Content>
						</Layout>
						</Content>
					</Layout>
				<ErrorNotifier/>
			</div>
		);
	}
}

export default UserList;