import React, { Component } from 'react';
import { Layout } from 'antd';
import { Image } from 'react-bootstrap';
import { CAR_BASE_PHOTO } from '../../constants/constants.js';
const { Content } = Layout;

class CarCard extends Component {

    constructor(props) {
        super(props);
    };

    render() {

        const car  = this.props.car;
		const carPhoto = car.photos[0]==null ? CAR_BASE_PHOTO : car.photos[0];
						
        return <Layout >
            <Content style={{display: 'flex', marginBottom:20}}>
                <Image className='user-avatar'
                    src={carPhoto}
                />
                <Layout className='user-description'>
                <Content>
                    <div className='row'>
                        <div className='col-md-6'>
                            <p><b>Name</b>: {car.name}</p>
                            <p><b>Inspection status</b>: {car.inspectionStatus}</p>
                            <p><b>Type</b>: {car.type}</p>
                            <p><b>Brand</b>: {car.brand}</p>
                            <p><b>Color</b>: {car.color}</p>
                            <p><b>Price</b>: {car.price}</p>
                            <p><b>Year of issue</b>: {car.yearOfIssue}</p>
                            <p><b>Mileage</b>: {car.mileage}</p>
                        </div>
                        <div className='col-md-6'>
                            <p><b>Engine type</b>: {car.engineType}</p>
                            <p><b>Drive unit</b>: {car.driveUnit}</p>
                            <p><b>Body type</b>: {car.bodyType}</p>
                            <p><b>Engine capacity</b>: {car.engineCapacity}</p>
                            <p><b>Transmission</b>: {car.transmission}</p>
                            <p><b>State</b>: {car.state}</p>
                            <p><b>Description</b>: {car.description}</p>
                        </div>
                    </div>
                </Content>
                </Layout>
                </Content>
            </Layout>
    }
}

export default CarCard;