import React, { Component } from 'react';
import { Select } from 'antd';
import { loadBrands } from '../../services/cars/BrandService';
const { Option } = Select;

class BrandSelector extends Component {

    constructor(props) {
        super(props);
        this.state = { brands: [], isLoading: true};
        this.handleChange = this.handleChange.bind(this);
    };

    componentDidMount() {
		loadBrands()
			.then(data => {
				this.setState({ brands: data.brandsDTO, isLoading: false });
			})
	}

    handleChange(value) {
        this.props.value = value;
    }
      

    render() {

        const { brands, isLoading } = this.state;
	
        if (isLoading) {
			return <p>Loading...</p>;
		}

        const brandsList = brands.map(brand => {
            return <Option value={brand.name}>{brand.name}</Option>
		});

        return <div>
             <Select placeholder="Brand" name='brand' style={{ width: '100%', marginBottom:20 }} onChange={this.props.updateNewCarBrand}>
                {brandsList}
            </Select>
        </div>
    }
}

export default BrandSelector;