import {request} from '../../util/APIUtils'
import {API_BASE_URL} from '../../constants/constants';

export function loadUsers() {
    const options = {
        url: API_BASE_URL + "/api/v1/admin/users",
        method: 'GET'
    };
    return request(options);
}

export function userBan(banRequest) {
    const options = {
        url: API_BASE_URL + '/api/v1/admin/users/' + banRequest.userBan + '/' + banRequest.userId,
        method: 'PATCH'
    };
    return request(options);
}

export function userConfirm(confirmRequest) {
    const options = {
        url: API_BASE_URL + '/api/v1/admin/users/confirm/' + confirmRequest.userId,
        method: 'PATCH'
    };
    return request(options);
}

export function changeRoles(rolesRequest, id) {
    const options = {
        url: API_BASE_URL + '/api/v1/admin/users/role/' + id,
        method: 'PATCH',
        body: JSON.stringify(rolesRequest)
    };
    return request(options);
}

export function loadUser(id) {
    const options = {
        url: API_BASE_URL + "/api/v1/users/" + id,
        method: 'GET'
    };
    return request(options);
}

export function changePassword(newPasswordRequest, id) {
    const options = {
        url: API_BASE_URL + '/api/v1/users/' + id + '/credentials',
        method: 'PATCH',
        body: JSON.stringify(newPasswordRequest)
    };
    return request(options);
}

export function changePersonalData(personalDataRequest, id) {
    const options = {
        url: API_BASE_URL + '/api/v1/users/' + id,
        method: 'PUT',
        body: JSON.stringify(personalDataRequest)
    };
    return request(options);
}

export function changeAvatar(avatarRequest, id) {
    const options = {
        url: API_BASE_URL + "/api/v1/users/" + id + "/avatar",
        method: 'PATCH',
        body: JSON.stringify(avatarRequest)
    };
    return request(options);
}

export function searchBy(name, desc, firstName, lastName, email) {
    const options = {
        url: API_BASE_URL + '/api/v1/admin/users?sortBy=' + name + '&desc=' + desc + '&search=firstName:' + firstName + ',lastName:' + lastName + ',email:' + email,
        method: 'GET',
    };
    return request(options);
}