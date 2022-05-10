import React, { Component } from 'react';
import { Select } from 'antd';
const { Option } = Select;

class CarStateSelector extends Component {

    constructor(props) {
        super(props);
    };
      
    render() {

        return <div>
             <Select placeholder="Car state" name='carState' style={{ width: 'max', marginBottom:20 }} onChange={this.props.updateNewCarState}>
                <Option value="NEW">NEW</Option>
                <Option value="USED">USED</Option>
                <Option value="EMERGENCY">EMERGENCY</Option>
            </Select>
        </div>
    }
}

export default CarStateSelector;