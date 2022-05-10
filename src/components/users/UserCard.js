import React, { Component } from 'react';
import {  Card,Checkbox, Avatar, Layout, Modal, Form } from 'antd';
import { Image } from 'react-bootstrap';
import { USER_BASE_AVATAR, USER_ICON } from '../../constants/constants.js';
import { CheckOutlined, LockOutlined, UserSwitchOutlined } from '@ant-design/icons';
const { Content } = Layout;
const { Meta } = Card;

class UserCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rolesModalVisible: this.props.rolesModalVisible
        };
    };

    render() {

        const user  = this.props.user;
        const roles = user.roles.map(role => role.role)
			const ban = user.bannedDate == null ? "ban" : "unban"
			user.showRoles = false;
			var re = new RegExp("[0-9][0-9][0-9][0-9][\s-][0-9][0-9][\s-][0-9][0-9]");
			const userAvatar = user.avatar==null ? USER_BASE_AVATAR : user.avatar;
			
			if(this.state.rolesModalVisible.get(user.id) == null) {
				this.state.rolesModalVisible.set(user.id, false);
			}
			const bannedDate = user.bannedDate != null?  <p><b>Banned date: </b><b style={{backgroundColor: 'rgb(252, 153, 158)'}}>{re.exec(user.bannedDate)}</b></p> : <p><b>Banned date</b>: {re.exec(user.bannedDate)}</p>
			
        return  <div className="site-card-border-less-wrapper">
        <Card style={{boxShadow:'0px 0px 16px 8px rgba(0,0,0,0.2)'}} actions={[
                                    <CheckOutlined key="edit" onClick={() => this.props.userConfirm(user.id)}/>,
                                    <LockOutlined key="setting" onClick={() => this.props.userBan(user.id, ban)}/>,
                                    <UserSwitchOutlined onClick={() => this.props.showRolesModal(user.id)}/>
                                    ]}>
            <Layout >
            <Content style={{display: 'flex', marginBottom:20}}>
                <Image className='user-avatar'
                    src={userAvatar}
                />
                <Layout className='user-description'>
                <Content>
                  <Meta  style={{ marginBottom:20}}
                                    avatar={<Avatar src={USER_ICON} />}
                                    title={user.firstName + ' ' + user.lastName}
                                    description={user.email}
                                />
                <p><b>Roles</b>: {roles.join(" ")}</p>
                <p><b>Date of last login</b>: {re.exec(user.dateOfLastLogin)}</p>
                <p><b>Date of approved</b>: {re.exec(user.dateOfApproved)}</p>
                {bannedDate}
                <p><b>Date of confirmed mail</b>: {re.exec(user.isMailConfirmed)}</p>
                <Modal title="Change roles" visible={this.state.rolesModalVisible.get(user.id)} onOk={() => this.props.roleChange(user.id)} onCancel={() => this.props.handleRolesCancel(user.id)}>
                    <Form className={'editRoles' + user.id}>
                        <span><Checkbox  style={{ marginLeft:20, marginRight:8}} name="ROLE" value="USER"/>USER
                        <Checkbox  style={{ marginLeft:80, marginRight:8}} name="ROLE" value="ADMIN"/>ADMIN
                        <Checkbox  style={{ marginLeft:80, marginRight:8}} name="ROLE" value="AUTOPICKER"/>AUTOPICKER</span>
                        <input type="hidden" name="USER_ID" value={user.id}/>
                    </Form>
                </Modal>
                </Content>
                </Layout>
                </Content>
            </Layout>
        </Card>
    </div>
    }
}

export default UserCard;