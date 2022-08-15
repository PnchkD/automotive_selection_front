import React, { Component } from 'react';
import { Button } from 'reactstrap';
import AppNavbar from '../../app/AppNavBar.js';
import ErrorNotifier from '../../handler/ErrorNotifiers.js';
import { Checkbox, List, Divider, Layout, Input, Menu, message } from 'antd';
import { loadRequests, searchBy, drop, filterBy } from '../../services/requests/RequestService';
import SubMenu from 'antd/lib/menu/SubMenu';
import RequestCard from './RequestCard.js';
import BrandSelector from '../selectors/BrandSelector.js';
import DriveUnitSelector from '../selectors/DriveUnitSelector.js';
import BodyTypeSelector from '../selectors/BodyTypeSelector.js';
const { Sider, Content } = Layout;

class RequestList extends Component {

	constructor(props) {
		super(props);
		this.state = { Requests: null, isLoading: true, newRequestModal: false, 
            newRequest: {
                brand: 'Nissan',
                driveUnit: 'FULL',
                bodyType: 'SEDAN',
                RequestState: 'NEW',
                photos: []
            }
        };
		this.componentDidMount = this.componentDidMount.bind(this);
        this.show = this.show.bind(this);
        this.delete = this.delete.bind(this);
	}

	componentDidMount() {
		loadRequests()
			.then(data => {
				this.setState({ Requests: data.requests, isLoading: false });
			})
	}

    show = (id) => {
        this.props.history.push("/autopicker/requests/" + id);
    }

    delete = (id) => {
        drop(id)
            .then(() => {
                message.success("Request is successfully deleted")
                this.componentDidMount();
        })
    }

	async searchBy(name) {
		let inputDesc = document.getElementsByName('descending');
		let desc = inputDesc.checked ? 'false' : 'true';
		let brandInput = document.getElementById("brandInput");
		let transmissionInput = document.getElementById("transmissionInput");
		let engineTypeInput = document.getElementById("engineTypeInput");

		let brand = brandInput != null ? brandInput.value : '';
		let transmission =  transmissionInput != null ? transmissionInput.value : '';
		let engineType =  engineTypeInput != null ? engineTypeInput.value : '';

		searchBy(name, desc, brand, transmission, engineType)
			.then(data => {
				this.setState({ Requests: data.requests, isLoading: false });
			})
	}

    async filterBy(fieldName, value) {
		filterBy(fieldName, value)
			.then(data => {
				this.setState({ Requests: data.requests, isLoading: false });
			})
	}

	render() {
		const { Requests, isLoading } = this.state;

		if (isLoading) {
			return <p>Loading...</p>;
		}

		const RequestsList = Requests.map(Request => {
			return <RequestCard 
                                Request={Request} 
                                show={() => this.show(Request.id)}
                                delete={() => this.delete(Request.id)}
                            /> 

		        });

		return (
			<div>
				<AppNavbar />
				<Layout>
					<Content  style={{
							padding: '0 50px',
						}}>
						<Divider style={{fontSize:40}} orientation="left">Requests</Divider>
						<Layout
							style={{
							padding: '24px 0',
							}}>
                                <Sider width={'20%'}>
                                    <Menu mode="inline">
                                        <SubMenu key="1" title="Search by">
                                            <Menu.Item key='3'>
                                                <Input id="brandInput" placeholder="Brand" name="brand" type="text"/>
                                            </Menu.Item>
                                            <Menu.Item key='4'>
                                                <Input id="transmissionInput" placeholder="Transmission" name="transmission" type="text"/>
                                            </Menu.Item>
                                            <Menu.Item key='5'>
                                                <Input id="engineTypeInput" placeholder="Engine type" name="engineType" type="text"/>
                                            </Menu.Item>
                                            <Menu.Item key='7'>
                                                <Button onClick={() => this.searchBy('id')} color="danger">search</Button>
                                            </Menu.Item>
                                        </SubMenu>
                                        <SubMenu key="8" title="Filter by">
                                            <Menu.Item key="9">
                                                <BrandSelector  name='brand' updateNewCarBrand={(value) => this.filterBy('brand', value)}/>
                                            </Menu.Item>
                                            <Menu.Item key="10">
                                                <DriveUnitSelector name='driveUnit' updateNewCarDriveUnit={(value) => this.filterBy('driveUnit', value)}/>
                                            </Menu.Item>
                                            <Menu.Item key="11">
                                                <BodyTypeSelector name='bodyType' updateNewCarBodyType={(value) => this.filterBy('bodyType', value)}/>
                                            </Menu.Item>
                                        </SubMenu>
                                        <SubMenu key="12" title="Sort by">
                                            <Menu.Item key="14">
                                                <a href="#" onClick={() => this.searchBy('brand')}>Brand</a>
                                            </Menu.Item>
                                            <Menu.Item key="15">
                                                <a href="#" onClick={() => this.searchBy('price')}>Price</a>
                                            </Menu.Item>
                                            <Menu.Item key="16">
                                                <span><Checkbox style={{marginRight:8}} id="descCheck" name="descending" type="checkbox"/>Descending</span>
                                            </Menu.Item>
                                        </SubMenu>
                                    </Menu>
                            </Sider> 
			
							<Content>
								<List
								dataSource={RequestsList}
								renderItem={Request => (
									<List.Item>
										{Request}
									</List.Item>
								)}
								/>
							</Content>

						</Layout>
						</Content>
					</Layout>
			</div>
		);
	}
}

export default RequestList;