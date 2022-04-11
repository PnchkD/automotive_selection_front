import React, { Component } from 'react';
import '../App.css';
import AppNavbar from '../AppNavBar.js';
import { Link } from 'react-router-dom';
import { Button, Container, Col, Row} from 'react-bootstrap';

class AdminPage extends Component {
    constructor(props){
        super(props);

        this.goToUsers = this.goToUsers.bind(this);
    }

    goToUsers(){
        this.props.history.push('/admin/users')
    }

    render() {
        return (
        <div>
            <AppNavbar/>
            <Container fluid>
            <Row>
                <Col xs="4">
                    <div className="d-grid gap-2">
                        <Button className='btn btn-outline-light btn-lg' variant="success" onClick={this.goToUsers}>
                            Users
                        </Button>
                    </div>
                </Col>
                
                <Col xs ="8">
                </Col>
            </Row>
            </Container>
        </div>
        );
  }
}

export default AdminPage;