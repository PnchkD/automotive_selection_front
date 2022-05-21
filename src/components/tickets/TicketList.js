import React, { Component } from 'react';
import AppNavbar from '../../app/AppNavBar.js';
import ErrorNotifier from '../../handler/ErrorNotifiers.js';
import { List, Divider, Layout, Upload, message, Card } from 'antd';
import { loadTickets, drop } from '../../services/tickets/TicketService';
import { DeleteOutlined } from '@ant-design/icons';
import TicketCard from './TicketCard.js';
const { Dragger } = Upload;
const { Content } = Layout;

class TicketList extends Component {

	constructor(props) {
		super(props);
		this.state = { Tickets: [], isLoading: true, newDepartureModal: false,};
		this.componentDidMount = this.componentDidMount.bind(this);
        this.show = this.show.bind(this);
        this.delete = this.delete.bind(this);
	}

	componentDidMount() {
		loadTickets()
			.then(data => {
				this.setState({ Tickets: data.tickets, isLoading: false });
			})
	}

    show = (id) => {
        this.props.history.push("/autopicker/tickets/" + id);
    }

    delete = (id) => {
        drop(id)
            .then(() => {
                message.success("Ticket is successfully deleted")
                this.componentDidMount();
        })
    }

	render() {
		const { Tickets, isLoading } = this.state;

		if (isLoading) {
			return <p>Loading...</p>;
		}

		const TicketsList = Tickets.map(ticket => {
			return <div className="site-card-border-less-wrapper">
					<Card style={{boxShadow:'0px 0px 16px 8px rgba(0,0,0,0.2)'}} actions={[
										<DeleteOutlined key="delete" onClick={() => this.props.delete(Ticket.id)}/>
										]}>
					<TicketCard 
						ticket={ticket} 
						delete={() => this.delete(ticket.id)}
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
						<Divider style={{fontSize:40}} orientation="left">Tickets</Divider>
						<Layout
							style={{
							padding: '24px 0',
							}}>
							<Content>
								<List
								dataSource={TicketsList}
								renderItem={Departure => (
									<List.Item>
										{Departure}
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

export default TicketList;