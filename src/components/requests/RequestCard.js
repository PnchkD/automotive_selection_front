import React, { Component } from 'react';
import {  Card, Layout, Avatar, Tabs, Descriptions, List, message, Rate, Divider, Input, Button, Form } from 'antd';
import { USER_ICON, USER_ROLES, ROLE_AUTOPICKER } from '../../constants/constants.js';
import TicketCard from '../tickets/TicketCard.js';
import CommentCard from '../comments/CommentCard.js';
import NewTicketModal from '../tickets/NewTicketModal.js';
import { create, drop } from '../../services/tickets/TicketService.js'
import { addComment, dropComment } from '../../services/comments/CommentService.js'
import { DeleteOutlined, CarOutlined } from '@ant-design/icons';
const { Meta } = Card;
const { Content } = Layout;
const { TabPane } = Tabs;
const { TextArea } = Input;

class RequestCard extends Component {

    constructor(props) {
        super(props);
        this.state = {isNewTicketModalVisible: false, rate: 0}
        this.handleNewTicketOk = this.handleNewTicketOk.bind(this);
        this.handleNewTicketCancel = this.handleNewTicketCancel.bind(this); 
        this.handleNewTicketChange = this.handleNewTicketChange.bind(this);
        this.deleteTicket = this.deleteTicket.bind(this);
        this.sendComment = this.sendComment.bind(this);
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

    sendComment(event) {
		let data = new FormData(event.currentTarget);
		let id = data.get('REQUEST_ID')
		let rate = this.state.rate;
		let content = data.get('commentText');
		let userId = localStorage.getItem('id');
		const commentReq = {
			content: content,
			rating: rate,
			userId: userId,
            requestId: id
		}        

        addComment(commentReq)
            .then(() => {
                    window.location.reload();
                    message.success("Comment is created!");
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

        const CommentsList = Request.comments != null ? Request.comments.map(comment => {
			return <div className="site-card-border-less-wrapper">
                <Card style={{boxShadow:'0px 0px 16px 8px rgba(0,0,0,0.2)'}}>
                    <CommentCard 
                        comment={comment}
                        delete={() => this.deleteComment(comment.id)}
                    /> 
                </Card>
            </div>
		}) : ''

        let actionProps
        if(localStorage.getItem(USER_ROLES)!=null && localStorage.getItem(USER_ROLES).includes(ROLE_AUTOPICKER)) {
            actionProps = [<CarOutlined key="show" onClick={this.showNewTicketModal}/>,
            <DeleteOutlined key="delete" onClick={() => this.props.delete(Request.id)}/>]
        } else {
            actionProps = [<DeleteOutlined key="delete" onClick={() => this.props.delete(Request.id)}/>]
        }
        


        return <div className="site-card-border-less-wrapper">
        <Card style={{boxShadow:'0px 0px 16px 8px rgba(0,0,0,0.2)'}} actions={actionProps}>
                            <Layout>
                <Content className='request-card-container'>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Base info" key="1" style={{padding:20, backgroundColor: 'white'}}>
                            <Descriptions layout="vertical" bordered>
                                <Descriptions.Item label="User">
                                    <Meta style={{marginTop: 20, marginLeft:20}}
                                        avatar={<Avatar src={USER_ICON} />}
                                        title={Request.fromUser.email}
                                        description={Request.country + ' ' + Request.city}
                                    />
                                </Descriptions.Item>
                                <Descriptions.Item label="Car info">{Request.brand + ', ' 
                                + (Request.yearOfIssue || '0') + ' year, ' 
                                + (Request.engineType || '-') + ' engine type, ' 
                                + (Request.mileage || '0') + ' km mileage'}</Descriptions.Item>       
                            </Descriptions>
                        </TabPane>
                        <TabPane tab="Full info" key="2"  style={{padding:20, backgroundColor: 'white'}}>
                            <Descriptions bordered>
                                <Descriptions.Item label="Type">{Request.type == null ? '-' : Request.type}</Descriptions.Item>
                                <Descriptions.Item label="Brand">{Request.brand == null ? '-' : Request.brand}</Descriptions.Item>
                                <Descriptions.Item label="Color">{Request.color == (null | "") ? '-' : Request.color}</Descriptions.Item>
                                <Descriptions.Item label="Price">${Request.price == null ? '0' : Request.price}</Descriptions.Item>
                                <Descriptions.Item label="Year of issue">{Request.yearOfIssue == null ? '-' : Request.yearOfIssue}</Descriptions.Item>
                                <Descriptions.Item label="Mileage">{Request.mileage == null ? '0' : Request.mileage}km</Descriptions.Item>
                                <Descriptions.Item label="Engine type">{Request.engineType == (null | "") ? '-' : Request.engineType}</Descriptions.Item>
                                <Descriptions.Item label="Drive unit">{Request.driveUnit == null ? '-' : Request.driveUnit}</Descriptions.Item>
                                <Descriptions.Item label="Body type"> {Request.bodyType == null ? '-' : Request.bodyType}</Descriptions.Item>
                                <Descriptions.Item label="Engine capacity">{Request.engineCapacity == (null | "") ? '-' : Request.engineCapacity}</Descriptions.Item>
                                <Descriptions.Item label="Transmission">{Request.transmission == (null | "") ? '-' : Request.transmission}</Descriptions.Item>
                                <Descriptions.Item label="State">{Request.state == null ? '-' : Request.state}</Descriptions.Item>
                                <Descriptions.Item label="Region" span={3}>{Request.country + ' ' + Request.city}</Descriptions.Item>
                                <Descriptions.Item label="Wishes" span={3}>{Request.wishes == (null | "") ? '-' : Request.wishes}</Descriptions.Item>            
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
                        <TabPane tab="Comments" key="4" style={{padding:20, backgroundColor: 'white'}}>
                            <List
								dataSource={CommentsList}
								renderItem={Comment => (
									<List.Item>
										{Comment}
									</List.Item>
								)}
							/>
                            <div className="site-card-border-less-wrapper">
                                <Card style={{boxShadow:'0px 0px 16px 8px rgba(0,0,0,0.2)'}}>
                                    <Divider style={{fontSize:15}} orientation="left">Add new comment</Divider>
                                    <Form onSubmit={this.sendComment}>
                                        <Form.Item>
                                            <b>Rating:</b><Rate onChange={val => this.state.rate = val} className='commentRate' id='commentRate' name='commentRate'></Rate>	
                                            <TextArea rows={3} id='commentText' name='commentText'/>			
                                            <input type="hidden" name="REQUEST_ID" value={Request.id}/>
                                            <Button htmlType="submit" className='order-btn'>Submit</Button>
                                        </Form.Item>
                                    </Form>
                                </Card>
                            </div>
                        </TabPane>
                    </Tabs>          
                </Content>
                <NewTicketModal 
                    visible={this.state.isNewTicketModalVisible}
                    onOk={this.handleNewTicketOk}
                    onCancel={this.handleNewTicketCancel}
                />
            </Layout>
            </Card>
            </div>
    }
}

export default RequestCard;