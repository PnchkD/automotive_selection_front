import React, { Component } from 'react';
import {  Card, Layout, Carousel, Divider, Descriptions, Button, Breadcrumb } from 'antd';
import { Image } from 'react-bootstrap';
import { CAR_BASE_PHOTO } from '../../constants/constants.js';
import { SearchOutlined, EditOutlined } from '@ant-design/icons';
import { loadCar } from '../../services/cars/CarService';
import AppNavbar from '../../app/AppNavBar.js';
import { Link } from 'react-router-dom';
const { Content } = Layout;
const { Meta } = Card;

class CarPage extends Component {

    constructor(props) {
        super(props);
        this.state = { car: {
            type : '',
            brand : '',
            color : '',
            price : '',
            yearOfIssue : '',
            mileage : '',
            engineType : '',
            driveUnit : '',
            bodyType : '',
            engineCapacity : '',
            transmission : '',
            state : '',
            dateOfPost : '',
            name : '',
            description : '',
            photos : [],
            inspectionStatus : '',
        }, isLoading: true } 
    };

    async componentDidMount() {
		loadCar(this.props.match.params.id)
			.then(data => {
				this.setState({ car: data, isLoading: false });
			})
	}

    render() {
        const car  = this.state.car;
        const photos = car.photos[0] == null ? <Image key={1} src={CAR_BASE_PHOTO} alt="Car photos" style={{marginLeft:'4%'}}/>
                : car.photos.map((image, index) => {
                            return <Image key={index} src={image} alt="Car photos"/>;
                        }
            )
        return  <div>
        <AppNavbar/>
        <div className="site-card-border-less-wrapper">
                <Breadcrumb>
                    <Breadcrumb.Item><Link color='blue' to='/autopicker/cars'>Cars</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>{car.name}</Breadcrumb.Item>
                </Breadcrumb>
            <Card style={{boxShadow:'0px 0px 16px 8px rgba(0,0,0,0.2)'}}>
                <Layout>
                <Content style={{marginBottom:20}}>
                    <Divider style={{fontSize:40}} orientation="left">{car.name}</Divider>
                    <div className='row'>
                        <div className='col-md-6'>
                            <Carousel>
                                {photos}
                            </Carousel>
                        </div>
                        <div className='col-md-6'>
                        <Card style={{marginLeft:'3%',marginRight:'4%', height: '100%', boxShadow:'0px 8px 16px 0px rgba(0,0,0,0.2)'}}>     
                            <h1>{car.price} $</h1>
                            <p>{car.yearOfIssue}, {car.driveUnit}, {car.engineCapacity}l, {car.engineType}, {car.mileage}km</p>
                            <p>{car.description}</p>
                            <div className='row' style={{margin:'2%'}}>
                                <Button style={{width:'30%'}}>Something more</Button>
                                <Button style={{backgroundColor:'#0bb978',  width:'30%'}}>Add description</Button>
                            </div>
                        </Card>
                        </div>
                    </div>
                    <Layout>
                    <Content>
                        <Card style={{margin:'2%', height: '100%', boxShadow:'0px 8px 16px 0px rgba(0,0,0,0.2)'}}>     

                        <Descriptions title="Car Info" bordered>
                            <Descriptions.Item label="Name">{car.name}</Descriptions.Item>
                            <Descriptions.Item label="Inspection status">{car.inspectionStatus}</Descriptions.Item>
                            <Descriptions.Item label="Type">{car.type}</Descriptions.Item>
                            <Descriptions.Item label="Brand">{car.brand}</Descriptions.Item>
                            <Descriptions.Item label="Color">{car.color}</Descriptions.Item>
                            <Descriptions.Item label="Price">${car.price}</Descriptions.Item>
                            <Descriptions.Item label="Year of issue">{car.yearOfIssue}</Descriptions.Item>
                            <Descriptions.Item label="Mileage">{car.mileage}km</Descriptions.Item>
                            <Descriptions.Item label="Engine type">{car.engineType}</Descriptions.Item>
                            <Descriptions.Item label="Drive unit">{car.driveUnit}</Descriptions.Item>
                            <Descriptions.Item label="Body type"> {car.bodyType}</Descriptions.Item>
                            <Descriptions.Item label="Engine capacity">{car.engineCapacity}</Descriptions.Item>
                            <Descriptions.Item label="Transmission">{car.transmission}</Descriptions.Item>
                            <Descriptions.Item label="State">{car.state}</Descriptions.Item>
                        </Descriptions>
                        </Card>
                    </Content>
                    </Layout>
                    </Content>
                </Layout>
            </Card>
        </div>
    </div>
    }
}

export default CarPage;