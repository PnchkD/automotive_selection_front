import {request} from '../../util/APIUtils'
import {API_BASE_URL} from '../../constants/constants';

export function loadCars() {
    const options = {
        url: API_BASE_URL + "/api/v1/autopicker/cars/",
        method: 'GET'
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

export function create(newCarRequest) {
    const options = {
        url: API_BASE_URL + '/api/v1/autopicker/cars/create',
        method: 'POST',
        body: JSON.stringify(newCarRequest)
    };
    return request(options);
}

export function loadCar(id) {
    const options = {
        url: API_BASE_URL + '/api/v1/autopicker/cars/' + id,
        method: 'GET'
    };
    return request(options);
}