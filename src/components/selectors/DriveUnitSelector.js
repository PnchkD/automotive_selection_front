import React, { Component } from 'react';
import { Select } from 'antd';
const { Option } = Select;

class DriveUnitSelector extends Component {

    constructor(props) {
        super(props);
    };
      
    render() {

        return <div>
             <Select placeholder="Drive unit" name='driveUnit' style={{ width: '100%', marginBottom:20 }} onChange={this.props.updateNewCarDriveUnit}>
                <Option value="FULL">FULL</Option>
                <Option value="REAR">REAR</Option>
                <Option value="FRONT">FRONT</Option>
                <Option value="FULL_PLUGGABLE">FULL PLUGGABLE</Option>
            </Select>
        </div>
    }
}

export default DriveUnitSelector;