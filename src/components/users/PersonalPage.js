import React, { Component } from 'react';
import {Input,  Label, FormGroup} from 'reactstrap';
import AppNavbar from '../../app/AppNavBar.js';
import { Card, Form, Avatar, Modal, Divider, Layout } from 'antd';
import ErrorHandler from '../../handler/ErrorHandler';
import ErrorNotifier from '../../handler/ErrorNotifiers.js';
import ImageLoader from "../../util/ImageLoader";
import { USER_ID, USER_LOGIN, USER_ROLES, USER_ICON } from '../../constants/constants.js';
import { changeAvatar, changePassword, changePersonalData, loadUser } from '../../services/user/UserService.js';
import { EditOutlined, KeyOutlined } from '@ant-design/icons';
const { Content } = Layout;
const { Meta } = Card;
let thisObj; 

class PersonalPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login : localStorage.getItem(USER_LOGIN),
            id : localStorage.getItem(USER_ID),
            roles : localStorage.getItem(USER_ROLES),
            user: {
                firstName: "",
                lastName: "",
                email: "",
                avatar: null
            },
                isLoading: true,
                isDataModalVisible: false,
                isPasswordModalVisible: false
            }

            this.handleChange = this.handleChange.bind(this);
            this.showDataModal = this.showDataModal.bind(this);
            this.handleDataOk = this.handleDataOk.bind(this);
            this.handleDataCancel = this.handleDataCancel.bind(this);
            this.showPasswordModal = this.showPasswordModal.bind(this);
            this.handlePasswordOk = this.handlePasswordOk.bind(this);
            this.handlePasswordCancel = this.handlePasswordCancel.bind(this);

            thisObj = this
        }

    async componentDidMount() {
        loadUser(this.state.id)
            .then(data => {
                thisObj.setState({ user: data, isLoading: false  });
            })
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        let value = target.value;
        let user = { ...this.state.user };

        user[name] = value;
        this.setState({ user: user });
    }

    handleImageUrlChange = (imageUrl) => {
        //this.state.user.avatar = imageUrl;
        const formData = new FormData();
        for(let photo of imageUrl){
            formData.append('photos', photo.originFileObj);
        }        // const newAvatar = {
        //     image: imageUrl
        // }

        // fetch("http://localhost:8080/api/v1/users/" + this.state.id + "/avatar", {
        //         method: "PATCH",
        //         body: formData,
        //         headers: {
        //             "Authorization": localStorage.getItem("tokenType") + " " + localStorage.getItem("accessToken")
        //         }
        //     })
        changeAvatar(formData, this.state.id)
            .then(() => {
                window.location.reload();
            })
    }

    showDataModal = () => {
        this.setState({isDataModalVisible: true});
      };

    showPasswordModal = () => {
        this.setState({isPasswordModalVisible: true});
      };
    
    handleDataOk = () => {
        const personalDataRequest = {
            firstName : this.state.user.firstName,
            lastName :  this.state.user.lastName,
            email : this.state.user.email
        }

        changePersonalData(personalDataRequest, localStorage.getItem('id'))
            .then(data => {
                ErrorHandler.runSuccess(data.message);
            }).then(() => {
                this.componentDidMount();
            })

        this.setState({isDataModalVisible: false});
    };

    handlePasswordOk = (event) => {
        const data = new FormData(event.currentTarget.parentElement.parentElement.parentElement.querySelector('.newPassword'));
        const newPasswordRequest = {
            login: localStorage.getItem(USER_LOGIN),
            oldPassword: data.get('oldPassword'),
            newPassword: data.get('newPassword'),
            confirmedPassword: data.get('confirmedPassword')
        }

        changePassword(newPasswordRequest, localStorage.getItem(USER_ID))
            .then(() => {
                ErrorHandler.runSuccess(data.message)
            })

        this.setState({isPasswordModalVisible: false});
    };
    
    handleDataCancel = () => {
        this.setState({isDataModalVisible: false});
    };

    handlePasswordCancel = () => {
        this.setState({isPasswordModalVisible: false});
    };

    render() {

		const { user, isLoading } = this.state;

		if (isLoading) {
			return <p>Loading...</p>;
		}

        return <div>
                    <AppNavbar/>
                        <Card>
                        <Layout >
                            <Content style={{display: 'flex', marginBottom:20}} >
                                <Card style={{marginLeft:'2%', width:'35%', backgroundColor:"#f0f2f5"}} bordered={false}>
                                    <ImageLoader
                                        imageUrl={this.state.user.avatar}
                                        handleImageUrlChange={this.handleImageUrlChange}
                                    />     
                                </Card>
                                <Card className="aside-card" style={{marginLeft:'7%', marginTop:10,  boxShadow:'0px 8px 16px 0px rgba(0,0,0,0.2)'}}>     
                                    <Divider style={{fontSize:30}} orientation="left">Personal data</Divider>                          
                                    <Meta  style={{marginTop: 20, marginLeft:20}}
                                        avatar={<Avatar src={USER_ICON} />}
                                        title={user.firstName + ' ' + user.lastName}
                                        description={user.email}
                                    />
                                    <Card bodyStyle={{display: 'none'}} style={{marginTop: 145}} actions={[
                                        <EditOutlined key="edit" onClick={this.showDataModal}/>,
                                        <KeyOutlined key="setting" onClick={this.showPasswordModal}/>
                                        ]} />
                                </Card>
                                    <Modal title="Change personal data" visible={this.state.isDataModalVisible} onOk={this.handleDataOk} onCancel={this.handleDataCancel}>
                                        <Form>
                                            <FormGroup>
                                                <Label style={{marginBottom:10}} for="email">Email</Label>
                                                <Input style={{marginBottom:20}} type="text" name="email" id="email" value={user.email || ''}
                                                    onInput={this.handleChange} autoComplete="email" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label style={{marginBottom:10}} for="firstName">First Name</Label>
                                                <Input style={{marginBottom:20}} type="text" name="firstName" id="firstName" value={user.firstName || ''}
                                                    onInput={this.handleChange} autoComplete="firstName" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label style={{marginBottom:10}} for="lastName">Last Name</Label>
                                                <Input style={{marginBottom:20}} type="text" name="lastName" id="lastName" value={user.lastName || ''}
                                                    onInput={this.handleChange} autoComplete="lastName" />
                                            </FormGroup>
                                        </Form>
                                    </Modal>
                                    <Modal title="Change credentials" visible={this.state.isPasswordModalVisible} onOk={this.handlePasswordOk} onCancel={this.handlePasswordCancel}>
                                        <Form className='newPassword'>
                                            <Label style={{marginTop:10, marginLeft:20}} for="lastName">Old password</Label>
                                            <Input style={{marginTop:10, marginLeft:20, width: 420}}color="primary" type="password" required name="oldPassword"></Input>
                                            <Label style={{marginTop:10, marginLeft:20}} for="lastName">New password</Label>
                                            <Input style={{marginTop:10, marginLeft:20, width: 420}}color="primary" type="password" required name="newPassword"></Input>
                                            <Label style={{marginTop:10, marginLeft:20}} for="lastName">Confirm password</Label>
                                            <Input style={{marginTop:10, marginLeft:20, width: 420}}color="primary" type="password" required name="confirmedPassword"></Input>
                                        </Form>
                                    </Modal>
                                </Content>
                            </Layout>
                        </Card>
                <ErrorNotifier />
                </div>
    }
}

export default PersonalPage;