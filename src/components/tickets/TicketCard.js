import React, { Component } from 'react';
import {  Card, Layout, Avatar, Tabs, Descriptions } from 'antd';
import { USER_ICON } from '../../constants/constants.js';
import CarCard from '../cars/CarCard';
const { Meta } = Card;
const { Content } = Layout;
const { TabPane } = Tabs;

class TicketCard extends Component {

    constructor(props) {
        super(props);
    };

    render() {

        const Ticket  = this.props.ticket;
        return <Layout>
                <Content className='Ticket-card-container'>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Ticket info" key="1" style={{padding:20, backgroundColor: 'white'}}>
                            <Descriptions layout="vertical" bordered>
                                <Descriptions.Item label="Name">{Ticket.name}</Descriptions.Item>       
                                <Descriptions.Item label="Date">{Ticket.dateOfDeparture}</Descriptions.Item>       
                                <Descriptions.Item label="Autopicker">
                                    <Meta style={{marginLeft:20}}
                                        avatar={<Avatar src={USER_ICON} />}
                                        title={Ticket.autoPicker.firstName + ' ' + Ticket.autoPicker.lastName}
                                        description={Ticket.autoPicker.email}
                                    />
                                </Descriptions.Item>
                                <Descriptions.Item label="Description">{Ticket.description}</Descriptions.Item>       
                            </Descriptions>
                            </TabPane>
                        <TabPane tab="Car info" key="2"  style={{padding:20, backgroundColor: 'white'}}>
                            <CarCard car={Ticket.car} /> 
                        </TabPane>
                    </Tabs>          
                </Content>
            </Layout>
    }
}

export default TicketCard;