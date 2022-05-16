import React, { Component } from 'react';
import '../../app/App.css';
import { Layout, Row, Button, Carousel, Form, Modal,  Input, InputNumber, DatePicker, message, List, Avatar } from 'antd';
import carLogo from '../../assets/car-logo.png'
import clockIcon from '../../assets/clock-logo.png'
import cardoct1 from '../../assets/cardoct1.jpg'
import cardoct2 from '../../assets/cardoct2.jpg'
import cardoct3 from '../../assets/cardoct3.jpg'
import cardoct4 from '../../assets/cardoct4.jpg'
import carPickerLogo from '../../assets/carPickerLogo.png'
import BrandSelector from '../selectors/BrandSelector.js';
import DriveUnitSelector from '../selectors/DriveUnitSelector.js';
import BodyTypeSelector from '../selectors/BodyTypeSelector.js';
import CarStateSelector from '../selectors/CarStateSelector.js';
import { create } from '../../services/requests/RequestService.js'
const { Header, Sider, Content } = Layout;
const { TextArea } = Input;

class UserHomePage extends Component {
  
    constructor(props) {
		super(props);
		this.state = { 
            request: {
                brand: 'Nissan',
                driveUnit: 'FULL',
                bodyType: 'SEDAN',
                carState: 'NEW'
            }, 
            newRequestModal: false,
        };

        this.showNewRequestModal = this.showNewRequestModal.bind(this);
		this.handleNewRequestCancel = this.handleNewRequestCancel.bind(this);
		this.createRequest = this.createRequest.bind(this);

	}

    showNewRequestModal = () => {
		this.setState({newRequestModal:true});
	};

    handleNewRequestCancel = () => {
		this.setState({newRequestModal:false});
	};

    createRequest = (e) => {
        const data = new FormData(e.currentTarget.parentElement.parentElement.parentElement.querySelector('#newRequestForm'));

        const newRequestReq = {
            type: data.get('type'),
            brand: this.state.request.brand,
            color: data.get('color'),
            price: data.get('price'),
            yearOfIssue: data.get('yearOfIssue'),
            mileage: data.get('mileage'),
            engineType: data.get('engineType'),
            driveUnit: this.state.request.driveUnit,
            bodyType: this.state.request.bodyType,
            engineCapacity: data.get('engineCapacity'),
            transmission: data.get('transmission'),
            wishes: data.get('wishes'),
            country: data.get('country'),
            city: data.get('city'),
            state: this.state.request.carState,
            userId: Number(localStorage.getItem('id'))
        }

        create(newRequestReq)
            .then((data) => {
                if(data == null) {
                    message.error("Wrong data. Please, repeat sending request.");
                } else {
                    message.success("Your request is successfully sended! Wait for the answer.");
                }
            })

        this.setState({newRequestModal:false});
    }

    render() {

        const data = [
            {
              title: 'The cost of the service pays off',
            },
            {
              title: "You don't waste your time",
            },
            {
              title: 'You only come to complete the deal',
            },
            {
              title: 'We give a guarantee of compliance for the selected car',
            },
          ];

        return (
            <div>
                <Layout>
                    <Header>
                        <Row className='user-home-page'>
                            <div>
                                <img src={carLogo} width="300" alt="car-logo"/>
                            </div>
                            <div>
                                <img src={clockIcon} width="50" alt="clock-logo"/>
                                <b style={{fontSize:20}}>8:00 - 21:00</b>
                            </div>
                            <div>
                                <Button className='order-btn' onClick={this.showNewRequestModal}><span>Order</span></Button>
                            </div>
                            <Modal title="Order auto-selection and become the proud owner of the car of your dreams" visible={this.state.newRequestModal} onOk={this.createRequest} onCancel={this.handleNewRequestCancel}>
                                <Form id='newRequestForm'>
                                    <Input style={{marginBottom:20}} type="text" name="type" id="type" placeholder='Type'/>
                                    <InputNumber style={{marginBottom:20, width: '100%', height:50}} addonAfter="$" name="price" min={0} max={99999999} id="price" step="10" placeholder='Price in $'/>
                                    <Input style={{marginBottom:20}} type="text" name="color" id="color" placeholder='Color'/>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <BrandSelector style={{marginBottom:20, width:'100%'}} name='brand' updateNewCarBrand={(value) => this.setState({brand: value})}/>
                                        </div>
                                        <div className='col-md-6'>
                                            <DatePicker picker="year" style={{marginBottom:20, width:'100%'}} min={1900} max={2099} step="1" name="yearOfIssue" id="yearOfIssue" placeholder='Year of issue'/>
                                        </div>
                                    </div>
                                
                                    <Input style={{marginBottom:20}} type="number" name="mileage" id="mileage" placeholder='Mileage'/>
                                    <Input style={{marginBottom:20}} type="text" name="engineType" id="engineType" placeholder='Engine type'/>
                                    <DriveUnitSelector name='driveUnit' updateNewCarDriveUnit={(value) => this.setState({driveUnit: value})}/>
                                    <BodyTypeSelector name='bodyType' updateNewCarBodyType={(value) => this.setState({bodyType: value})}/>
                                    <Input style={{marginBottom:20}} type="text" name="engineCapacity" id="engineCapacity" placeholder='Engine capacity'/>
                                    <Input style={{marginBottom:20}} type="text" name="transmission" id="transmission" placeholder='Transmission'/>
                                    <CarStateSelector name='state' updateNewCarState={(value) => this.setState({carState: value})}/>  
                                    <Input style={{marginBottom:20}} type="text" name="country" id="country" placeholder='Country'/>
                                    <Input style={{marginBottom:20}} type="text" name="city" id="city" placeholder='City'/>
                                    <TextArea rows={4} style={{marginBottom:20}} type="text" name="wishes" id="wishes" placeholder='Wishes'/>              
                                </Form> 
                            </Modal>
                        </Row>
                    </Header>
                    <Content>
                        <Layout>
                            <Carousel effect="fade" autoplay>
                                <div>
                                    <img src={cardoct1} width='100%' alt="car-logo"/>
                                </div>
                                <div>
                                    <img src={cardoct2} width='100%' alt="car-logo"/>
                                </div>
                                <div>
                                    <img src={cardoct3} width='100%' alt="car-logo"/>
                                </div>
                                <div>
                                    <img src={cardoct4} width='100%' alt="car-logo"/>
                                </div>
                            </Carousel>
                            <Content>
                                <h1 style={{textAlign:'center'}}>
                                    HELP IN SEARCH AND PURCHASE OF A CAR IN BELARUS
                                </h1>
                                <Row className='user-home-page'>
                                    <div style={{marginTop:50, marginBottom:50}}>
                                        <h3>We will help you buy the best option for the car you want</h3>
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={data}
                                            renderItem={item => (
                                            <List.Item>
                                                <List.Item.Meta
                                                avatar={<Avatar src="https://av-podbor.by/img/ok.png" />}
                                                title={<h5>{item.title}</h5>}
                                                />
                                            </List.Item>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <img src={carPickerLogo} width='100%' alt="car-logo"/>
                                    </div>
                                </Row>
                            </Content>
                        </Layout>
                    </Content>
                </Layout>
            </div>
        );
    }
}

export default UserHomePage;