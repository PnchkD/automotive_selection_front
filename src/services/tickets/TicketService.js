import {request} from '../../util/APIUtils'
import {API_BASE_URL} from '../../constants/constants';

export function create(newDepartureReq) {
    const options = {
        url: API_BASE_URL + '/api/v1/autopicker/tickets/create',
        method: 'POST',
        body: JSON.stringify(newDepartureReq)
    };
    return request(options);
}

export function loadTickets() {
    const options = {
        url: API_BASE_URL + "/api/v1/autopicker/tickets/",
        method: 'GET'
    };
    return request(options);
}

export function drop(id) {
    const options = {
        url: API_BASE_URL + '/api/v1/autopicker/tickets/' + id,
        method: 'DELETE',
    };
    return request(options);
}