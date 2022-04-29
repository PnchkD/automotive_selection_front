import {request} from '../../util/APIUtils'
import {API_BASE_URL} from '../../constants/constants';

export function login(loginRequest) {
    const options = {
        url: API_BASE_URL + "/api/v1/auth",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    };
    return request(options);
}

export function singUp(singUpRequest) {
    const options = {
        url: API_BASE_URL + "/api/v1/auth/registration",
        method: 'POST',
        body: JSON.stringify(singUpRequest)
    };
    return request(options);
}

export function sendRecoveryCode(login) {
    const options = {
        url:API_BASE_URL + "/api/v1/auth/password_recovery?login=" + login,
        method: 'GET'
    };
    return request(options);
}

export function confirmRecoveryCode(code) {
    const options = {
        url: API_BASE_URL + "/api/v1/auth/password_recovery/code/" + code,
        method: 'GET'
    };
    return request(options);
}

export function changePassword(newPasswordRequest) {
    const options = {
        url: API_BASE_URL + "/api/v1/auth/password_recovery",
        method: 'PUT',
        body: JSON.stringify(newPasswordRequest)
    };
    return request(options);
}