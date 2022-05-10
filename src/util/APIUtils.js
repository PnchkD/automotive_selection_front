import {ACCESS_TOKEN, USER_TOKEN_TYPE} from '../constants/constants';
import ErrorHandler from '../handler/ErrorHandler.js';

export function request(options) {

    const headers = new Headers({
        'Content-Type': 'application/json',
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
