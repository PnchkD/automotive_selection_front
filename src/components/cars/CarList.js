import React, { Component } from 'react';
import { Button, Label, FormGroup } from 'reactstrap';
import AppNavbar from '../../app/AppNavBar.js';
import ErrorHandler from '../../handler/ErrorHandler.js';
import ErrorNotifier from '../../handler/ErrorNotifiers.js';
import { Checkbox, List, Divider, Layout, Form, Modal,  Input, InputNumber, Menu, DatePicker, Upload, message } from 'antd';
import { loadCars, searchBy, create } from '../../services/cars/CarService';
import SubMenu from 'antd/lib/menu/SubMenu';
import CarCard from './CarCard.js';
import BrandSelector from '../selectors/BrandSelector.js';
import DriveUnitSelector from '../selectors/DriveUnitSelector.js';
import BodyTypeSelector from '../selectors/BodyTypeSelector.js';
import CarStateSelector from '../selectors/CarStateSelector.js';
import { InboxOutlined } from '@ant-design/icons';
import {beforeUpload, getBase64} from '../../util/pictureLoaderUtil'
import { IMAGE_LOADER_MOCKY_URL } from '../../constants/constants';
const { Dragger } = Upload;
const { Sider, Content } = Layout;

class CarList extends Component {

	constructor(props) {
		super(props);
		this.state = { cars: [], isLoading: true, newCarModal: false, 
            newCar: {
                brand: 'Nissan',
                driveUnit: 'FULL',
                bodyType: 'SEDAN',
                carState: 'NEW',
                photos: []
            }
        };
		this.componentDidMount = this.componentDidMount.bind(this);
        this.showNewCarModal = this.showNewCarModal.bind(this);
		this.handleNewCarCancel = this.handleNewCarCancel.bind(this);
		this.createCar = this.createCar.bind(this);
        this.show = this.show.bind(this);

	}

	componentDidMount() {
		loadCars()
			.then(data => {
				this.setState({ cars: data.carsDTO, isLoading: false });
			})
	}

    showNewCarModal = () => {
		this.setState({newCarModal:true});
	};

    handleNewCarCancel = () => {
		this.setState({newCarModal:false});
	};

    createCar = (e) => {
        const data = new FormData(e.currentTarget.parentElement.parentElement.parentElement.querySelector('#newCarForm'));

        const newCar = {
            name: data.get('name'),
            type: data.get('type'),
            brand: this.state.newCar.brand,
            color: data.get('color'),
            price: data.get('price'),
            yearOfIssue: data.get('yearOfIssue'),
            mileage: data.get('mileage'),
            engineType: data.get('engineType'),
            driveUnit: this.state.newCar.driveUnit,
            bodyType: this.state.newCar.bodyType,
            engineCapacity: data.get('engineCapacity'),
            transmission: data.get('transmission'),
            state: this.state.newCar.carState,
            photos: this.state.newCar.photos
        }

        create(newCar)
            .then(() => {
                this.componentDidMount();
            })
    }

    show = (id) => {
        this.props.history.push("/autopicker/cars/" + id);
    }

	async searchBy(name) {
		let inputDesc = document.getElementsByName('descending');
		let desc = inputDesc.checked ? 'true' : 'false';
		let nameInput = document.getElementById("nameInput");
		let brandInput = document.getElementById("brandInput");
		let transmissionInput = document.getElementById("transmissionInput");
		let engineTypeInput = document.getElementById("engineTypeInput");
		let bodyTypeInput = document.getElementById("bodyTypeInput");

		let carName = nameInput != null ? nameInput.value : '';
		let brand = brandInput != null ? brandInput.value : '';
		let transmission =  transmissionInput != null ? transmissionInput.value : '';
		let engineType =  engineTypeInput != null ? engineTypeInput.value : '';
		let bodyType =  bodyTypeInput != null ? bodyTypeInput.value : '';

		searchBy(name, desc, carName, brand, transmission, engineType, bodyType)
			.then(data => {
				this.setState({ cars: data.carsDTO, isLoading: false });
			})
	}

    handleUploadImageChange = info => {
        getBase64(info.file.originFileObj, imageUrl => {
                let phts = this.state.newCar.photos;
                phts.push(imageUrl);
                this.setState({photos: phts})
            }
        )
    }

