import React, { Component } from 'react';
import { Select } from 'antd';
const { Option } = Select;

class BodyTypeSelector extends Component {

    constructor(props) {
        super(props);
    };
      
    render() {

        return <div>
             <Select placeholder="Body type" name='bodyType' style={{ width: '100%', marginBottom:20 }} onChange={this.props.updateNewCarBodyType}>
                <Option value="SEDAN">SEDAN</Option>
                <Option value="UNIVERSAL">UNIVERSAL</Option>
                <Option value="HATCHBACK">HATCHBACK</Option>
                <Option value="MINIVAN">MINIVAN</Option>
                <Option value="CROSSOVER">CROSSOVER</Option>
                <Option value="COUPE">COUPE</Option>
                <Option value="CABRIOLET">CABRIOLET</Option>
                <Option value="PICKUP">PICKUP</Option>
            </Select>
        </div>
    }
}

export default BodyTypeSelector;