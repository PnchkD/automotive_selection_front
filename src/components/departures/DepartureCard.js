import React, { Component } from 'react';
import {  Card, Layout, Avatar, Tabs, Descriptions } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { USER_ICON } from '../../constants/constants.js';
import CarCard from '../cars/CarCard';
const { Meta } = Card;
const { Content } = Layout;
const { TabPane } = Tabs;

class DepartureCard extends Component {

    constructor(props) {
        super(props);
    };

    render() {

        const Departure  = this.props.departure;
        return  <div className="site-card-border-less-wrapper">
        <Card style={{boxShadow:'0px 0px 16px 8px rgba(0,0,0,0.2)'}} actions={[
                                    <DeleteOutlined key="delete" onClick={() => this.props.delete(Departure.id)}/>
                                    ]}>
            <Layout>
                <Content className='Departure-card-container'>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Departure info" key="1" style={{padding:20, backgroundColor: 'white'}}>
                            <Descriptions layout="vertical" bordered>
                                <Descriptions.Item label="Date">{Departure.dateOfDeparture}</Descriptions.Item>       
                                <Descriptions.Item label="Description">{Departure.description}</Descriptions.Item>     
                                <Descriptions.Item label="Autopicker">
                                    <Meta style={{marginLeft:20}}
                                        avatar={<Avatar src={USER_ICON} />}
                                        title={Departure.autoPicker.firstName + ' ' + Departure.autoPicker.lastName}
                                        description={Departure.autoPicker.email}
                                    />
                                </Descriptions.Item>  
                            </Descriptions>
                            </TabPane>
                        <TabPane tab="Car info" key="2"  style={{padding:20, backgroundColor: 'white'}}>
                            <CarCard car={Departure.car} /> 
                        </TabPane>
                    </Tabs>          
                </Content>
            </Layout>
        </Card>
    </div>
    }
}

export default DepartureCard;