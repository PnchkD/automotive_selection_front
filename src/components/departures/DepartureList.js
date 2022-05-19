import React, { Component } from 'react';
import AppNavbar from '../../app/AppNavBar.js';
import ErrorNotifier from '../../handler/ErrorNotifiers.js';
import { List, Divider, Layout, Upload, message } from 'antd';
import { loadDepartures, create } from '../../services/departures/DepartureService';
import DepartureCard from './DepartureCard.js';
const { Dragger } = Upload;
const { Content } = Layout;

class DepartureList extends Component {

	constructor(props) {
		super(props);
		this.state = { Departures: [], isLoading: true, newDepartureModal: false,};
		this.componentDidMount = this.componentDidMount.bind(this);
        this.show = this.show.bind(this);
        this.delete = this.delete.bind(this);
	}

	componentDidMount() {
		loadDepartures()
			.then(data => {
				this.setState({ Departures: data.departures, isLoading: false });
			})
	}

    show = (id) => {
        this.props.history.push("/autopicker/departures/" + id);
    }

    delete = (id) => {
        drop(id)
            .then(() => {
                message.success("Departure is successfully deleted")
                this.componentDidMount();
        })
    }

	render() {
		const { Departures, isLoading } = this.state;

		if (isLoading) {
			return <p>Loading...</p>;
		}

		const DeparturesList = Departures.map(departure => {
			return <DepartureCard 
                    departure={departure} 
                    delete={() => this.delete(departure.id)}
                /> 
		});

		return (
			<div>
				<AppNavbar />
				<Layout>
					<Content  style={{
							padding: '0 50px',
						}}>
						<Divider style={{fontSize:40}} orientation="left">Departures</Divider>
						<Layout
							style={{
							padding: '24px 0',
							}}>
							<Content>
								<List
								dataSource={DeparturesList}
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

export default DepartureList;