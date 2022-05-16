import React, { Component } from 'react';
import {  Card, Layout, Avatar, Tabs, Descriptions, Table } from 'antd';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import { USER_ICON } from '../../constants/constants.js';
const { Meta } = Card;
const { Content } = Layout;
const { TabPane } = Tabs;
const { Column, ColumnGroup } = Table;

class RequestCard extends Component {

    constructor(props) {
        super(props);
    };

    render() {

        const Request  = this.props.Request;
        var playing = false;
        return  <div className="site-card-border-less-wrapper">
        <Card style={{boxShadow:'0px 0px 16px 8px rgba(0,0,0,0.2)'}} actions={[
                                    <SearchOutlined key="show" onClick={() => this.props.show(Request.id)}/>,
                                    <DeleteOutlined key="delete" onClick={() => this.props.delete(Request.id)}/>
                                    ]}>
            <Layout>
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
                    </Tabs>          
                </Content>
            </Layout>
        </Card>
    </div>
    }
}

export default RequestCard;