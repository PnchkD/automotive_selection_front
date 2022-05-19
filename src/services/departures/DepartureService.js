import {request} from '../../util/APIUtils'
import {API_BASE_URL} from '../../constants/constants';

export function create(newDepartureReq) {
    const options = {
        url: API_BASE_URL + '/api/v1/autopicker/departures/create',
        method: 'POST',
        body: JSON.stringify(newDepartureReq)
    };
    return request(options);
}

export function loadDepartures() {
    const options = {
        url: API_BASE_URL + "/api/v1/autopicker/departures/",
        method: 'GET'
    };
    return request(options);
}