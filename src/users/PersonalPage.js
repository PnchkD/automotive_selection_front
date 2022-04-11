import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Container, Button, Card, Row, ButtonGroup} from 'react-bootstrap'
import {Input,  Label, FormGroup} from 'reactstrap';
import AppNavbar from '../AppNavBar.js';
import $ from 'jquery';
import ErrorHandler from '../handler/ErrorHandler';

let thisObj; 

class MePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login : localStorage.getItem("login"),
            id : localStorage.getItem("id"),
            role : localStorage.getItem("role"),
            user: null,
            isLoading: true,
            }

            this.logout = this.logout.bind(this)
            this.myReservations = this.myReservations.bind(this)
            this.upload = this.upload.bind(this)

            thisObj = this
        }

    async componentDidMount() {
        $.ajax({
            method: "Get",
            url: "/me",
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

    myReservations() {
        this.props.history.push('/users/reservations/' + localStorage.getItem("id"));
    }

    upload(event) {
		let target = event.target
		console.log(target)
		const fileInput = document.querySelector("#userImages");
		const formData = new FormData();

        for(let photo of fileInput.files){
            formData.append('photos', photo);
        }
	
		fetch("/resources/users/" + this.state.id, {
			method: "POST",
			body: formData,
			headers: {
				"Authorization": localStorage.getItem("tokenType") + " " + localStorage.getItem("accessToken")
			}
		}).then(function(){
            window.location.reload ();
        });
	}

    render() {

		const { user, isLoading } = this.state;

		if (isLoading) {
			return <p>Loading...</p>;
		}

        if(this.state.login == null || this.state.role == null || this.state.id == null){
            return <div><h1>Unauthorized</h1></div>
        }


        const avatar = user.avatar !== null ?   <Card > 
                                                    <Card.Img src={"/resources/users/" + user.id + "/photos/" + user.avatar.id}/>
                                                </Card> 
                                                : ""

        return <div className="d-grid gap-2">
                    {avatar}
                    <h1 className='text-white'>{this.state.login}</h1>
                    <ButtonGroup>
                        <h4 className='text-white'>Set avatar:</h4>
                        <Input className='text-white' color="primary" type="file" name="image" id={"userImages"} multiple></Input>
                        <Button className='btn btn-outline-light btn-lg' onClick={this.upload}> Confirm</Button>
                    </ButtonGroup>
                    <Button className='btn btn-outline-light btn-lg' variant="success" onClick={this.myReservations}>
                        My reservations
                    </Button>
                    <Button className='btn btn-outline-light btn-lg' variant="danger" onClick={this.logout}>
                        Logout
                    </Button>
                    
                </div>
    }
}

export default withRouter(MePage);