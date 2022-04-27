import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Container, Button, Row, ButtonGroup, Nav, NavLink, NavItem, TabContent, TabPane, Image} from 'react-bootstrap'
import {Input,  Label, FormGroup} from 'reactstrap';
import AppNavbar from '../AppNavBar.js';
import $ from 'jquery';
import { Card, Col, Form, Divider, Upload } from 'antd';
import ErrorHandler from '../handler/ErrorHandler';
import ErrorNotifier from '../handler/ErrorNotifiers.js';
import ImageLoader from "../util/ImageLoader";

let thisObj; 

class PersonalPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login : localStorage.getItem("login"),
            id : localStorage.getItem("id"),
            roles : localStorage.getItem("roles"),
            user: {
                firstName: "",
                lastName: "",
                email: "",
                avatar: ""
            },
            isLoading: true,
            }

            this.logout = this.logout.bind(this);
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.changePassword = this.changePassword.bind(this)
            this.toogleRole = this.toogleRole.bind(this);

            thisObj = this
        }

    async componentDidMount() {
        $.ajax({
            method: "Get",
            url: "http://localhost:8080/api/v1/users/" + this.state.id,
            headers: {
                "Authorization": localStorage.getItem("tokenType") + " " + localStorage.getItem("accessToken")
              },
            success: function(data){
                thisObj.setState({ user: data, isLoading: false  });
            },
            error: function(data){
                ErrorHandler.runError(data)
            }
        })
    }

    logout() {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("tokenType")
        localStorage.removeItem("expiresIn")
        
        localStorage.removeItem("login")
        localStorage.removeItem("id")
        localStorage.removeItem("role")

        this.props.history.push('/auth');
    }

    changePassword(event) {
        debugger
        event.preventDefault();
		const data = new FormData(event.currentTarget);
        const password = {
            login: localStorage.getItem('login'),
            oldPassword: data.get('oldPassword'),
            newPassword: data.get('newPassword'),
            confirmedPassword: data.get('confirmedPassword')
        }
        $.ajax({
            url: 'http://localhost:8080/api/v1/users/' + localStorage.getItem('id') + '/credentials',
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": localStorage.getItem("tokenType") + " " + localStorage.getItem("accessToken")
            },
            data: JSON.stringify(password),
            success: function(data){
                ErrorHandler.runSuccess(data)
            },
			error: function(data){
                ErrorHandler.runError(data.responseJSON.httpCode, data.responseJSON.errorDescription)
            }
        })
	}

    toogleRole(e) {
        let block = e.currentTarget.parentElement.parentElement.querySelector('.newPassword');
        if(block.style.display == 'none') {
            block.style.display = 'block';
            block.style.position = 'relative';
        } else {
            block.style.display = 'none';
        }
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        let value = target.value;
        let user = { ...this.state.user };

        user[name] = value;
        this.setState({ user: user });
    }

    async handleSubmit(event) {
        event.preventDefault();
        let data = {
            firstName : this.state.user.firstName,
            lastName :  this.state.user.lastName,
            email : this.state.user.email
        }

        $.ajax({
            url: 'http://localhost:8080/api/v1/users/' + localStorage.getItem('id'),
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": localStorage.getItem("tokenType") + " " + localStorage.getItem("accessToken")
            },
            data: JSON.stringify(data)
        })
    }

    handleImageUrlChange = (imageUrl) => {
        this.state.user.avatar = imageUrl;
        const newAvatar = {
            image: imageUrl
        }
        $.ajax({
            url: "http://localhost:8080/api/v1/users/" + this.state.id + "/avatar",
            method: "PATCH",
            data: JSON.stringify(newAvatar),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": localStorage.getItem("tokenType") + " " + localStorage.getItem("accessToken")
        }})
    }

    render() {

		const { user, isLoading } = this.state;

		if (isLoading) {
			return <p>Loading...</p>;
		}

        if(this.state.login == null || this.state.roles == null || this.state.id == null){
            return <div><h1>Unauthorized</h1></div>
        }


        return <div>
                    <AppNavbar/>
                        <Card>
                            <Col xs={2} sm={4} md={6} lg={8} xl={7}>
                                <ImageLoader
                                    imageUrl={this.state.user.avatar}
                                    handleImageUrlChange={this.handleImageUrlChange}
                                />
                            </Col>
                            <Col xs={1}></Col>

                        <Col xs={20} sm={16} md={16} lg={8} xl={14}>
                            <Card style={{boxShadow:'0px 8px 16px 8px rgba(0,0,0,0.2)'}} bordered={true}>
                                    <Divider style={{fontSize:30}} orientation="left">Personal data</Divider>
                                    <Form onSubmit={this.handleSubmit}>
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
                                        <FormGroup>
                                            <Button style={{marginRight:20, width:100}} color="primary" type="submit">Save</Button>{' '}                                           
                                        </FormGroup>
                                    </Form>
                                    <Button style={{marginTop:30, width:230, height:40}} size="sm" color="primary" onClick={this.toogleRole}>Change password</Button>
                                    <Form onSubmit={this.changePassword} className='newPassword' style={{display: 'none', marginTop:30}}>
                                                <Label style={{marginTop:10, marginLeft:20}} for="lastName">Old password</Label>
                                                <Input style={{marginTop:10, marginLeft:20, width: 420}}color="primary" type="password" name="oldPassword"></Input>
                                                <Label style={{marginTop:10, marginLeft:20}} for="lastName">New password</Label>
                                                <Input style={{marginTop:10, marginLeft:20, width: 420}}color="primary" type="password" name="newPassword"></Input>
                                                <Label style={{marginTop:10, marginLeft:20}} for="lastName">Confirm password</Label>
                                                <Input style={{marginTop:10, marginLeft:20, width: 420}}color="primary" type="password" name="confirmedPassword"></Input>
                                                <Button style={{marginTop: 20, marginBottom: 20, marginLeft:20}} type="submit">Confirm</Button>
                                            </Form>
                                </Card>
                        </Col>
                        </Card>
                <ErrorNotifier />
                </div>
    }
}

export default PersonalPage;