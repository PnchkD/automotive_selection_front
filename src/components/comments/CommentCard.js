import React, { Component } from 'react';
import {  Card, Layout, Avatar, Tabs, Descriptions, Rate } from 'antd';
import { USER_ICON } from '../../constants/constants.js';
const { Meta } = Card;
const { Content } = Layout;
const { TabPane } = Tabs;

class CommentCard extends Component {

    constructor(props) {
        super(props);
    };

    render() {

        const comment  = this.props.comment;
        var re = new RegExp("[0-9][0-9][0-9][0-9][\s-][0-9][0-9][\s-][0-9][0-9]");

        return <Layout>
                <Content className='Ticket-card-container'>
                    <div className="site-card-border-less-wrapper">
					<Card>
                    <Rate disabled defaultValue={comment.rating}></Rate>
							<Meta  style={{marginTop: 20, marginLeft:20}}
								avatar={<Avatar src='https://joeschmoe.io/api/v1/male/random' />}
								title={comment.user.firstName + ' ' + comment.user.lastName}
								description={re.exec(comment.dateOfCreation)}
							/>
							<p style={{margin:20}}>{comment.content}</p>	
                            </Card>
			</div>
                </Content>
            </Layout>
    }
}

export default CommentCard;