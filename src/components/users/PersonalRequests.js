import React, { Component } from 'react';
import AppNavbar from '../../app/AppNavBar.js';
import ErrorNotifier from '../../handler/ErrorNotifiers.js';
import { List, Divider, Layout, message, Button, Card } from 'antd';
import { loadPersonalRequests, create, drop } from '../../services/requests/RequestService';
import RequestCard from '../requests/RequestCard.js';
import NewRequestModal from '../requests/NewRequestModal'
const { Content } = Layout;

class RequestList extends Component {

	constructor(props) {
		super(props);
		this.state = { Requests: [], isLoading: true, newRequestModal: false, 
            request: {
                brand: null,
                driveUnit: null,
                bodyType: null,
                carState: null
            }, 
            newRequestModal: false,
        };

        this.showNewRequestModal = this.showNewRequestModal.bind(this);
		this.handleNewRequestCancel = this.handleNewRequestCancel.bind(this);
		this.createRequest = this.createRequest.bind(this);
        this.delete = this.delete.bind(this);

	}

	componentDidMount() {
		loadPersonalRequests()
			.then(data => {
				this.setState({ Requests: data.requests, isLoading: false });
			})
	}

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
        debugger
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

    
    delete = (id) => {
        drop(id)
            .then(() => {
                message.success("Request is successfully deleted")
                this.componentDidMount();
        })
    }

    
    showNewRequestModal = () => {
		this.setState({newRequestModal:true});
	};

    handleNewRequestCancel = () => {
		this.setState({newRequestModal:false});
	};

	render() {
		const { Requests, isLoading } = this.state;

		if (isLoading) {
			return <p>Loading...</p>;
		}

		const RequestsList = Requests.map(Request => {
			return <div className="site-card-border-less-wrapper">
            <Card style={{boxShadow:'0px 0px 16px 8px rgba(0,0,0,0.2)'}}>
                <RequestCard 
                    Request={Request} 
                    show={() => this.show(Request.id)}
                    delete={() => this.delete(Request.id)}
                /> 
            </Card>
            </div>
		});

		return (
			<div>
				<AppNavbar />
				<Layout>
					<Content  style={{
							padding: '0 50px',
						}}>
						<Divider style={{fontSize:40}} orientation="left">Personal requests</Divider>
                        <div>
                            <Button className='order-btn' onClick={this.showNewRequestModal}><span>New request</span></Button>
                        </div>
                        <NewRequestModal 
                                visible={this.state.newRequestModal}
                                onOk={this.createRequest}
                                onCancel={this.handleNewRequestCancel}
                                updateNewCarBrand={(value) => { const request = this.state.request; request.brand = value; this.setState({request: request})}}
                                updateNewCarDriveUnit={(value) => { const request = this.state.request; request.driveUnit = value; this.setState({request: request})}}
                                updateNewCarBodyType={(value) => { const request = this.state.request; request.bodyType = value; this.setState({request: request})}}
                                updateNewCarState={(value) =>  { const request = this.state.request; request.carState = value; this.setState({request: request})}}
                            />
						<Layout
							style={{
							padding: '24px 0',
							}}>                                
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