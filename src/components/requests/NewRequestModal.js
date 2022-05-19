import React, { Component } from 'react';
import { Form, Modal,  Input, InputNumber, DatePicker } from 'antd';
import BrandSelector from '../selectors/BrandSelector.js';
import DriveUnitSelector from '../selectors/DriveUnitSelector.js';
import BodyTypeSelector from '../selectors/BodyTypeSelector.js';
import CarStateSelector from '../selectors/CarStateSelector.js';
const {TextArea} = Input;

class NewRequestModal extends Component {

    constructor(props) {
        super(props);
    };

    render() {

        return  <Modal title="Order auto-selection and become the proud owner of the car of your dreams" visible={this.props.visible} onOk={this.props.onOk} onCancel={this.props.onCancel}>
        <Form id='newRequestForm'>
            <Input style={{marginBottom:20}} type="text" name="type" id="type" placeholder='Type'/>
            <InputNumber style={{marginBottom:20, width: '100%', height:50}} addonAfter="$" name="price" min={0} max={99999999} id="price" step="10" placeholder='Price in $'/>
            <Input style={{marginBottom:20}} type="text" name="color" id="color" placeholder='Color'/>
            <div className='row'>
                <div className='col-md-6'>
                    <BrandSelector style={{marginBottom:20, width:'100%'}} name='brand' updateNewCarBrand={this.props.updateNewCarBrand}/>
                </div>
                <div className='col-md-6'>
                    <DatePicker picker="year" style={{marginBottom:20, width:'100%'}} min={1900} max={2099} step="1" name="yearOfIssue" id="yearOfIssue" placeholder='Year of issue'/>
                </div>
            </div>
        
            <Input style={{marginBottom:20}} type="number" name="mileage" id="mileage" placeholder='Mileage'/>
            <Input style={{marginBottom:20}} type="text" name="engineType" id="engineType" placeholder='Engine type'/>
            <DriveUnitSelector name='driveUnit' updateNewCarDriveUnit={this.props.updateNewCarDriveUnit}/>
            <BodyTypeSelector name='bodyType' updateNewCarBodyType={this.props.updateNewCarBodyType}/>
            <Input style={{marginBottom:20}} type="text" name="engineCapacity" id="engineCapacity" placeholder='Engine capacity'/>
            <Input style={{marginBottom:20}} type="text" name="transmission" id="transmission" placeholder='Transmission'/>
            <CarStateSelector name='state' updateNewCarState={this.props.updateNewCarState}/>  
            <Input style={{marginBottom:20}} type="text" name="country" id="country" placeholder='Country'/>
            <Input style={{marginBottom:20}} type="text" name="city" id="city" placeholder='City'/>
            <TextArea rows={4} style={{marginBottom:20}} type="text" name="wishes" id="wishes" placeholder='Wishes'/>              
        </Form> 
    </Modal>
    }
}

export default NewRequestModal;