	render() {
		const { cars, isLoading } = this.state;
		if (isLoading) {
			return <p>Loading...</p>;
		}

		const carsList = cars.map(car => {
			return <CarCard car={car} show={() => this.show(car.id)}/> 
		});

        const props = {
            name: 'file',
            multiple: true,
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            listType: "picture",
            onChange: this.handleUploadImageChange,
            onDrop(e) {
              console.log('Dropped files', e.dataTransfer.files);
            },
          };

		return (
			<div>
				<AppNavbar />
				<Layout>
					<Content  style={{
							padding: '0 50px',
						}}>
						<Divider style={{fontSize:40}} orientation="left">Cars</Divider>
						<Layout
							style={{
							padding: '24px 0',
							}}>
							<Sider>
								<Menu mode="inline">
									<SubMenu key="1" title="Search by">
										<Menu.Item key='2'>
											<Input id="nameInput" placeholder="Name" name="name" type="text"/>
										</Menu.Item>
										<Menu.Item key='3'>
											<Input id="brandInput" placeholder="Brand" name="brand" type="text"/>
										</Menu.Item>
										<Menu.Item key='4'>
											<Input id="transmissionInput" placeholder="Transmission" name="transmission" type="text"/>
										</Menu.Item>
                                        <Menu.Item key='4'>
											<Input id="engineTypeInput" placeholder="Engine type" name="engineType" type="text"/>
										</Menu.Item>
                                        <Menu.Item key='4'>
											<Input id="bodyTypeInput" placeholder="Body type" name="bodyType" type="text"/>
										</Menu.Item>
										<Menu.Item key='5'>
											<Button onClick={() => this.searchBy('id')} color="danger">search</Button>
										</Menu.Item>
									</SubMenu>
									<SubMenu key="6" title="Sort by">
										<Menu.Item key="7">
											<a href="#" onClick={() => this.searchBy('name')}>Name</a>
										</Menu.Item>
										<Menu.Item key="8">
											<a href="#" onClick={() => this.searchBy('brand')}>Brand</a>
										</Menu.Item>
										<Menu.Item key="9">
											<a href="#" onClick={() => this.searchBy('price')}>Price</a>
										</Menu.Item>
										<Menu.Item key="10">
											<span><Checkbox style={{marginRight:8}} id="descCheck" name="descending" type="checkbox"/>Descending</span>
										</Menu.Item>
									</SubMenu>
                                    <Menu.Item key='5'>
											<Button onClick={this.showNewCarModal} style={{marginTop:10}} color="danger">New car</Button>
                                            <Modal title="Enter car data" visible={this.state.newCarModal} onOk={this.createCar} onCancel={this.handleNewCarCancel}>
                                                <Form id='newCarForm'>
                                                    <Input style={{marginBottom:20}} type="text" name="name" id="name" placeholder='Name'/>
                                                    <Input style={{marginBottom:20}} type="text" name="type" id="type" placeholder='Type'/>
                                                    <InputNumber style={{marginBottom:20, width: '100%', height:50}} addonAfter="$" name="price" min={0} max={99999999} id="price" step="10" placeholder='Price in $'/>
                                                    <Input style={{marginBottom:20}} type="text" name="color" id="color" placeholder='Color'/>
                                                    <div className='row'>
                                                        <div className='col-md-6'>
                                                            <BrandSelector style={{marginBottom:20, width:'100%'}} name='brand' updateNewCarBrand={(value) => this.state.newCar.brand = value}/>
                                                        </div>
                                                        <div className='col-md-6'>
                                                            <DatePicker picker="year" style={{marginBottom:20, width:'100%'}} min={1900} max={2099} step="1" name="yearOfIssue" id="yearOfIssue" placeholder='Year of issue'/>
                                                        </div>
                                                    </div>
                                                
                                                    <Input style={{marginBottom:20}} type="number" name="mileage" id="mileage" placeholder='Mileage'/>
                                                    <Input style={{marginBottom:20}} type="text" name="engineType" id="engineType" placeholder='Engine type'/>
                                                    <DriveUnitSelector name='driveUnit' updateNewCarDriveUnit={(value) => this.state.newCar.driveUnit = value}/>
                                                    <BodyTypeSelector name='bodyType' updateNewCarBodyType={(value) => this.state.newCar.bodyType = value}/>
                                                    <Input style={{marginBottom:20}} type="text" name="engineCapacity" id="engineCapacity" placeholder='Engine capacity'/>
                                                    <Input style={{marginBottom:20}} type="text" name="transmission" id="transmission" placeholder='Transmission'/>
                                                    <CarStateSelector name='state' updateNewCarState={(value) => this.state.newCar.carState = value}/>
                                                    <aside>
                                                        <Dragger {...props}>
                                                                <p className="ant-upload-drag-icon">
                                                                <InboxOutlined />
                                                                </p>
                                                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                                                <p className="ant-upload-hint">
                                                                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                                                                band files
                                                                </p>
                                                        </Dragger>
                                                    </aside>
                                                </Form> 
                                            </Modal>
									</Menu.Item>
								</Menu>
						</Sider> 
			
							<Content>
								<List
								dataSource={carsList}
								renderItem={car => (
									<List.Item>
										{car}
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

export default CarList;