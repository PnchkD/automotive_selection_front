import {request} from '../../util/APIUtils'
import {API_BASE_URL} from '../../constants/constants';

export function loadRequests() {
    const options = {
        url: API_BASE_URL + "/api/v1/requests/",
        method: 'GET'
    };
    return request(options);
}

export function create(newRequestReq) {
    const options = {
        url: API_BASE_URL + '/api/v1/requests/create',
        method: 'POST',
        body: JSON.stringify(newRequestReq)
    };
    return request(options);
}

export function loadRequest(id) {
    const options = {
        url: API_BASE_URL + '/api/v1/requests/' + id,
        method: 'GET'
    };
    return request(options);
}

export function drop(id) {
    const options = {
        url: API_BASE_URL + '/api/v1/requests/' + id,
        method: 'DELETE',
    };
    return request(options);
}

export function searchBy(name, desc, carName, brand, transmission, engineType, bodyType) {
    const options = {
        url: API_BASE_URL + '/api/v1/autopicker/cars/?sortBy=' + name + '&desc=' + desc + '&search=name:' + carName + ',brand:' + brand + ',transmission:' + transmission  + ',engineType:' + engineType + ',bodyType:' + bodyType,
        method: 'GET',
    };
    return request(options);
}