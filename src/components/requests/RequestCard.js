import React, { Component } from 'react';
import {  Card, Layout, Avatar, Tabs, Descriptions, List, message } from 'antd';
import { USER_ICON } from '../../constants/constants.js';
import TicketCard from '../tickets/TicketCard.js';
import NewTicketModal from '../tickets/NewTicketModal.js';
import { create, drop } from '../../services/tickets/TicketService.js'
const { Meta } = Card;
const { Content } = Layout;
const { TabPane } = Tabs;

class RequestCard extends Component {

    constructor(props) {
        super(props);
        this.state = {isNewTicketModalVisible: false}
        this.handleNewTicketOk = this.handleNewTicketOk.bind(this);
        this.handleNewTicketCancel = this.handleNewTicketCancel.bind(this); 
        this.handleNewTicketChange = this.handleNewTicketChange.bind(this);
        this.deleteTicket = this.deleteTicket.bind(this);
    };

    showNewTicketModal = () => {
        this.setState({isNewTicketModalVisible: true});
    };

    handleNewTicketCancel = () => {
        this.setState({isNewTicketModalVisible: false});
    };

    handleNewTicketChange = (event) => {
        const target = event.target;
        const name = target.name;
        let value = target.value;
        let departure = this.state.departure;

        departure[name] = value;
        this.setState({ departure: departure });
    }

    handleNewTicketOk = (e) => {
        const data = new FormData(e.currentTarget.parentElement.parentElement.parentElement.querySelector('#newTicketForm'));

        const ticketReq = {
            name: data.get('ticketName'),
            description: data.get('ticketDescription'),
            dateOfDeparture: data.get('dateOfDeparture'),
            userId: localStorage.getItem('id'),
            carId: data.get('CAR_ID'),
            requestId: this.props.Request.id
        }
        
        create(ticketReq)
            .then(data => {
                    message.success("Ticket is created!");
                })

        this.setState({isNewTicketModalVisible: false});
    };

    deleteTicket = (id) => {        
        drop(id)
            .then(data => {
                    message.success("Ticket is deleted!");
                    window.location.reload();
                })
    };

    render() {

        const Request  = this.props.Request;
        const TicketsList = Request.tickets != null ? Request.tickets.map(ticket => {
			return <div className="site-card-border-less-wrapper">
                <Card style={{boxShadow:'0px 0px 16px 8px rgba(0,0,0,0.2)'}}>
                    <TicketCard 
                        ticket={ticket}
                        delete={() => this.deleteTicket(ticket.id)}
                    /> 
                </Card>
            </div>
		}) : ''


        return <Layout>
                <Content className='request-card-container'>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Base info" key="1" style={{padding:20, backgroundColor: 'white'}}>
                            <Descriptions layout="vertical" bordered>
                                <Descriptions.Item label="User">
                                    <Meta style={{marginTop: 20, marginLeft:20}}
                                        avatar={<Avatar src={USER_ICON} />}
                                        title={Request.fromUser.email}
                                        description={Request.country + ', ' + Request.city}
                                    />
                                </Descriptions.Item>
                                <Descriptions.Item label="Car info">{Request.brand + ', ' + Request.yearOfIssue + ' year, ' + Request.engineType + ' engine type, ' + Request.mileage + 'km mileage'}</Descriptions.Item>       
                            </Descriptions>
                        </TabPane>
                        <TabPane tab="Full info" key="2"  style={{padding:20, backgroundColor: 'white'}}>
                            <Descriptions bordered>
                                <Descriptions.Item label="Type">{Request.type}</Descriptions.Item>
                                <Descriptions.Item label="Brand">{Request.brand}</Descriptions.Item>
                                <Descriptions.Item label="Color">{Request.color}</Descriptions.Item>
                                <Descriptions.Item label="Price">${Request.price}</Descriptions.Item>
                                <Descriptions.Item label="Year of issue">{Request.yearOfIssue}</Descriptions.Item>
                                <Descriptions.Item label="Mileage">{Request.mileage}km</Descriptions.Item>
                                <Descriptions.Item label="Engine type">{Request.engineType}</Descriptions.Item>
                                <Descriptions.Item label="Drive unit">{Request.driveUnit}</Descriptions.Item>
                                <Descriptions.Item label="Body type"> {Request.bodyType}</Descriptions.Item>
                                <Descriptions.Item label="Engine capacity">{Request.engineCapacity}</Descriptions.Item>
                                <Descriptions.Item label="Transmission">{Request.transmission}</Descriptions.Item>
                                <Descriptions.Item label="State">{Request.state}</Descriptions.Item>
                                <Descriptions.Item label="Region" span={3}>{Request.country + ', ' + Request.city}</Descriptions.Item>
                                <Descriptions.Item label="Wishes" span={3}>{Request.wishes}</Descriptions.Item>            
                            </Descriptions>
                        </TabPane>
                        <TabPane tab="Tickets" key="3" style={{padding:20, backgroundColor: 'white'}}>
                            <List
								dataSource={TicketsList}
								renderItem={Departure => (
									<List.Item>
										{Departure}
									</List.Item>
								)}
							/>
                        </TabPane>
                    </Tabs>          
                </Content>
                <NewTicketModal 
                    visible={this.state.isNewTicketModalVisible}
                    onOk={this.handleNewTicketOk}
                    onCancel={this.handleNewTicketCancel}
                />
            </Layout>

    }
}

export default RequestCard;