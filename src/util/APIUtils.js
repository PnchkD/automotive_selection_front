import {ACCESS_TOKEN, USER_TOKEN_TYPE, ISSUED_AT, USER_EXPIRES_IN, USER_LOGIN, USER_ID, USER_ROLES} from '../constants/constants';
import ErrorHandler from '../handler/ErrorHandler.js';
export function request(options) {

    const headers = new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });

    if (localStorage.getItem(ACCESS_TOKEN)) {
        if(Number(localStorage.getItem(USER_EXPIRES_IN)/1000) + Number(localStorage.getItem(ISSUED_AT)) < Math.trunc(Date.now()/1000)) {
            localStorage.removeItem(ACCESS_TOKEN)
            localStorage.removeItem(USER_TOKEN_TYPE)
            localStorage.removeItem(USER_EXPIRES_IN)
            
            localStorage.removeItem(USER_LOGIN)
            localStorage.removeItem(USER_ID)
            localStorage.removeItem(USER_ROLES)
            window.location.assign('/auth');
            return;
        }
        headers.append("Authorization", localStorage.getItem(USER_TOKEN_TYPE) + " " + localStorage.getItem(ACCESS_TOKEN));
    }
    
    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);
    
    return fetch(options.url, options)
        .then(response => {
            if (!response.ok) {
                ErrorHandler.runError(response.json().message);
            } else {
                return response.json()
            }
        }).then(json => {
            return json;
        });
};

export function s3request(options) {

    const headers = new Headers({
        'Access-Control-Allow-Origin': '*'
    });

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append("Authorization", localStorage.getItem(USER_TOKEN_TYPE) + " " + localStorage.getItem(ACCESS_TOKEN));
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);
    
    return fetch(options.url, options)
        .then(response => {
            if (!response.ok) {
                ErrorHandler.runError(response.json().message);
            } else {
                return response.json()
            }
        }).then(json => {
            return json;
        });
};
