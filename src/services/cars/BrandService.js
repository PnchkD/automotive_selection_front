import {request} from '../../util/APIUtils'
import {API_BASE_URL} from '../../constants/constants';

export function loadBrands() {
    const options = {
        url: API_BASE_URL + "/api/v1/brands/",
        method: 'GET'
    };
    return request(options);
}