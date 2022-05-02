import React, { Component } from 'react';
import { Button } from 'reactstrap';
import AppNavbar from '../../app/AppNavBar.js';
import ErrorHandler from '../../handler/ErrorHandler.js';
import ErrorNotifier from '../../handler/ErrorNotifiers.js';
import { Checkbox, List, Divider, Layout, Input, Menu } from 'antd';
import { loadUsers, userBan, userConfirm, changeRoles, searchBy } from '../../services/user/UserService';
import SubMenu from 'antd/lib/menu/SubMenu';
import UserCard from './UserCard.js';
const { Sider, Content } = Layout;

class UserList extends Component {

	constructor(props) {
		super(props);
		this.state = { users: [], isLoading: true, rolesModalVisible: new Map() };
		this.userBan = this.userBan.bind(this);
		this.userConfirm = this.userConfirm.bind(this);
		this.roleChange = this.roleChange.bind(this);
		this.showSortMenu = this.showSortMenu.bind(this);
		this.showSearchMenu = this.showSearchMenu.bind(this);
		this.showRolesModal = this.showRolesModal.bind(this);
		this.handleRolesCancel = this.handleRolesCancel.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
	}

	componentDidMount() {
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

	roleChange(userId) {
		let rolesSelector = '.editRoles' + userId;
		let data = new FormData(document.querySelector(rolesSelector));

		const rolesRequest = {
			roles: data.getAll('ROLE')
		}
		changeRoles(rolesRequest, userId)
			.then(data => {
				ErrorHandler.runSuccess(data.message);
			}).then(() => {
				this.componentDidMount();
			})

		this.setState({rolesModalVisible:this.state.rolesModalVisible.set(userId,false)});
	}
	
    showRolesModal = (id) => {
		const rolesModal = this.state.rolesModalVisible;
		rolesModal.set(id,true)
		this.setState({rolesModalVisible:this.state.rolesModalVisible.set(id,true)});
	 };

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

		let firstName = firstNameInput != null ? firstNameInput.value : '';
		let lastName = lastNameInput != null ? lastNameInput.value : '';
		let email =  emailInput != null ? emailInput.value : '';

		searchBy(name, desc, firstName, lastName, email)
			.then(data => {
				this.setState({ users: data.usersDTO, isLoading: false });
			})
	}
    
    handleRolesCancel = (id) => {
		this.setState({rolesModalVisible:this.state.rolesModalVisible.set(id,false)});
    };


	render() {
		const { users, isLoading } = this.state;
		if (isLoading) {
			return <p>Loading...</p>;
		}

		const userList = users.map(user => {
			return <UserCard 
						user={user} 
						rolesModalVisible={this.state.rolesModalVisible}
						userConfirm={this.userConfirm} 
						userBan={this.userBan}
						showRolesModal={this.showRolesModal}
						roleChange={this.roleChange}
						handleRolesCancel={this.handleRolesCancel}/>
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