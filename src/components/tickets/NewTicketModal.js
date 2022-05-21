import React, { Component } from 'react';
import { Form, Modal,  Input, DatePicker, Select, Layout } from 'antd';
import { loadCars } from '../../services/cars/CarService';
import { Image } from 'react-bootstrap';
const { Content } = Layout;
const { Option } = Select;
const {TextArea} = Input;

class NewTicketModal extends Component {

    constructor(props) {
        super(props);
        this.state = { cars: [], isLoading: true };

		this.componentDidMount = this.componentDidMount.bind(this);
    };

	componentDidMount() {
		loadCars()
			.then(data => {
				this.setState({ cars: data.carsDTO, isLoading: false });
			})
	}

    render() {

		const { cars, isLoading } = this.state;

        const carsList = cars.map(car => {
            const carPhoto = car.photos[0]==null ? CAR_BASE_PHOTO : car.photos[0];

			return <Option value={car.id} key={car.id}>
                            <Layout >
                                <Content style={{display: 'flex', marginBottom:20}}>
                                    <Image className='user-avatar'
                                        src={carPhoto}
                                    />
                                    {car.name}
                                    <input type="hidden" id='CAR_ID' name="CAR_ID" value={car.id}/>
                                </Content>
                            </Layout>
                    </Option>
		});
        
        return  <Modal title="Enter ticket data" visible={this.props.visible} onOk={this.props.onOk} onCancel={this.props.onCancel}>
                    <Form id='newTicketForm'>
                        <TextArea rows={1} style={{marginBottom:20}} type="text" name="ticketName" id="ticketName" placeholder="Name" required/>
                        <DatePicker picker="year" style={{marginBottom:20, width:'100%'}} min={2022} max={2099} step="1" name="dateOfDeparture" id="dateOfDeparture" placeholder='Date of departure'/>
                        <TextArea rows={4} style={{marginBottom:20}} type="text" name="ticketDescription" id="ticketDescription" placeholder="Description" required/>
                        <Select className='ticket-car-select' placeholder="Choise car" name='car' style={{ width: '100%', marginBottom:20 }}>
                            {carsList}
                        </Select>
                    </Form> 
                </Modal>
    }
}

export default NewTicketModal;